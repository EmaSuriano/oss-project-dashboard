import { Countable, Order } from '../types';

function isCountable(val: any): val is Countable {
  return val.totalCount !== undefined;
}

export const sortData =
  (sort: string, asc: Order) =>
  (a: Record<string, any>, b: Record<string, any>) => {
    if (!sort) return 1;

    const valA = a[sort];
    const valB = b[sort];

    if (isCountable(valA) && isCountable(valB)) {
      return asc === Order.ASC
        ? valB.totalCount - valA.totalCount
        : valA.totalCount - valB.totalCount;
    }

    return asc === Order.ASC
      ? valA.toString().localeCompare(valB.toString())
      : valB.toString().localeCompare(valA.toString());
  };
