import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getPokemonId } from "@/lib/utils"

interface Pokemon {
  name: string
  url: string
}

interface PokemonCardProps {
  pokemon: Pokemon
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const pokemonId = getPokemonId(pokemon.url)
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`

  return (
    <Link href={`/pokemon/${pokemonId}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
        <CardContent className="p-4">
          <div className="relative mb-4">
            <div className="aspect-square bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={pokemon.name}
                width={120}
                height={120}
                className="group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
              #{pokemonId.toString().padStart(3, "0")}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold capitalize text-center group-hover:text-blue-600 transition-colors">
            {pokemon.name}
          </h3>
        </CardContent>
      </Card>
    </Link>
  )
}
