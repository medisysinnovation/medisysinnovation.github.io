import React, { useEffect, useContext, useState } from 'react';

import PageContainer from './PageContainer';
import TableDemo from './table';
const EditableTableDemo = props => {
  return (
    <PageContainer>
      <TableDemo />
    </PageContainer>
  );
};

export default EditableTableDemo;
