import { arrayToFlat } from '../formatter';
import { CreateUser } from '../dto/create.dto';
import { createUser } from '../model';
import { Router } from 'express';
import { to } from '@nc/utils/async';
import { transformAndValidate } from 'class-transformer-validator';
import { ApiError, ValidationError } from '@nc/utils/errors';

export const router = Router();

router.post('/', async (req, res, next) => {
  const [validationErr, dto] = await to(transformAndValidate(CreateUser, req.body || {})); // body based since we are creating something not fetching
  if (validationErr) {
    return next(ValidationError(validationErr, req));
  }

  const [err, id] = await to(createUser(arrayToFlat(dto)));

  if (err) {
    return next(new ApiError(err, err.status, `Failed to create user: ${err}`, err.title, req));
  }

  res.json({ created: true, id });
});
