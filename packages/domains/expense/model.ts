import { AddExpense } from './dto/add.dto';
import { FetchExpenses } from './dto/get.dto';
import Logger from '@nc/utils/logging';
import { addExpense, fetchUserExpenses } from './data/db-expenses';
import { InternalError, NotFound } from '@nc/utils/errors';
const logger = Logger('expenses/model');

export async function getExpenses(data: FetchExpenses) {
  const [dbError, rows] = await fetchUserExpenses(data);
  if (dbError) {
    logger.error(dbError);
    throw InternalError('Error fetching data from the DB');
  }

  if (!rows) {
    throw NotFound(`Could not find transactions for user id ${data.userId}`);
  }

  return rows;
}

export async function addUserExpense(payload: AddExpense): Promise<string> {
  const dto = payload.generate();
  const [dbError] = await addExpense(dto);
  if (dbError) {
    logger.error(dbError);
    throw InternalError('Error writing data to the DB');
  }
  return dto.id;
}
