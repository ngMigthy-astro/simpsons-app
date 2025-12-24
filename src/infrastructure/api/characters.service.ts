import z from "zod";
import {
  CharacterSchema,
  type Character,
} from "@/domain/characters/schemas/character.schema";

const API_BASE_URL = "https://thesimpsonsapi.com/api";
const IMAGE_BASE_URL = "https://cdn.thesimpsonsapi.com/500";

export const getCharacterById = async (id: number): Promise<Character> => {
  const response = await fetch(`${API_BASE_URL}/characters/${id}`);
  if (!response.ok) throw new Error(`Error al obtener el persona ${id}`);

  const data = await response.json();
  const result = CharacterSchema.safeParse(data);
  if (!result.success) {
    const formattedError = z.treeifyError(result.error);
    console.error(
      "Problema con la comunicación (Schema Mismatch):",
      formattedError,
    );
    throw new Error("Internal server error: API Data Mismatch");
  }

  return {
    ...result.data,
    portrait_path: `${IMAGE_BASE_URL}${result.data.portrait_path}`,
  };
};

export const getCharacters = async (ids: number[]): Promise<Character[]> => {
  const promises = ids.map((id) => getCharacterById(id));
  return Promise.all(promises);
};
