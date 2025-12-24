import { z } from "zod";

const AppearanceSchema = z.object({
  id: z.number(),
  name: z.string(),
  airdate: z.string(),
  description: z.string(),
  episode_number: z.number(),
  image_path: z.string(),
  season: z.number(),
  synopsis: z.string(),
});

export const CharacterSchema = z.object({
  id: z.number(),
  name: z.string(),
  age: z.number().nullable().optional(),
  birthdate: z.string().nullable().optional(),
  description: z.string(),
  gender: z.string(),
  occupation: z.string(),
  phrases: z.array(z.string()).default([]),
  portrait_path: z.string(),
  status: z.string(),
  first_appearance_ep: AppearanceSchema,
  first_appearance_sh: AppearanceSchema,
});

export type Character = z.infer<typeof CharacterSchema>;
