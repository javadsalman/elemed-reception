import { ButtonGroup, Button } from '@material-ui/core';
import { FormatListBulleted, Visibility, VisibilityOff } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import { changeSeenType } from '../../../store/actions/appointmentActions';
import classes from './Footer.module.scss';
import { connect } from 'react-redux';
import { changePage } from './../../../store/actions/appointmentActions';


function Footer(props) {


    return (
        <div className={classes.Container}>
            <div className={classes.ButtonGroupDiv}>
                <ButtonGroup variant="contained" color="default" aria-label="contained default button group">
                    <Button
                        onClick={()=>{props.onChangeSeenType('')}}
                        color={props.seenType === '' ? 'primary' : 'default'}>
                        <FormatListBulleted /> <span className={classes.ButtonNumber}>{props.seenInfo.all}</span>
                    </Button>
                    <Button
                        onClick={()=>{props.onChangeSeenType(false)}}
                        color={props.seenType === false ? 'primary' : 'default'}>
                        <VisibilityOff /> <span className={classes.ButtonNumber}>{props.seenInfo.unseen}</span>
                    </Button>
                    <Button
                        onClick={()=>{props.onChangeSeenType(true)}}
                        color={props.seenType === true ? 'primary' : 'default'}>
                        <Visibility /> <span className={classes.ButtonNumber}>{props.seenInfo.seen}</span>
                    </Button>
                </ButtonGroup>
            </div>
            <div className={classes.Empty}></div>
            <div className={classes.PaginationDiv}>
                <Pagination 
                onChange={(event, page)=>props.onChangePage(page)} 
                count={props.totalPage} 
                color="primary" 
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
        totalPage: state.appointment.totalPage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeSeenType: (seenType) => dispatch(changeSeenType(seenType)),
        onChangePage: (page) => dispatch(changePage(page)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Footer);