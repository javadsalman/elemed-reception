import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './HOC/Layout/Layout';
import Login from './containers/auth/Login/Login';
import { useMemo, Fragment, useEffect } from 'react';
import Dashboard from './containers/Dashboard/Dashboard';
import { connect } from 'react-redux';
import { checkAuth } from './store/actions/authActions';
import { loadData } from './store/actions/appointmentActions';

function App(props) {

    const routes = useMemo(() => {
        // I add this section to detect the network connection is exist or not
        if (!window.navigator.onLine) {
            return <h1 
                style={{textAlign: 'center', lineHeight: 10}}>
                İnternet əlaqəsi mövcud deyil!
            </h1>
        }
        else if (props.token) {
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
        if (props.token) {
            setInterval(() => {
                props.onLoadData();
            }, 1000 * 60 * 5);
        }
    }, [props]);

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
        onLoadData: () => dispatch(loadData()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

/* 
mueyyen muddetden bir loading x
withErrorHandler x
token vaxti kecmeyi yoxlamaq x
withMemo
*/