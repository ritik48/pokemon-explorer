"use client";

import { useState } from "react";
import PokemonCard from "./pokemon-card";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Pokemon {
  name: string;
  url: string;
}

export default function SearchBar({ allPokemon }: { allPokemon: Pokemon[] }) {
  const [query, setQuery] = useState("");

  const filtered = allPokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="max-w-md mx-auto mb-8">
        <Input
          type="text"
          placeholder="Search Pokemon..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {query && (
        <div className="text-center text-muted-foreground mb-4">
          Showing {filtered.length} Pokemon matching "{query}"
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filtered.length > 0 ? (
          filtered.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))
        ) : (
          <Card className="text-center col-span-full py-8">
            <CardContent>
              <p className="text-muted-foreground">
                No Pokemon found for "{query}"
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
