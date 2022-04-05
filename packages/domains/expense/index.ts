import { router as addExpense } from './routes/v1-add-expense';
import { router as getExpenses } from './routes/v1-get-expenses';
import { Router } from 'express';

export const router = Router();

router.use('/v1/get-expenses', getExpenses);
router.use('/v1/add-expense', addExpense);
