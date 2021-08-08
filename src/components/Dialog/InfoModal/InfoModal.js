import Modal from "../../UI/Modal/Modal";
import classes from './InfoModal.module.scss';
import { useMemo, useState } from 'react';

const modalButtons = [
    {
        name: 'Sil',
        color: 'white',
        backgroundColor: 'red',
        actionType: 'delete'
    }
]

const contentInfo = {
    name: 'Fazil Əmirli',
    doctor: 'Rustem Hesenli',
    departament: 'Kosmetologiya',
    phone: '516764390',
    email: 'fazil@gmail.com',
    date: '09.08.2021',
    time: '15:00',
    note: 'Uzun muddetdi basimda kecellik hiss edirem'
}

const keyEq = {
    name: 'Xəstə Adı',
    doctor: 'Həkim Adı',
    departament: 'Şöbə Adı',
    phone: 'Telefon Nörməsi',
    email: 'Email Ünvanı',
    date: 'Müraciət tarixi',
    time: 'Müraciət Saatı',
    note: 'Qeyd'
}

function InfoModal(props) {
    const [ openModal, setOpenModal ] = useState(true);

    const content = useMemo(()=>{
        const result = [];
        for (let key in contentInfo) {
            result.push(
                <div className={classes.InfoCol}>
                    <h3 className={classes.InfoHead}>{keyEq[key]}</h3>
                    <p className={classes.InfoBody}>{contentInfo[key]}</p>
                </div>
            )
        }
        return result;
    }, [props]);

    return openModal 
        ? (
        <Modal
                title="Xəstə Məlumatı"
                dispatch={()=>{}}
                onClose={()=>setOpenModal(false)}
                buttons={modalButtons}>
                    <div className={classes.Container}>
                        {content}
                    </div>
        </Modal>
    ) : null;
}

export default InfoModal;