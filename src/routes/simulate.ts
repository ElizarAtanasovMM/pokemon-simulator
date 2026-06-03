import { Request, Response, Router } from 'express';
import simulatorService from '../services/simulator';
import { historySchemaValidator } from '../validators/historyValidator';
import { validateRequest } from '../middlewares/common';
import { formatResponse } from '../utils/formatResponse';
import { Team } from '../types/Team';
import { readFileSync } from 'node:fs';
import { Pokemon } from '../types/Pokemon';
const router = Router();

router.get(
  '/history',
  historySchemaValidator,
  validateRequest,
  (req: Request, res: Response) => {
    const { id } = req.query;

    const response = formatResponse(
      simulatorService.getBattleHistory(id as string)
    );
    res.send(response);
  }
);

router.get('/', (req: Request, res: Response) => {
  // TODO: switch to post

  // TODO: DELETE this later
  const data = JSON.parse(readFileSync('pokedex.json', 'utf-8'));

  const team1: Team = {
    id: 1,
    name: 'Team 1',
    pokemons: data?.pokemon.slice(0, 6) as Pokemon[], // Assuming the first 6 Pokémon from the pokedex.json file
  };

  const team2: Team = {
    id: 2,
    name: 'Team 2',
    pokemons: data?.pokemon.slice(7, 9) as Pokemon[],
  };

  //   TODO: Swith to players
  res.send(formatResponse(simulatorService.simulateBattle(team1, team2)));
});

export default router;
