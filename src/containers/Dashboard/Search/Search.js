import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import classes from './Search.module.scss';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { changeSearchType, search } from './../../../store/actions/appointmentActions';
import { connect } from 'react-redux';
import { useState, useCallback, useMemo, useEffect, memo } from 'react';
import iaxios from './../../../iaxios';

function Search(props) {
    const [searchResults, setSearchResults] = useState([{name: 'Gözləyin...', id: -1}]);
    const [completedValue, setCompletedValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const currentInputValue = useMemo(()=>({value: ''}), []);

    const inputChangeHandler = useCallback((event, value) => {
        setInputValue(value);
        currentInputValue["value"] = value
    }, [setInputValue, currentInputValue]);

    const changeHandler = useCallback((event, value) => {
        setCompletedValue(value); // value is like that {id: 20, name: "Jerome A James"}
    }, [setCompletedValue]);

    const searchClickHandler = useCallback(() => {
        if (completedValue) {
            props.onSearch(props.searchType === 'name' ? completedValue.name : completedValue.id);
        }
        else {
            props.onSearch('');
        }
    }, [props, completedValue])

    useEffect(() => {
        const timer = setTimeout(() => {
            iaxios.get(`search/?searchType=${props.searchType}&searchValue=${inputValue}`)
                .then(response => {
                    setSearchResults(response.data);
                })
        }, 1500);
        return () => {
            if (inputValue !== currentInputValue["value"]) {
                clearTimeout(timer);
            }
        };
    }, [inputValue, currentInputValue, props.searchType])

    return (
        <div className={classes.Container}>
            <FormControl className={classes.FormControl} variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">Tip</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={props.searchType}
                    onChange={(event)=>(props.onChangeSearchType(event.target.value))}
                    label="searchType"
                >
                    <MenuItem value={'name'}>Xəstə</MenuItem>
                    <MenuItem value={'departament'}>Şöbə</MenuItem>
                    <MenuItem value={'doctor'}>Həkim</MenuItem>
                </Select>
            </FormControl>
            <div className={classes.AutoCompleteDiv}>
                <Autocomplete
                    id="combo-box-demo"
                    options={searchResults}
                    inputValue={inputValue}
                    onInputChange={inputChangeHandler}
                    onChange={changeHandler}
                    freeSolo
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300 }}
                    renderInput={
                        (params) => <TextField
                            {...params}
                            label="Açar Söz"
                            className={classes.TextField}
                            variant="outlined" />
                    }
                />
            </div>
            <div className={classes.SearchButtonDiv}>
                <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    onClick={searchClickHandler}
                    classes={{
                        root: classes.SearchButton
                    }}>
                    Axtar
                </Button>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        searchType: state.appointment.searchType,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        onChangeSearchType: (searchType) => dispatch(changeSearchType(searchType)),
        onSearch: (searchValue) => dispatch(search(searchValue)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(memo(Search));