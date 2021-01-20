import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Basic from './basic';
import styles from './index.less';
const Test = () => <div style={{ textAlign: 'center' }}>Another Test Page</div>;

export default () => {
  return (
    <Router>
      <div>
        <nav>
          <ul className={styles.ul}>
            <li>
              <Link to="/">[Form]</Link>
            </li>
            <li>
              <Link to="/anotherpage">[Another page]</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/anotherpage">
            <Test />
          </Route>

          <Route path="/">
            <Basic />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
