"use client";

import { useState, useMemo } from "react";
import PokemonCard from "./pokemon-card";
import Pagination from "./pagination";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonExplorerProps {
  serverPokemon: Pokemon[];
  currentPage: number;
  totalCount: number;
  perPage: number;
}

export default function PokemonExplorer({
  serverPokemon,
  currentPage,
  totalCount,
  perPage,
}: PokemonExplorerProps) {
  const [search, setSearch] = useState("");

  const filtered = serverPokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const isSearching = search.trim().length > 0;
  const displayList = isSearching ? filtered : serverPokemon;

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-xl sm:text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
          Pokemon Explorer
        </h1>
        <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 mb-6">
          Discover and explore the world of Pokemon
        </p>

        <div className="max-w-md mx-auto mb-4">
          <Input
            placeholder="Search Pokemon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {isSearching && (
          <p className="text-muted-foreground">
            Found {filtered.length} Pokemon matching "{search}"
          </p>
        )}
      </div>

      {displayList.length > 0 && (
        <div className="w-[80%] sm:max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {displayList.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      )}

      {!isSearching && (
        <Pagination
          currentPage={currentPage}
          hasNext={currentPage * perPage < totalCount}
          hasPrevious={currentPage > 1}
          totalResults={totalCount}
          resultsPerPage={perPage}
        />
      )}
    </>
  );
}
