import classes from './ContentSpinner.module.scss';
import { CircularProgress } from '@material-ui/core';

function ContentSpinner(props) {

    return(
        <div className={classes.Container}>
            <CircularProgress
            classes={{
                root: classes.Spinner
            }}
            size={70}
            thickness={4}
            color="primary"
            />
        </div>
    );
}

export default ContentSpinner;