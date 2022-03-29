import { database } from '@nc/utils/db';
import { Fetch } from '../dto/get.dto';
import { to } from '@nc/utils/async';

const FIELD_MAP: Record<Fetch['filterBy'], string> = {
  amount: 'amount_in_cents',
  merchname: 'merchant_name',
  date: 'date_created',
  currency: 'currency',
  none: '', // never happens
  status: 'status',
};

const createFilterQuery = (data: Fetch) => {
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
  queryObj[fieldName] = { contains: data.filter };
  return queryObj;
};

const paginate = (data: Fetch) => ({
  skip: data.pageId * data.pageSize,
  take: data.pageSize,
});

const orderBy = (data: Fetch) => ({
  orderBy: [{ [FIELD_MAP[data.sortBy]]: data.ascending ? 'asc' : 'desc' }],
});

export async function fetchUserTransactions(query: Fetch) {
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
