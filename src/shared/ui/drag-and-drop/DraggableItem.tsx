import type { DragItem } from './types';
import type React from 'react';
import type { DropTargetMonitor } from 'react-dnd';

import { createElement, memo, useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import clsx from 'clsx';

type DraggableItemProps<Props> = {
  dragIndex: number;
  uniqueId: string | number;
  wrapperClassName?: string;
  dragClassName?: string;
  onChangeOrder?: (prev: DragItem, next: DragItem) => void;
  acceptTarget: string;
  Content?: React.ComponentType<Props>;
  dragStyle?: React.CSSProperties;
  Wrapper?:
    | 'div'
    | 'p'
    | 'li'
    | 'span'
    | 'tr'
    | 'td'
    | 'th'
    | 'button'
    | 'a'
    | 'input'
    | (React.ComponentType<Props> & React.JSX.IntrinsicAttributes);
  children?: React.ReactNode;
} & { [P in keyof Props]: Props[P] };

const DraggableItemComponent = function DraggableIem<Props>({
  dragIndex,
  wrapperClassName,
  dragClassName,
  onChangeOrder,
  Content,
  acceptTarget,
  dragStyle,
  uniqueId,
  Wrapper = 'div',
  children,
  ...props
}: DraggableItemProps<Props> & Props) {
  const handle = useCallback(
    (draggedColumn: DragItem, monitor: DropTargetMonitor) => {
      if (!monitor.canDrop()) {
        return;
      }
      if (!monitor.isOver({ shallow: true })) {
        return;
      }
      onChangeOrder?.(draggedColumn, { uniqueId, position: dragIndex });
    },
    [onChangeOrder, dragIndex, uniqueId]
  );

  const [, ref] = useDrop(
    {
      accept: acceptTarget,
      drop: handle,
      hover: handle,
    },
    [handle, acceptTarget]
  );

  const [{ isDragging }, drag] = useDrag(
    {
      type: acceptTarget,
      item: { position: dragIndex, uniqueId },
      previewOptions: {
        captureDraggingState: true,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    },
    [dragIndex, uniqueId, acceptTarget]
  );

  const dndProps: React.ComponentProps<'div'> = {
    ref: (elem) => {
      ref(drag(elem));
    },
    className: clsx(wrapperClassName, { [dragClassName ?? '']: isDragging }),
    style: { opacity: isDragging ? 0.5 : 1, backgroundColor: '#0000', ...dragStyle },
    ...(Content ? {} : props),
  };

  return typeof Wrapper === 'string' ? (
    createElement(
      Wrapper,
      dndProps,
      Content ? <Content {...(props as Props & React.JSX.IntrinsicAttributes)} /> : children
    )
  ) : (
    // @ts-expect-error arghhhh
    <Wrapper {...dndProps} {...props}>
      {children}
    </Wrapper>
  );
};

export const DraggableItem = memo(DraggableItemComponent) as never as typeof DraggableItemComponent;
