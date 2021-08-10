import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './HOC/Layout/Layout';
import Login from './containers/auth/Login/Login';
import { useMemo, Fragment, useEffect } from 'react';
import Dashboard from './containers/Dashboard/Dashboard';
import { connect } from 'react-redux';
import { checkAuth } from './store/actions/authActions';

function App(props) {

    const routes = useMemo(() => {
        if (props.token) {
            return (
                <Fragment>
                    <Route path="/dashboard" component={Dashboard} />
                    <Redirect to="/dashboard" />
                </Fragment>
            )
        }
        // I add this statement for when app init the loading page wouldn't loaing for nothing
        else if (props.token === false) {
            return null;
        }
        else {
            console.log('null hissesi isleyir', props.token)
            return (
                <Fragment>
                    <Route path="/" component={Login} />
                    <Redirect to="/" />
                </Fragment>
            )
        }
    }, [props.token]);

    useEffect(() => {
        props.onCheckAuth();
    }, []);

    return (
        <Layout>
            <Switch>
                {routes}
            </Switch>
        </Layout>
    );
}

function mapStateToProps(state) {
    return {
        token: state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onCheckAuth: () => dispatch(checkAuth()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
