import { ButtonGroup, Button } from '@material-ui/core';
import { FormatListBulleted, Visibility, VisibilityOff } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import classes from './Footer.module.scss';


function Footer(props) {

    return (
        <div className={classes.Container}>
            <div className={classes.ButtonGroupDiv}>
                <ButtonGroup variant="contained" color="default" aria-label="contained default button group">
                    <Button color="primary"><FormatListBulleted /> <span className={classes.ButtonNumber}>98</span></Button>
                    <Button><VisibilityOff /> <span className={classes.ButtonNumber}>15</span></Button>
                    <Button><Visibility /> <span className={classes.ButtonNumber}>83</span></Button>
                </ButtonGroup>
            </div>
            <div className={classes.Empty}></div>
            <div className={classes.PaginationDiv}>
                <Pagination count={10} color="primary" showFirstButton showLastButton />
            </div>
        </div>
    )
}

export default Footer;