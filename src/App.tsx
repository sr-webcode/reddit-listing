import React, { Suspense } from 'react'
import { Result, Button } from 'antd'
import { Switch, Route, useHistory, Redirect } from 'react-router-dom'

import NavMenu from "components/NavMenu";
import { CONTENT_PAGE_ROUTES } from 'config/routes'
import PageSpinner from 'components/PageSpinner';

const ContentPage = React.lazy(() => import('pages/ContentPage'));


function App() {

  const history = useHistory();

  return (
    <Suspense fallback={<PageSpinner />}>
      <NavMenu />
      <Switch>
        {CONTENT_PAGE_ROUTES.map((route, idx) => (
          <Route key={idx} exact path={`/${route}`} component={ContentPage} />
        ))}
        <Redirect exact from="/" to="/hot" />
        <Route component={() => (
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button onClick={() => history.replace("/")} type="primary">Back to Main</Button>}
          />
        )} />
      </Switch>
    </Suspense>
  );
}

export default App;
