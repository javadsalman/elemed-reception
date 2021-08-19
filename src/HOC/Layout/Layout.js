
import { Fragment } from 'react';
import ButtonAppBar from './../../components/Navigation/AppBar/AppBar';
import classes from './Layout.module.scss'

function Layout(props) {
    return (
        <Fragment>
            <header className={classes.Header}>
                <ButtonAppBar />
            </header>
            <main className={classes.Main}>
                {props.children}
            </main>
        </Fragment>
    )
}

export default Layout