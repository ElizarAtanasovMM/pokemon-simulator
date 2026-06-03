import { Router } from "express";
// import { createItem, getItems, getItemById, updateItem, deleteItem } from '../controllers/itemController';

const router = Router();

router.get("/", (req, res) => {
  res.send({ data: "InfoPage" });
});

export default router;
