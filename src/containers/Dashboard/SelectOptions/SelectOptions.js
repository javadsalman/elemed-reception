import { Button } from '@material-ui/core';
import classes from './SelectOptions.module.scss';
import { selectToggle, toggleSelectAll, editSelectedRows } from './../../../store/actions/appointmentActions';
import { connect } from 'react-redux';
import { useState, useMemo, useCallback, memo } from 'react';
import Modal from '../../../components/UI/Modal/Modal';

const alertTypeEq = {
    'delete': 'silinməsinə',
    'seen': 'görüldü edilməsinə',
    'unseen': 'görülmədi edilməsinə'
}

function SelectOptions(props) {
    const [selectedProcess, setSelectedProcess] = useState(null);

    const modalDispatchHandler = useCallback((actionType) => {
        if (actionType === 'accepted') {
            props.onEditSelectedRows(selectedProcess);
            setSelectedProcess(null);
        }
    }, [props, selectedProcess]);

    const selectProcessHandler = useCallback((editType)=>{
        if (!props.isEmpty) {
            setSelectedProcess(editType)
        }
    },[props.isEmpty])
    
    const modal = useMemo(() => {
        if (!selectedProcess) {
            return null;
        }
        else {
            return <Modal
                buttons={[{name: 'Bəli', color: 'white', backgroundColor: 'red', actionType: 'accepted'}]}
                dispatch={modalDispatchHandler}
                title="Bildiriş"
                onClose={()=>setSelectedProcess(null)}>
                    <p style={{fontSize: 22}}>Seçilmiş məlumatların <b>{alertTypeEq[selectedProcess]}</b> razısızmı?</p>
            </Modal>
        }
    }, [selectedProcess, modalDispatchHandler]);

    return (
        <div className={classes.Container}>
            {modal}
            <div className={classes.SelectAllDiv}>
                <Button
                    color="default"
                    variant="outlined"
                    onClick={props.onToggleSelectAll}
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
                    onClick={()=>{selectProcessHandler('delete')}}
                    size="large">
                    Sil
                </Button>
            </div>
            <div className={classes.SeenDiv}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={()=>{selectProcessHandler('seen')}}
                    size="large">
                    Baxıldı
                </Button>
            </div>
            <div className={classes.UnSeenDiv}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={()=>{selectProcessHandler('unseen')}}
                    size="large">
                    Baxılmadı
                </Button>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        isEmpty: state.appointment.selectedIdSet.size === 0,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onSelectToggle: () => dispatch(selectToggle()),
        onToggleSelectAll: () => dispatch(toggleSelectAll()),
        onEditSelectedRows: (editType) => dispatch(editSelectedRows(editType)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(SelectOptions));