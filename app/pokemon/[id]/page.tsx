import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getPokemon } from "@/lib/pokemon-api";

interface PokemonPageProps {
  params: Promise<{ id: string }>;
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  try {
    const resolvesParams = await params;
    const pokemon = await getPokemon(resolvesParams.id);

    if (!pokemon) {
      notFound();
    }

    const maxStat = 100;

    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="min-h-screen mx-auto max-w-7xl ">
          <div className="container mx-auto px-4 py-8">
            <Link href="/">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Explorer
              </Button>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-3xl capitalize mb-2">
                          {pokemon.name}
                        </CardTitle>
                        <p className="text-muted-foreground">
                          #{pokemon.id.toString().padStart(3, "0")}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {pokemon.types.map((type) => (
                          <Badge key={type.type.name} className={`text-white`}>
                            {type.type.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Height</p>
                        <p className="text-lg font-semibold">
                          {pokemon.height / 10} m
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Weight</p>
                        <p className="text-lg font-semibold">
                          {pokemon.weight / 10} kg
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Base Experience
                        </p>
                        <p className="text-lg font-semibold">
                          {pokemon.base_experience}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Abilities
                        </p>
                        <p className="text-lg font-semibold">
                          {pokemon.abilities.length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Base Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pokemon.stats.map((stat) => (
                        <div key={stat.stat.name}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium capitalize">
                              {stat.stat.name.replace("-", " ")}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {stat.base_stat}
                            </span>
                          </div>
                          <Progress
                            value={(stat.base_stat / maxStat) * 100}
                            className="h-2"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Abilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {pokemon.abilities.map((ability, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg"
                        >
                          <span className="capitalize font-medium">
                            {ability.ability.name.replace("-", " ")}
                          </span>
                          {ability.is_hidden && (
                            <Badge variant="secondary">Hidden</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Sprites</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {pokemon.sprites.front_default && (
                        <div className="text-center">
                          <Image
                            src={
                              pokemon.sprites.front_default ||
                              "/placeholder.svg"
                            }
                            alt={`${pokemon.name} front`}
                            width={96}
                            height={96}
                            className="mx-auto"
                          />
                          <p className="text-sm text-muted-foreground mt-2">
                            Default
                          </p>
                        </div>
                      )}
                      {pokemon.sprites.front_shiny && (
                        <div className="text-center">
                          <Image
                            src={
                              pokemon.sprites.front_shiny || "/placeholder.svg"
                            }
                            alt={`${pokemon.name} shiny`}
                            width={96}
                            height={96}
                            className="mx-auto"
                          />
                          <p className="text-sm text-muted-foreground mt-2">
                            Shiny
                          </p>
                        </div>
                      )}
                      {pokemon.sprites.other?.dream_world?.front_default && (
                        <div className="text-center">
                          <Image
                            src={
                              pokemon.sprites.other.dream_world.front_default ||
                              "/placeholder.svg"
                            }
                            alt={`${pokemon.name} dream world`}
                            width={96}
                            height={96}
                            className="mx-auto"
                          />
                          <p className="text-sm text-muted-foreground mt-2">
                            Dream World
                          </p>
                        </div>
                      )}
                      {pokemon.sprites.other?.["official-artwork"]
                        ?.front_default && (
                        <div className="text-center">
                          <Image
                            src={
                              pokemon.sprites.other["official-artwork"]
                                .front_default || "/placeholder.svg"
                            }
                            alt={`${pokemon.name} official artwork`}
                            width={96}
                            height={96}
                            className="mx-auto"
                          />
                          <p className="text-sm text-muted-foreground mt-2">
                            Official
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="mt-8">
              <Tabs defaultValue="moves" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="moves">Moves</TabsTrigger>
                  <TabsTrigger value="items">Held Items</TabsTrigger>
                </TabsList>

                <TabsContent value="moves" className="p-6">
                  <div className="grid gap-3 max-h-96 overflow-y-auto">
                    {pokemon.moves.map((move, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <span className="capitalize font-medium">
                          {move.move.name.replace("-", " ")}
                        </span>
                        <div className="flex gap-2 text-sm text-muted-foreground">
                          {move.version_group_details[0] && (
                            <>
                              <span>
                                Level{" "}
                                {move.version_group_details[0].level_learned_at}
                              </span>
                              <Separator orientation="vertical" />
                              <span className="capitalize">
                                {move.version_group_details[0].move_learn_method.name.replace(
                                  "-",
                                  " "
                                )}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="items" className="p-6">
                  {pokemon.held_items.length > 0 ? (
                    <div className="grid gap-3">
                      {pokemon.held_items.map((item, index) => (
                        <div key={index} className="p-3 bg-muted rounded-lg">
                          <p className="font-medium capitalize mb-2">
                            {item.item.name.replace("-", " ")}
                          </p>
                          <div className="text-sm text-muted-foreground">
                            {item.version_details.map((detail, i) => (
                              <span key={i} className="mr-4">
                                {detail.version.name}: {detail.rarity}%
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      This Pokemon doesn't hold any items.
                    </p>
                  )}
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
