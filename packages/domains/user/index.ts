import { router as create } from './routes/v1-generate-user';
import { router as getDetails } from './routes/v1-get-user';
import { Router } from 'express';

export const router = Router();
router.use('/v1/get-user-details', getDetails);
router.use('/v1/create-user', create);
