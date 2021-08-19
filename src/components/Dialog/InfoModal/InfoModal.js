import Modal from "../../UI/Modal/Modal";
import classes from './InfoModal.module.scss';
import { useMemo, useState, useCallback, useEffect, memo } from 'react';
import ContentSpinner from './../../UI/Spinners/ContentSpinner/ContentSpinner';
import iaxios from './../../../iaxios';
import { makeSeen } from "../../../store/actions/appointmentActions";
import { connect } from 'react-redux';
import { deleteInfo } from './../../../store/actions/appointmentActions';


const keyEq = {
    name: 'Xəstə Adı',
    doctor_name: 'Həkim Adı',
    departament_name: 'Şöbə Adı',
    phone: 'Telefon Nörməsi',
    email: 'Email Ünvanı',
    date: 'Müraciət tarixi',
    time: 'Müraciət Saatı',
    note: 'Qeyd'
}

function InfoModal(props) {
    const [loading, setLoading] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(null);
    const [contentInfo, setContentInfo] = useState([]);
    
    const content = useMemo(() => {
        if (loading) {
            return <ContentSpinner />
        }
        else if (!deleteAlert) {
            const result = [];
            for (let key in keyEq) {
                result.push(
                    <div className={classes.InfoCol} key={key}>
                        <h3 className={classes.InfoHead}>{keyEq[key]}</h3>
                        <p className={classes.InfoBody}>{contentInfo[key]}</p>
                    </div>
                )
            }
            return (
                <div className={classes.Container}>{result}</div>
            );
        }
        else if (deleteAlert) {
            return <p style={{fontSize: 22}}>{deleteAlert}</p>
        }
        else {
            return null
        }
    }, [loading, contentInfo, deleteAlert]);

    const modalButtons = useMemo(()=>{
        if (deleteAlert) {
            return [
                {
                    name: 'Bəli',
                    color: 'white',
                    backgroundColor: 'red',
                    actionType: 'deleteAccepted'
                }
            ]
        }
        else {
            return [
                {
                    name: 'Sil',
                    color: 'white',
                    backgroundColor: 'red',
                    actionType: 'delete'
                }
            ]
        }
    }, [deleteAlert]);

    const dispatchHandler = useCallback((actionType)=>{
        switch(actionType) {
            case 'delete':
                setDeleteAlert('Məlumatı silmək istədiyinizə əminsizmi?');
                break;
            case 'deleteAccepted':
                props.history.push("/dashboard")
                props.onDeleteInfo(props.match.params.id);
                break;
            default:
                break;
        }
    }, [props])

    useEffect(() => {
        setLoading(true);
        iaxios.get(`appointment-list/${props.match.params.id}/`)
        .then(response => {
            setContentInfo({...response.data});
            setLoading(false);
            props.onMakeSeen(parseInt(props.match.params.id));
        })
        // .catch(error => {
        //     setLoading(false);
        // });
    }, [props])

    const closeHandler = useCallback(() => {
        props.history.push("/dashboard")
    }, [props]);

    return (
        <Modal
            title="Xəstə Məlumatı"
            dispatch={dispatchHandler}
            onClose={closeHandler}
            buttons={modalButtons}>
                {content}
        </Modal>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        onMakeSeen: (id) => dispatch(makeSeen(id)),
        onDeleteInfo: (id) => dispatch(deleteInfo(id)),
    };
}

export default connect(null, mapDispatchToProps)(memo(InfoModal));