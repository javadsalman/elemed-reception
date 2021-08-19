import React, { memo, useCallback } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Checkbox } from '@material-ui/core';
import classes from './Table.module.scss';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toggleSelectId } from './../../store/actions/appointmentActions';



function BasicTable(props) {
    const history = useHistory(null);

    const rowClickHandler = useCallback((id) => {
        if (props.selectMode) {
            props.onToggleSelectId(id);
        }
        else {
            history.push(`/dashboard/${id}`);
        }
    }, [history, props]);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead classes={{ root: classes.TableHead }}>
                    <TableRow>
                        <TableCell classes={{ root: classes.HeadCell }}>Adı</TableCell>
                        <TableCell classes={{ root: classes.HeadCell }}>Şöbə</TableCell>
                        <TableCell classes={{ root: classes.HeadCell }}>Həkim</TableCell>
                        <TableCell classes={{ root: classes.HeadCell }}>Nömrə</TableCell>
                        <TableCell classes={{ root: classes.HeadCell }}>Tarix</TableCell>
                        {
                            props.selectMode
                                ?
                                <TableCell classes={{ root: classes.HeadCell }}>Seç</TableCell>
                                :
                                null
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.infoList.map((row) => (
                        <TableRow
                            key={row.id}
                            // selected
                            hover
                            onClick={() => rowClickHandler(row.id)}
                            classes={{
                                selected: classes.Selected,
                                root: [classes.Row, row.seen ? classes.Seen : ''].join(' '),
                                hover: classes.RowHover
                            }}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.departament_name}</TableCell>
                            <TableCell>{row.doctor_name}</TableCell>
                            <TableCell>{row.phone}</TableCell>
                            <TableCell>{row.date}</TableCell>
                            {
                                props.selectMode
                                    ?
                                    (
                                        <TableCell className={classes.CheckboxCol} onClick={() => { }}>
                                            <Checkbox
                                                checked={props.selectedIdSet.has(row.id)}
                                                // onChange={() => {checkboxHandler(row.id)}}
                                                color="primary"
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                classes={{
                                                    root: classes.CheckBox
                                                }}
                                            />
                                        </TableCell>
                                    )
                                    :
                                    null
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function mapStateToProps(state) {
    return {
        selectMode: state.appointment.selectMode,
        infoList: state.appointment.infoList,
        selectedIdSet: state.appointment.selectedIdSet
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onToggleSelectId: (id) => dispatch(toggleSelectId(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(BasicTable));