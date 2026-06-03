import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send({ data: 'Go to /simulate to simulate a battle' });
});

export default router;
