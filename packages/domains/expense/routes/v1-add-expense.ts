import { AddExpense } from '../dto/add.dto';
import { addUserExpense } from '../model';
import { arrayToFlat } from '@nc/domain-user/formatter';
import { Router } from 'express';
import { to } from '@nc/utils/async';
import { transformAndValidate } from 'class-transformer-validator';
import { ApiError, ValidationError } from '@nc/utils/errors';

export const router = Router();

router.post('/', async (req, res, next) => {
  const [validationErr, payload] = await to(transformAndValidate(AddExpense, req.body));
  if (validationErr) {
    return next(ValidationError(validationErr, req));
  }

  const [err, id] = await to(addUserExpense(arrayToFlat(payload)));

  if (err) {
    return next(new ApiError(err, err.status, `Failed to add expense: ${err}`, err.title, req));
  }
  return res.json({ created: true, id });
});
