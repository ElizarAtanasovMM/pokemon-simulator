import { BattleEvent, Team, PokemonStats } from '../types/Team';
import { getRandomNumber } from '../utils/getRandomNumber';
import {
  calculateDamage,
  logBattleEvent,
  updatePokemonStatus,
} from '../utils/simulationUtilities';

/**
 * Proccess each battle turn by swapping team while update team's pokemon stats
 * @param attacker
 * @param defender
 * @returns {BattleEvent} return all the events from current simulation
 */
const proccessBattleTurns = (attacker: Team, defender: Team): BattleEvent[] => {
  let localAttacker = attacker;
  let localDefender = defender;

  const eventsLog: BattleEvent[] = [];

  let isBattleFinished = false;
  let turn = 1;
  while (!isBattleFinished) {
    // Limit the battle
    if (turn > 100) {
      isBattleFinished = true;
      console.log('Max turn limit reached, ending battle as a draw.');
      break;
    }

    localAttacker = {
      ...localAttacker,
      pokemons: validatePokemons(localAttacker.pokemons),
    };
    localDefender = {
      ...localDefender,
      pokemons: validatePokemons(localDefender.pokemons),
    };

    if (
      localAttacker.pokemons.length === 0 ||
      localDefender.pokemons.length === 0
    ) {
      isBattleFinished = true;
      break;
    }

    // Get random attacker and defender
    const attackerPokemon = localAttacker.pokemons[
      getRandomNumber(localAttacker.pokemons.length)
    ] as PokemonStats | null;

    const defenderPokemon = localDefender.pokemons[
      getRandomNumber(localDefender.pokemons.length)
    ] as PokemonStats | null;

    if (!attackerPokemon || !defenderPokemon) {
      isBattleFinished = true;
      break;
    }

    const damageDealt = calculateDamage(attackerPokemon, defenderPokemon);
    if (damageDealt < 0) {
      // Attacker failed
      attackerPokemon.isFainted = true;
    } else if (damageDealt >= defenderPokemon.defense) {
      // Attack is successful and defender is fainted
      defenderPokemon.isFainted = true;
    } else {
      // reduce defender's defence
      defenderPokemon.defense -= damageDealt;
    }

    eventsLog.push(
      logBattleEvent(
        localAttacker,
        localDefender,
        turn,
        attackerPokemon,
        defenderPokemon
      )
    );

    localAttacker.pokemons = updatePokemonStatus(
      attackerPokemon.id,
      localAttacker.pokemons
    );
    localDefender.pokemons = updatePokemonStatus(
      defenderPokemon.id,
      localDefender.pokemons
    );

    // SWAP Teams
    [localAttacker, localDefender] = [localDefender, localAttacker];

    turn++;
  }

  return eventsLog;
};

// TOOD: Move in utilities;
const validatePokemons = (pokemons: PokemonStats[]) => {
  return pokemons.filter((p) => !p.isFainted);
};

/**
 * Public API function to kick off a battle simulation and return the final state/history.
 * This serves as a wrapper that initializes the state and runs through a simulated sequence of turns
 * for demonstration purposes, mimicking what might happen in an initial request handler.
 * @param team1 The first team participating in the battle.
 * @param team2 The second team participating in the battle.
 * @returns {BattleState} The final state of the combat simulation.
 */
export const simulateBattle = (team1: Team, team2: Team): BattleEvent[] => {
  console.log('Starting battle simulation...');

  // 1. determine who attacks first
  let attacker = team1;
  let defender = team2;
  if (team1.pokemons.length === team2.pokemons.length) {
    attacker = Math.random() < 0.5 ? team1 : team2;
    defender = attacker === team1 ? team2 : team1;
  } else if (team2.pokemons.length > team1.pokemons.length) {
    attacker = team2;
    defender = team1;
  }

  //2. cycle through all the pokemons chosing at random who's attacking who
  return proccessBattleTurns(attacker, defender);
};
