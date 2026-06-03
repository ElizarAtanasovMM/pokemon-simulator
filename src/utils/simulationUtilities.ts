import { BattleEvent, PokemonStats, Team } from '../types/Team';

/**
 * Set Initial Pokemon's stats
 * @param pokemon
 * @returns {PokemonStats}
 */
export const setPokemonStats = (pokemon: any): PokemonStats => {
  const [attMultiplier = 1, defMultiplier = 1] = pokemon.multipliers ?? [1, 1]; // Default to 1 if not provided
  return {
    id: pokemon.id,
    name: pokemon.name,
    type: pokemon.type,
    attack:
      (parseInt(pokemon.height) + parseInt(pokemon.weight)) *
      parseInt(attMultiplier),
    defense:
      (parseInt(pokemon.height) + parseInt(pokemon.weight)) *
      parseInt(defMultiplier),
    isFainted: false,
  };
};

/**
 * Calculates damage dealt by an attacker to a defender
 * @param attacker - The Pokémon performing the attack
 * @param defender - The Pokémon receiving the attack.
 * @returns {number} The calculated damage dealt, rounded to the nearest integer.
 */
export const calculateDamage = (
  attacker: PokemonStats,
  defender: PokemonStats
): number => {
  // Base Damage Formula
  // TODO: Extend with other abilities
  return attacker.attack - defender.defense;
};

/**
 * Battle logger for each turn
 * @param attacker - Attacker Team - should be different every turn
 * @param defender - Defender Team - should be different every turn
 * @param turn - Current turn
 * @param attackerPokemon - Attacker pokemon to log its stats
 * @param defenderPokemon - Defender pokemon to log its stats
 * @returns {BattleEvent}
 */
export const logBattleEvent = (
  attacker: Team,
  defender: Team,
  turn: number,
  attackerPokemon: PokemonStats,
  defenderPokemon: PokemonStats
): BattleEvent => {
  return {
    attackerName: attacker.name,
    defenderName: defender.name,
    turn,
    event: `Attacker ${attackerPokemon.name} attacked ${defenderPokemon.name} with ${attackerPokemon.attack} attack vs. ${defenderPokemon.defense} defense. Attacker team has ${formatTeam(attacker.pokemons)}; Defender team has ${formatTeam(defender.pokemons)}`,
  };
};

/**
 * Update pokemon with its new data within the array if ID matches, do not change otherwise
 * @param id Current Pokemon id
 * @param pokemons the list of all pokemonst that need to be updated
 * @returns {PokemonStats[]}
 */
export const updatePokemonStatus = (
  id: number,
  pokemons: PokemonStats[]
): PokemonStats[] => pokemons.map((p) => (p.id === id ? { ...p } : p));

/**
 * Format the list of pokemons left after a turn
 * @param pokemons The list of pokemons to be filtered
 * @returns {string}
 */
export const formatTeam = (pokemons: PokemonStats[]): string => {
  return pokemons
    .filter((p) => !p.isFainted)
    .map((m) => m.name)
    .join(';');
};
