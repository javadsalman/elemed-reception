import { Button, TextField } from '@material-ui/core';
import classes from './Login.module.scss';

function Login(props) {

    return (
        <div className={classes.Container}>
            <div className={classes.Box}>
                <h1 className={classes.Heading}>GİRİŞ</h1>
                <div className={classes.TextFieldDiv}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        className={classes.TextField}
                        placeholder="İstifadəçi Adı"
                        type="text" />
                </div>
                <div className={classes.TextFieldDiv}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        className={classes.TextField}
                        placeholder="Şifrə"
                        type="password" />
                </div>
                <div>
                    <Button
                        color="primary"
                        variant="contained"
                        fullWidth
                        size="large">
                        Daxil Ol
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Login;