import { ApiError } from '@nc/utils/errors';
import { Fetch } from '../dto/get.dto';
import { getTransactions } from '../model';
import { Router } from 'express';
import { to } from '@nc/utils/async';
import { transformAndValidate } from 'class-transformer-validator';

export const router = Router();

router.get('/get-expenses', async (req, res, next) => {
  const [validationErr, query] = await to(transformAndValidate(Fetch, req.query));
  const [expError, expDetails] = await to(getTransactions(query));
  if (validationErr) {
    return next(new ApiError(validationErr, 401, `Could not get user details: ${validationErr}`, validationErr.title, req));
  }
  if (expError) {
    return next(expError);
  }

  if (!expDetails) {
    return res.json([]);
  }

  return res.json(expDetails);
});
