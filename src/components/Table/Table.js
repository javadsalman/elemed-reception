import React from 'react';
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



function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Fazil Əmirli', 'Kasmetologiya', 'Tale Əliyev', '0918454356', '08.08.2021'),
    createData('Aydan Əliyevə', '-', 'Defne Aras', '0917354356', '-'),
    createData('Nihad Həsənli', 'Kardiologiya', 'Defne Aras', '0912344356', '12.08.2021'),
    createData('Həsən Ələkbərli', '-', 'Mustafa Söylemezo', '0918458766', '09.08.2021'),
    createData('Hilal Yılmaz', 'Cərrahiyyə', '-', '0918409856', '22.08.2021'),
    createData('Fəhmin Şamilli', 'Stomotologiya', 'Rəşad Əlivev', '0913544356', '25.08.2021'),
];

function BasicTable(props) {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Adı</TableCell>
                        <TableCell>Şöbə</TableCell>
                        <TableCell>Həkim</TableCell>
                        <TableCell>Nömrə</TableCell>
                        <TableCell>Tarix</TableCell>
                        {
                            props.selecting
                            ?
                                <TableCell>Seç</TableCell>
                            :
                            null
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.calories}</TableCell>
                            <TableCell>{row.fat}</TableCell>
                            <TableCell>{row.carbs}</TableCell>
                            <TableCell>{row.protein}</TableCell>
                            {
                                props.selecting
                                ?
                                (
                                    <TableCell className={classes.CheckboxCol}>
                                        <Checkbox
                                            checked={true}
                                            onChange={()=>{}}
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
        selecting: state.appointment.selecting,
    }
}

export default connect(mapStateToProps)(BasicTable);