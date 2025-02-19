import type { DragItem } from './types';

export const changeDragItemOrder = function <T>(
  items: T[],
  prevDrag: DragItem,
  nextDrag: DragItem,
  getUniqueId: (item: T) => string | number,
  applyIndex: (item: T, index: number) => T
): T[] {
  const newCols = [...items];
  const prevIndex = newCols.findIndex((col) => getUniqueId(col) === prevDrag.uniqueId);
  const nextIndex = newCols.findIndex((col) => getUniqueId(col) === nextDrag.uniqueId);

  if (prevIndex === -1 || nextIndex === -1) {
    return items;
  }

  const [removed] = newCols.splice(prevIndex, 1);

  newCols.splice(nextIndex, 0, removed);

  return newCols.map(applyIndex);
};
