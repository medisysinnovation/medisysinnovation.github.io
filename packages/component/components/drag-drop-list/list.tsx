import React from 'react';
import ListItem from './list-item';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { DragDropListTypes } from './interface.d';

export interface ListProps extends DragDropListTypes.List {
  renderTitle?: (listId: string) => React.ReactNode;
  renderItem?: (itemId: string) => React.ReactNode;
}

const List: React.FC<ListProps> = ({
  id,
  backgroundColor,
  title,
  renderTitle,
  renderItem,
  items,
}) => {
  const columnStyles: React.CSSProperties = {
    backgroundColor: backgroundColor ?? 'lightblue',
    margin: '0.5em',
    border: '1px solid lightgrey',
    flex: 1,
    borderRadius: '0.5em',
    justifyContent: 'stretch',
  };

  const titleNode =
    renderTitle !== undefined ? renderTitle(id) : <h3>{title}</h3>;

  return (
    <Droppable droppableId={id}>
      {(provided: DroppableProvided) => {
        return (
          <div
            style={columnStyles}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {titleNode}
            {items.map((item, index) => (
              <ListItem
                key={item.id}
                {...item}
                index={index}
                renderItem={renderItem}
              />
            ))}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export default List;
