import React from 'react';
import List from './list';
import { DragDropListTypes } from './interface.d';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const DragDropList: React.FC<DragDropListTypes.Props> = ({
  lists,
  backgroundColor = 'white',
  width = 'auto',
  onDragEnd,
  onItemRender,
  onTitleRender,
}) => {
  const styles: React.CSSProperties = {
    backgroundColor: backgroundColor,
    display: 'flex',
    width: width,
  };

  const onDragEndHandler = (result: DropResult) => {
    onDragEnd({
      destListId: result.destination?.droppableId,
      destIndex: result.destination?.index,
      sourceListId: result.source.droppableId,
      sourceIndex: result.source.index,
      itemId: result.draggableId,
    });
  };

  return (
    <DragDropContext
      onDragEnd={(result: DropResult) => onDragEndHandler(result)}
    >
      <div style={styles}>
        {lists.map(list => (
          <List
            key={list.id}
            {...list}
            renderTitle={onTitleRender}
            renderItem={onItemRender}
          ></List>
        ))}
      </div>
    </DragDropContext>
  );
};

export default DragDropList;
