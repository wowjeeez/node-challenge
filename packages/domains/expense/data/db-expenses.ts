import config from 'config';
import { database } from '@nc/utils/db';
import { FetchExpenses } from '../dto/get.dto';
import { to } from '@nc/utils/async';

const FIELD_MAP: Record<FetchExpenses['filterBy'], string> = {
  amount: 'amount_in_cents',
  merchname: 'merchant_name',
  date: 'date_created',
  currency: 'currency',
  none: '', // never happens
  status: 'status',
};

const createFilterQuery = (data: FetchExpenses) => {
  if (data.filterBy === 'none' || !data.filter) {
    return {};
  }
  if (data.filterBy === 'date') {
    const [start, end] = data.filter.split('|'); // the API requests the date filter to be separated by |
    const startDate = new Date(start) || new Date(2015); // date of Pleo's foundation
    const endDate = new Date(end) || new Date();
    const queryObj = {
      date_created: undefined,
    };
    queryObj.date_created = { gte: startDate, lt: endDate };
    return queryObj;
  }
  const fieldName = FIELD_MAP[data.filterBy];
  const queryObj = {};
  queryObj[fieldName] = { contains: data.filter, mode: 'insensitive' };
  return queryObj;
};

export const capPageSize = (size: number) => (size > config.pageSizeCap ? config.pageSizeCap : size);

const paginate = (data: FetchExpenses) => ({
  skip: parseInt(data.pageId) * capPageSize(parseInt(data.pageSize)),
  take: parseInt(data.pageSize),
});

const orderBy = (data: FetchExpenses) => ({
  orderBy: [{ [FIELD_MAP[data.orderBy]]: data.ascending === '1' ? 'asc' : 'desc' }],
});

export async function fetchUserTransactions<T extends boolean>(query: FetchExpenses) {
  return await to(database().expenses.findMany({
    ...paginate(query),
    ...orderBy(query),
    select: {
      merchant_name: true,
      amount_in_cents: true,
      currency: true,
      status: true,
      date_created: true,
    },
    where: {
      user_id: query.userId,
      ...createFilterQuery(query),
    },
  }));
}
