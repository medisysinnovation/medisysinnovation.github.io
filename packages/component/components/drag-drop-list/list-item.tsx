import React from 'react';
import { DragDropListTypes } from './interface.d';
import { Draggable } from 'react-beautiful-dnd';

export interface ListItemProps extends DragDropListTypes.ListItem {
  index: number;
  renderItem?: (itemId: string) => React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({
  id,
  content,
  index,
  renderItem,
}) => {
  const styles = { backgroundColor: 'white', margin: '5px' };

  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {renderItem !== undefined ? (
            renderItem(id)
          ) : (
            <div style={styles}>{content}</div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default ListItem;
