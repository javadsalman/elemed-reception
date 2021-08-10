import classes from './Dashboard.module.scss';
import Table from './../../components/Table/Table';
import Search from './Search/Search';
import Footer from './Footer/Footer';
import { Component } from 'react';
import InfoModal from './../../components/Dialog/InfoModal/InfoModal';
import SelectOptions from './SelectOptions/SelectOptions';
import Modal from '../../components/UI/Modal/Modal';
import PageSpinner from './../../components/UI/Spinners/PageSpinner/PageSpinner';
import { connect } from 'react-redux';



class Dashboard extends Component {
    state = {
        openModal: false,
        warningMessage: null,
        loading: false,
    }


    openModalHandler = () => {
        this.setState({openModal: true})
    }
    closeModalHandler = () => {
        this.setState({openModal: false})
    }

    render() {

        let warningModal = null;
        if (this.state.warningMessage) {
            warningModal = <Modal
                title="Bildiriş"
                buttons={[{name: 'Bəli', color: 'white', backgroundColor: 'red', actionType: 'accepted'}]}
                onClose={()=>{}}
                dispatch={()=>{}}>
                    <p className={classes.WarningMessage}>{this.state.warningMessage}</p>
            </Modal>
        }

        let loading = null;
        if (this.state.loading) {
            loading = <PageSpinner />
        }

        return (
            <div className={classes.Container}>
                {loading}
                {warningModal}
                <InfoModal />
                {
                    this.props.selecting
                    ?
                    <div className={classes.SelectOptionsDiv}>
                        <SelectOptions />
                    </div>
                    :
                    <div className={classes.SearchDiv}>
                        <Search />
                    </div>
                }
                <div className={classes.TableDiv}>
                    <Table />
                </div>
                <div className={classes.FooterDiv}>
                    <Footer />
                </div>
            </div>
        );
    }
   
}

function mapStateToProps(state) {
    return {
        selecting: state.appointment.selecting,
    }
}

export default connect(mapStateToProps)(Dashboard);