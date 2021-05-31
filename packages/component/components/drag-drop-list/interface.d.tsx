import React from 'react';
import { Property } from 'csstype';

export namespace DragDropListTypes {
  export interface List {
    id: string;
    backgroundColor?: Property.BackgroundColor;
    title?: string;
    items: ListItem[];
  }

  export interface ListItem {
    id: string;
    content?: string;
  }

  export interface DragEndRespond {
    sourceIndex: number;
    sourceListId: string;
    itemId: string;
    destListId?: string;
    destIndex?: number;
  }

  export interface Props {
    lists: List[];
    backgroundColor?: Property.BackgroundColor;
    height?: Property.Height;
    width?: Property.Width;
    onDragEnd: (dragEndRespond: DragEndRespond) => void;
    onItemRender?: (itemId: string) => React.ReactNode;
    onTitleRender?: (listId: string) => React.ReactNode;
  }
}
