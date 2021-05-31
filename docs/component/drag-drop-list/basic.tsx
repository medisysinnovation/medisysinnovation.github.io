import React, { useState } from 'react';
import { DragDropList, DragDropListTypes } from '@medisys/component';
import { Card } from 'antd';
import { Property } from 'csstype';

const lists = [
  {
    id: 'list-1',
    backgroundColor: '#009933',
    title: 'New',
    items: [
      {
        id: 'item-1',
        content: 'Annie Moon',
      },
      {
        id: 'item-2',
        content: 'Jack Bone',
      },
      {
        id: 'item-3',
        content: 'Helen Wells',
      },
    ],
  },
  {
    id: 'list-2',
    backgroundColor: '#996600',
    title: 'Prepared',
    items: [
      {
        id: 'item-4',
        content: 'Juses Moses',
      },
      {
        id: 'item-5',
        content: 'Guadiola',
      },
    ],
  },
];

export default () => {
  const initData: {
    lists: DragDropListTypes.List[];
    backgroundColor: Property.BackgroundColor;
  } = {
    lists: lists,
    backgroundColor: 'none',
  };

  const [state, setState] = useState(initData);

  const onDragEndHandler = (dragEndRespond: DragEndRespond) => {
    const { sourceListId, destListId, destIndex } = dragEndRespond;

    if (destListId === undefined || destIndex === undefined) return;

    const { lists } = state;

    let modifiedLists =
      sourceListId !== destListId
        ? moveBewteenLists(lists, dragEndRespond)
        : orderInsideTheList(lists, dragEndRespond);

    setState({ ...state, lists: modifiedLists });
  };

  const onTitleRender = (listId: string) => {
    console.log('title rendering:', listId);
    return (
      <h2
        style={{ textAlign: 'center', color: 'white', verticalAlign: 'middle' }}
      >
        {state.lists.filter(list => list.id === listId)[0].title}
      </h2>
    );
  };

  const onItemRender = (itemId: string) => {
    return (
      <Card hoverable style={{ margin: '5px' }}>
        {
          state.lists
            .flatMap(l => l.items)
            .filter(item => item.id === itemId)[0].content
        }
      </Card>
    );
  };

  return (
    <div style={{ height: '500px', overflow: 'auto' }}>
      <DragDropList
        {...state}
        onDragEnd={onDragEndHandler}
        onTitleRender={onTitleRender}
        onItemRender={onItemRender}
      />
    </div>
  );
};

function moveBewteenLists(
  lists: DragDropListTypes.List[],
  dragEndRespond: DragDropListTypes.DragEndRespond,
): any {
  return lists.map(list => {
    const { sourceListId, itemId, destListId, destIndex } = dragEndRespond;
    debugger;
    //Remove the item from the source
    if (list.id === sourceListId)
      return {
        ...list,
        items: list.items.filter(item => item.id !== itemId),
      };

    //Add the item to the source
    if (list.id === destListId) {
      const sourceList = lists.filter(list => list.id === sourceListId)[0];
      const sourceItem = sourceList.items.filter(item => item.id === itemId)[0];
      return {
        ...list,
        items: [
          ...list.items.slice(0, destIndex),
          sourceItem,
          ...list.items.slice(destIndex),
        ],
      };
    }

    return { ...list };
  });
}

function orderInsideTheList(
  lists: DragDropListTypes.List[],
  dragEndRespond: DragDropListTypes.DragEndRespond,
): any {
  const {
    sourceListId,
    itemId: itemId,
    destListId,
    destIndex,
    sourceIndex,
  } = dragEndRespond;

  if (sourceIndex === destIndex) return lists;

  return lists.map(list => {
    if (list.id !== destListId) {
      return list;
    }

    const sourceItem = list.items.filter(item => item.id === itemId)[0];

    const clone = [...list.items];
    clone.splice(sourceIndex, 1);
    clone.splice(destIndex, 0, sourceItem);

    return {
      ...list,
      items: [...clone],
    };
  });
}
