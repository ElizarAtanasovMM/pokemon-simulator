import { Request, Response, Router } from 'express';
import * as simulatorService from '../services/simulator'; // Now contains state management logic
import { historySchemaValidator } from '../validators/historyValidator';
import { validateRequest } from '../middlewares/common';
import { formatResponse } from '../utils/formatResponse';
import { Team } from '../types/Team';
import { readFileSync } from 'node:fs';
import { setPokemonStats } from '../utils/simulationUtilities';

const router = Router();

router.get(
  '/history',
  historySchemaValidator,
  validateRequest,
  (req: Request, res: Response) => {
    const { id } = req.query;

    const response = formatResponse('text');
    res.send(response);
  }
);

router.get('/', (req: Request, res: Response) => {
  try {
    const data = JSON.parse(readFileSync('pokedex.json', 'utf-8'));
    // 1. Setup Initial State (Replacing hardcoded calls)
    const team1: Team = {
      id: 1,
      name: 'Team 1',
      pokemons: data?.pokemon
        .slice(0, 4)
        .map((p: object) => setPokemonStats(p)), // Using 'any' for mock safety until types are fully aligned
    };

    const team2: Team = {
      id: 2,
      name: 'Team 2',
      pokemons: data?.pokemon
        .slice(7, 11)
        .map((p: object) => setPokemonStats(p)), // Using 'any' for mock safety until types are fully aligned
    };

    // Use the new state initialization function
    const resultLogs = simulatorService.simulateBattle(team1, team2);

    res.send(formatResponse(resultLogs));
  } catch (error) {
    console.error('Error simulating battle:', error);
    res.status(500).send({ message: 'Failed to start simulation.' });
  }
});

export default router;
