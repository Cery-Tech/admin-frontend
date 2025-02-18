function descendingComparator<T, OrderKey = keyof T>(a: T, b: T, orderBy: OrderKey) {
  let bVal = b[orderBy as keyof T] as string | number | boolean;
  let aVal = a[orderBy as keyof T] as string | number | boolean;

  if (typeof aVal === 'undefined' || aVal === null) {
    return 1;
  }

  if (typeof bVal === 'undefined' || bVal === null) {
    return -1;
  }

  if (typeof bVal === 'string') {
    bVal = bVal.toLowerCase();
  }
  if (typeof aVal === 'string') {
    aVal = aVal.toLowerCase();
  }

  if (!Number.isNaN(Number(aVal)) && !Number.isNaN(Number(bVal))) {
    aVal = Number(aVal);
    bVal = Number(bVal);
  }

  if (bVal < aVal) {
    return -1;
  }
  if (bVal > aVal) {
    return 1;
  }

  return 0;
}

export type SortOrder = 'ascending' | 'descending';

export function getComparator<T, Key = keyof T>(
  order: SortOrder,
  orderBy: Key
): (a: T, b: T) => number {
  return order === 'descending'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number): T[] {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) {
      return order;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

export const newSortOrder = new Map<SortOrder, SortOrder>([
  ['ascending', 'descending'],
  ['descending', 'ascending'],
]);
