import { Request, Response, Router } from 'express';
import * as simulatorService from '../services/simulator'; // Now contains state management logic
import { historySchemaValidator } from '../validators/historyValidator';
import { validateRequest } from '../middlewares/common';
import { formatResponse } from '../utils/formatResponse';
import { Team } from '../types/Team';
import { setPokemonStats } from '../utils/simulationUtilities';
import { getPokemonsInRange } from '../model/PokemonModel';
import * as battleEventModel from '../model/BattleEventModel';

const router = Router();

router.get(
  '/history/:team',
  historySchemaValidator,
  validateRequest,
  async (req: Request, res: Response) => {
    // TODO: Filter by param and / or query
    const { team } = req.params;
    const { created } = req.query;
    try {
      const result = await battleEventModel.findAll();
      const response = formatResponse(result);
      res.send(response);
    } catch (e) {
      console.error(e);
      res.send(formatResponse({}, 'Error Fetching'));
    }
  }
);

router.get('/', async (req: Request, res: Response) => {
  try {
    // TODO: Move to a controller
    const data = await getPokemonsInRange(1, 10);
    // 1. Setup Initial State (Replacing hardcoded calls)
    const team1: Team = {
      id: 1,
      name: 'Team 1',
      pokemons: data.slice(0, 4).map((p: object) => setPokemonStats(p)), // Using 'any' for mock safety until types are fully aligned
    };

    const team2: Team = {
      id: 2,
      name: 'Team 2',
      pokemons: data.slice(7, 11).map((p: object) => setPokemonStats(p)), // Using 'any' for mock safety until types are fully aligned
    };

    // Use the new state initialization function
    const resultLogs = simulatorService.simulateBattle(team1, team2);

    await battleEventModel.insertEvent(resultLogs);

    res.send(
      formatResponse({
        winningTeam: resultLogs[resultLogs.length - 1]?.winner,
        logs: resultLogs,
      })
    );
  } catch (error) {
    console.error('Error simulating battle:', error);
    res.status(500).send({ message: 'Failed to start simulation.' });
  }
});

export default router;
