import classes from './PageSpiner.module.scss';
import { CircularProgress } from '@material-ui/core';


function PageSpinner(props) {


    return (
        <div className={classes.Container}>
            <div className={classes.SpinnerDiv}>
                <CircularProgress
                    classes={{
                        root: classes.Spinner
                    }}
                    size={200}
                    thickness={7}
                    color="primary"
                />
            </div>
        </div>
    )
}

export default PageSpinner;