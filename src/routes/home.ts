import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.redirect('/simulate');
  // res.send({ data: "Go to " });
});

export default router;
