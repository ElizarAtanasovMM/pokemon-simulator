import { param, query } from 'express-validator';

export const historySchemaValidator = [
  query('created')
    .optional()
    .not()
    .isEmpty()
    .withMessage('created must have a value'),
  param('team').optional().not().isEmpty().withMessage('provide a team'),
];
