import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import {
  generateEmbeddings,
  transcribeAudio,
  generateAnswer,
} from "../../services/gemini.ts";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
import { eq } from "drizzle-orm";

export const uploadAudioRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/rooms/:roomId/audio",
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params;

      const audio = await request.file();
      if (!audio) {
        throw new Error("Audio is required.");
      }

      const audioBuffer = await audio.toBuffer();
      const audioAsBase64 = audioBuffer.toString("base64");

      const transcription = await transcribeAudio(
        audioAsBase64,
        audio.mimetype
      );

      const embeddings = await generateEmbeddings(transcription);

      // Salva o chunk de áudio
      await db.insert(schema.audioChunks).values({
        roomId,
        transcription,
        embeddings,
      });

      // Busca transcrições anteriores da sala
      const previousChunks = await db
        .select({
          transcription: schema.audioChunks.transcription,
        })
        .from(schema.audioChunks)
        .where(eq(schema.audioChunks.roomId, roomId))
        .orderBy(schema.audioChunks.id); // ou schema.audioChunks.createdAt, se existir

      const transcriptions = previousChunks.map((chunk) => chunk.transcription);

      // Gera resposta com contexto
      const answer = await generateAnswer(transcription, transcriptions);

      // Salva pergunta e resposta
      const result = await db
        .insert(schema.questions)
        .values({
          roomId,
          question: transcription,
          answer,
        })
        .returning();

      const question = result[0];

      return reply.status(201).send({
        question: question.question,
        answer: question.answer,
      });
    }
  );
};
