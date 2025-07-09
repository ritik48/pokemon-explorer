import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPokemonId(url: string): number {
  const matches = url.match(/\/pokemon\/(\d+)\//)
  return matches ? Number.parseInt(matches[1]) : 0
}