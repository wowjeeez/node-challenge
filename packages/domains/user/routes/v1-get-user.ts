import { FetchUser } from '../dto/get.dto';
import { getUserDetails } from '../model';
import { Router } from 'express';
import { to } from '@nc/utils/async';
import { transformAndValidate } from 'class-transformer-validator';
import { ApiError, ValidationError } from '@nc/utils/errors';

export const router = Router();

router.get('/', async (req, res, next) => {
  const [validationErr, query] = await to(transformAndValidate(FetchUser, req.query));
  if (validationErr) {
    return next(ValidationError(validationErr, req));
  }

  const [userError, userDetails] = await to(getUserDetails(query.userId));

  if (userError) {
    return next(new ApiError(userError, userError.status, `Could not get user details: ${userError}`, userError.title, req));
  }

  if (!userDetails) {
    return res.json({});
  }

  return res.json(userDetails);
});
