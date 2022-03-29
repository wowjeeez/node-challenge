import { FetchExpenses } from './dto/get.dto';
import { fetchUserTransactions } from './data/db-expenses';
import Logger from '@nc/utils/logging';
import { InternalError, NotFound } from '@nc/utils/errors';
const logger = Logger('expenses/model');

export async function getTransactions(data: FetchExpenses) {
  const [dbError, rows] = await fetchUserTransactions(data);
  if (dbError) {
    logger.error(dbError);
    throw InternalError('Error fetching data from the DB');
  }

  if (!rows) {
    throw NotFound(`Could not find transactions for user id ${data.userId}`);
  }

  return rows;
}
