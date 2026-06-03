import { query } from "express-validator";

export const historySchemaValidator = [
  query("id").not().isEmpty().withMessage("id is required"),
];
