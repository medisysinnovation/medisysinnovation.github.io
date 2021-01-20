import { Router } from 'react-router-dom';
import { history } from '@medisys/utils';
import Basic from './basic';

export default () => {
  return (
    <Router history={history}>
      <Basic />
    </Router>
  );
};
