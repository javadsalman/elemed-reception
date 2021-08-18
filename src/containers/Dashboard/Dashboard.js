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
import { clearError, loadData } from './../../store/actions/appointmentActions';
import { Route } from 'react-router-dom';



class Dashboard extends Component {

    componentDidMount() {
        this.props.onLoadData();
    }
    
    openModalHandler = () => {
        this.setState({openModal: true})
    }
    closeModalHandler = () => {
        this.setState({openModal: false})
    }

    render() {

        let warningModal = null;
        if (this.props.error) {
            warningModal = <Modal
                title="Bildiriş"
                // buttons={[{name: 'Bəli', color: 'white', backgroundColor: 'red', actionType: 'accepted'}]}
                buttons={[]}
                onClose={this.props.onClearError}
                dispatch={()=>{}}>
                    <p className={classes.WarningMessage}>{this.props.error}</p>
            </Modal>
        }

        let loading = null;
        if (this.props.loading) {
            loading = <PageSpinner />
        }
        return (
            <div className={classes.Container}>
                {loading}
                {warningModal}
                <Route path="/dashboard/:id" component={InfoModal}/>
                {
                    this.props.selectMode
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
        selectMode: state.appointment.selectMode,
        loading: state.appointment.loading,
        error: state.appointment.error,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onClearError: () => dispatch(clearError()),
        onLoadData: () => dispatch(loadData()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);