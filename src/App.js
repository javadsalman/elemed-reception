import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './HOC/Layout/Layout';
import Login from './containers/auth/Login/Login';
import { useMemo, Fragment } from 'react';
import Dashboard from './containers/Dashboard/Dashboard';

function App() {

    const isAuth = true;

    const routes = useMemo(() => {
        if (isAuth) {
            return (
                <Fragment>
                    <Route path="/dashboard" component={Dashboard} />
                    <Redirect to="/dashboard" />
                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    <Route path="/" component={Login} />
                </Fragment>
            )
        }
    }, [isAuth]);

    return (
        <Layout>
            <Switch>
                {routes}
            </Switch>
        </Layout>
    );
}

export default App;
