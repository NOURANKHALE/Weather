import React, { useEffect, useState } from 'react';
import { DndContext,closestCenter,PointerSensor,useSensor,useSensors,DragOverlay,} from '@dnd-kit/core';
import {arrayMove,SortableContext,rectSortingStrategy,useSortable} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { storage } from '@/lib/utils/storage';

interface SortableGridProps<T> {
  items: T[];
  renderItem: (item: T, isDragging: boolean) => React.ReactNode;
  storageKey: string;
  getItemId: (item: T) => string;
  className?: string;
}

function SortableGrid<T>({ items, renderItem, storageKey, getItemId, className = '' }: SortableGridProps<T>) {
  const [order, setOrder] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Initialize order from storage or items
  useEffect(() => {
    const stored = storage.get<string[]>(storageKey, []);
    const itemIds = items.map(getItemId);
    // Only use stored order if it matches the current items
    if (stored && stored.length === itemIds.length && stored.every(id => itemIds.includes(id))) {
      setOrder(stored);
    } else {
      setOrder(itemIds);
    }
  }, [items, storageKey, getItemId]);

  // Persist order
  useEffect(() => {
    if (order.length > 0) {
      storage.set(storageKey, order);
    }
  }, [order, storageKey]);

  // DnDKit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  // Map order to items
  const orderedItems = order
    .map(id => items.find(item => getItemId(item) === id))
    .filter(Boolean) as T[];

  // Sortable item wrapper
  function SortableItem({ item }: { item: T }) {
    const id = getItemId(item);
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: isDragging ? 50 : 1,
      opacity: isDragging ? 0.3 : 1,
    };
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {renderItem(item, isDragging)}
      </div>
    );
  }

  // Find the active item for DragOverlay
  const activeItem = activeId ? items.find(item => getItemId(item) === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={e => setActiveId(e.active.id as string)}
      onDragEnd={e => {
        setActiveId(null);
        const { active, over } = e;
        if (over && active.id !== over.id) {
          const oldIndex = order.indexOf(active.id as string);
          const newIndex = order.indexOf(over.id as string);
          const newOrder = arrayMove(order, oldIndex, newIndex);
          setOrder(newOrder);
        }
      }}
      onDragCancel={() => setActiveId(null)}
    >
      <SortableContext items={order} strategy={rectSortingStrategy}>
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ${className}`}>
      {orderedItems.map(item => (
            <SortableItem key={getItemId(item)} item={item} />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeItem ? renderItem(activeItem, true) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default SortableGrid; 