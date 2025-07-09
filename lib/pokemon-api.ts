"use server";

import { Pokemon, PokemonListResponse } from "@/types";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(
  limit = 20,
  offset = 0
): Promise<PokemonListResponse> {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon list");
  }

  return response.json();
}

export async function getPokemon(id: string): Promise<Pokemon | null> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    return null;
  }
}
