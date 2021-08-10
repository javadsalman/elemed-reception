import React, { Fragment, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Cached, CheckBox, ExitToApp } from '@material-ui/icons';
import { selectToggle } from './../../../store/actions/appointmentActions';
import { connect } from 'react-redux';
import { logout } from '../../../store/actions/authActions';
import Modal from '../../UI/Modal/Modal';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function ButtonAppBar(props) {
    const classes = useStyles();
    const [openModal, setOpenModal] = useState(false);

    const modalDispatchHandler = useCallback((actionType) => {
        if (actionType === 'logout') {
            props.onLogout();
            setOpenModal(false);
        }
    }, [props.onLogout]);

    return (
        <div className={classes.root}>
            <Fragment>
                {
                    openModal
                        ?
                        <Modal
                            title="Bidiriş"
                            dispatch={modalDispatchHandler}
                            onClose={() => setOpenModal(false)}
                            buttons={[{ name: "Bəli", color: 'white', backgroundColor: 'red', actionType: 'logout' }]}>
                            <p style={{textAlign: 'center', fontSize: 22}}>Hesabı bağlamaq istədiyinizə əminsizmi?<br/>
                            Yenidən giriş səhifəsinə yönləndiriləcəksiz!</p>
                        </Modal>
                        :
                        null
                }

                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            ELMED RANDEVU
                        </Typography>
                        {
                            props.isAuth
                                ?
                                <Fragment>
                                    <Button color="inherit"><Cached /></Button>
                                    <Button color="inherit" onClick={props.onSelectToggle}><CheckBox /></Button>
                                    <Button
                                        color="inherit"
                                        onClick={()=>setOpenModal(true)}>
                                        <ExitToApp />
                                    </Button>
                                </Fragment>
                                :
                                null
                        }
                    </Toolbar>
                </AppBar>
            </Fragment>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        isAuth: Boolean(state.auth.token)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onSelectToggle: () => dispatch(selectToggle()),
        onLogout: () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAppBar);