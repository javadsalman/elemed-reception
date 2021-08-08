import classes from './Dashboard.module.scss';
import Table from './../../components/Table/Table';
import Search from './Search/Search';

function Dashboard(props) {

    return (
        <div className={classes.Container}>
            <div className={classes.SearchDiv}>
                <Search />
            </div>
            <div className={classes.TableDiv}>
                <Table />
            </div>
        </div>
    );
}

export default Dashboard;