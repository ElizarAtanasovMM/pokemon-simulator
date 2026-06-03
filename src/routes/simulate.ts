import { Request, Response, Router } from "express";
import simulatorService from "../services/simulator";
import { historySchemaValidator } from "../validators/historyValidator";
import { validateRequest } from "../middlewares/common";
import { formatResponse } from "../utils/formatResponse";
const router = Router();

router.get(
  "/history",
  historySchemaValidator,
  validateRequest,
  (req: Request, res: Response) => {
    const { id } = req.query;

    const response = formatResponse(
      simulatorService.getBattleHistory(id as string),
    );
    res.send(response);
  },
);

router.get("simulate", (req: Request, res: Response) => {
  //   const { pokemon1, pokemon2 } = req.body;
  //   TODO: Swith to players
  //   simulatorService.simulateBattle(pokemon1, pokemon2);
});

export default router;
