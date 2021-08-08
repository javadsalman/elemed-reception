import classes from './Dashboard.module.scss';
import Table from './../../components/Table/Table';
import Search from './Search/Search';
import Footer from './Footer/Footer';
import { Component, useMemo, useState } from 'react';
import InfoModal from './../../components/Dialog/InfoModal/InfoModal';



class Dashboard extends Component {
    state = {
        openModal: true
    }


    openModalHandler = () => {
        this.setState({openModal: true})
    }
    closeModalHandler = () => {
        this.setState({openModal: false})
    }

    render() {
        return (
            <div className={classes.Container}>
                <InfoModal />
                <div className={classes.SearchDiv}>
                    <Search />
                </div>
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

export default Dashboard;