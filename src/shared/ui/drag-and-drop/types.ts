export type DragItem = {
  position: number;
  uniqueId: string | number;
};

export type WithDragProps<T> = T & DragItem;
