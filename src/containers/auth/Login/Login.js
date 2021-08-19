import { Button, TextField } from '@material-ui/core';
import classes from './Login.module.scss';
import PageSpinner from './../../../components/UI/Spinners/PageSpinner/PageSpinner';
import { Fragment, useState, useCallback, memo } from 'react';
import { login, removeError } from './../../../store/actions/authActions';
import { connect } from 'react-redux';
import Modal from '../../../components/UI/Modal/Modal';

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = useCallback(() => {
        props.onLogin(username, password);
    }, [username, password, props])

    return (
        <Fragment>
            {
                props.error
                ?
                <Modal
                    title="Xəta Bildirişi"
                    dispatch={() => { }}
                    onClose={props.onRemoveError}
                    buttons={[]}>
                    <p>{props.error}</p>
                </Modal>
                :
                null
            }
            {props.loading ? <PageSpinner /> : null}
            <div className={classes.Container}>
                <div className={classes.Box}>
                    <h1 className={classes.Heading}>GİRİŞ</h1>
                    <div className={classes.TextFieldDiv}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            className={classes.TextField}
                            placeholder="İstifadəçi Adı"
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                            type="text" />
                    </div>
                    <div className={classes.TextFieldDiv}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            className={classes.TextField}
                            placeholder="Şifrə"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            type="password" />
                    </div>
                    <div>
                        <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            onClick={submitHandler}
                            size="large">
                            Daxil Ol
                        </Button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

function mapStateToProps(state) {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onLogin: (username, password) => dispatch(login(username, password)),
        onRemoveError: () => dispatch(removeError()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Login));