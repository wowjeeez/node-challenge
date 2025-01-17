import { FetchExpenses } from '../dto/get.dto';
import { getExpenses } from '../model';
import { Router } from 'express';
import { to } from '@nc/utils/async';
import { transformAndValidate } from 'class-transformer-validator';
import { ValidationError } from '@nc/utils/errors';

export const router = Router();

router.get('/', async (req, res, next) => {
  const [validationErr, query] = await to(transformAndValidate(FetchExpenses, req.query));
  if (validationErr) {
    return next(ValidationError(validationErr, req));
  }
  const [expError, expDetails] = await to(getExpenses(query));

  if (expError) {
    return next(expError);
  }

  if (!expDetails) {
    return res.json([]);
  }

  return res.json(expDetails);
});
