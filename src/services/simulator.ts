import { Team } from '../types/Team';

const simulatorService = {
  simulateBattle: (team1: Team, team2: Team) => {
    // Placeholder logic for simulating a battle between two Pokémon

    let firstToAttak = team1;
    if (team1.pokemons.length === team2.pokemons.length) {
      firstToAttak = Math.random() < 0.5 ? team1 : team2;
    } else if (team1.pokemons.length < team2.pokemons.length) {
      firstToAttak = team2;
    }

    return firstToAttak;
  },
  getBattleHistory: (id: string) => {
    // Placeholder logic for retrieving battle history

    return {
      id,
      pokemon1: 'Pikachu',
      pokemon2: 'Charizard',
      winner: 'Pikachu',
      date: new Date(),
    };
    // Make DB Request here
  },
};

export default simulatorService;
