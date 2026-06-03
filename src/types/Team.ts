import { Pokemon } from './Pokemon';

/**
 * Defines the core type structure for a single Pokémon's stats and status.
 * In a real implementation, this would likely reference data from a separate Pokedex service.
 */
export type PokemonStats = {
  id: number; // Unique identifier for the Pokémon
  name: string;
  attack: number; // Base Attack stat
  defense: number; // Base Defense stat
  type: string;
  isFainted: boolean;
};

/**
 * Records a single, atomic event that occurred during the battle.
 */
export type BattleEvent = {
  attackerName: string;
  defenderName: string;
  turn: number;
  event: string;
};

/**
 * Defines a team, which holds multiple Pokémon. (Original structure preserved)
 */
export type Team = {
  id: number;
  name: string;
  pokemons: PokemonStats[];
};
