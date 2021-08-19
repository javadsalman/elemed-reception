import { ButtonGroup, Button } from '@material-ui/core';
import { FormatListBulleted, Visibility, VisibilityOff } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import { changingPage } from '../../../store/actions/appointmentActions';
import classes from './Footer.module.scss';
import { connect } from 'react-redux';
import { changingSeenType } from './../../../store/actions/appointmentActions';
import { memo } from 'react';


function Footer(props) {
    return (
        <div className={classes.Container}>
            <div className={classes.ButtonGroupDiv}>
                <ButtonGroup variant="contained" color="default" aria-label="contained default button group">
                    <Button
                        onClick={()=>{props.onChangingSeenType('')}}
                        color={props.seenType === '' ? 'primary' : 'default'}>
                        <FormatListBulleted /> <span className={classes.ButtonNumber}>{props.seenInfo.all}</span>
                    </Button>
                    <Button
                        onClick={()=>{props.onChangingSeenType(false)}}
                        color={props.seenType === false ? 'primary' : 'default'}>
                        <VisibilityOff /> <span className={classes.ButtonNumber}>{props.seenInfo.unseen}</span>
                    </Button>
                    <Button
                        onClick={()=>{props.onChangingSeenType(true)}}
                        color={props.seenType === true ? 'primary' : 'default'}>
                        <Visibility /> <span className={classes.ButtonNumber}>{props.seenInfo.seen}</span>
                    </Button>
                </ButtonGroup>
            </div>
            <div className={classes.Empty}></div>
            <div className={classes.PaginationDiv}>
                <Pagination 
                onChange={(event, page)=>props.onChangingPage(page)} 
                count={props.totalPage} 
                color="primary"
                page={props.page}
                showFirstButton 
                showLastButton />
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        seenType: state.appointment.seenType,
        seenInfo: state.appointment.seenInfo,
        totalPage: state.appointment.totalPage,
        page: state.appointment.page
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onChangingSeenType: (seenType) => dispatch(changingSeenType(seenType)),
        onChangingPage: (page) => dispatch(changingPage(page)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(memo(Footer));