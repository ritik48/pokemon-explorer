import { getPokemonList } from "@/lib/pokemon-api";
import PokemonExplorer from "@/components/pokemon-explorer";

interface SearchParams {
  page?: string;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number.parseInt(resolvedSearchParams.page || "1");
  const limit = 20;
  const offset = (currentPage - 1) * limit;
  const data = await getPokemonList(limit, offset);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <PokemonExplorer
          serverPokemon={data.results}
          currentPage={currentPage}
          totalCount={data.count}
          perPage={limit}
        />
      </div>
    </div>
  );
}
