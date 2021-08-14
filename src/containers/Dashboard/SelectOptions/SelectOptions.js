import { Button } from '@material-ui/core';
import classes from './SelectOptions.module.scss';
import { selectToggle } from './../../../store/actions/appointmentActions';
import { connect } from 'react-redux';

function SelectOptions(props) {


    return (
        <div className={classes.Container}>
            <div className={classes.SelectAllDiv}>
                <Button
                    color="default"
                    variant="outlined"
                    size="large">
                    Hamısı
                </Button>
            </div>
            <div className={classes.ExitDiv}>
                <Button
                    color="default"
                    variant="outlined"
                    onClick={props.onSelectToggle}
                    size="large">
                    Çıx
                </Button>
            </div>
            <div className={classes.Empty} />
            <div className={classes.DeleteDiv}>
                <Button
                    color="secondary"
                    variant="contained"
                    size="large">
                    Sil
                </Button>
            </div>
            <div className={classes.SeenDiv}>
                <Button
                    color="primary"
                    variant="contained"
                    size="large">
                    Baxıldı
                </Button>
            </div>
            <div className={classes.UnSeenDiv}>
                <Button
                    color="primary"
                    variant="contained"
                    size="large">
                    Baxılmadı
                </Button>
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        onSelectToggle: () => dispatch(selectToggle()),
    };
}

export default connect(null, mapDispatchToProps)(SelectOptions);