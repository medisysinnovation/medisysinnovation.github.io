import type React from 'react';
import { useEffect } from 'react';

const highlighLastRow = (
  rowId: string,
  ref: React.MutableRefObject<HTMLDivElement> | undefined,
) => {
  if (rowId) {
    setTimeout(() => {
      const newRow = ref?.current?.querySelector(`tr[data-row-key='${rowId}']`) as HTMLElement;
      if (newRow) {
        newRow.addEventListener('click', () => {
          newRow.style.color = 'inherit';
        });
        newRow.style.color = 'orange';
      }
    }, 100);
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Highlight = ({
  tableRef,
  lastRowId,
}: {
  tableRef: React.MutableRefObject<HTMLDivElement | undefined>;
  lastRowId: string | number | undefined;
}) => {
  useEffect(() => {
    // @ts-ignore
    highlighLastRow(lastRowId!, tableRef);
  }, [lastRowId, tableRef]);
};

export default Highlight;
