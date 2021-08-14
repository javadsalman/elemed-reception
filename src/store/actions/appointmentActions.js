import iaxios from './../../iaxios';
import {
    SELECT_TOGGLE,
    CHANGE_SEEN,
    CHANGE_PAGE,
    STOP_LOADING,
    START_LOADING,
    CHANGE_SEARCH_TYPE,
    SET_ERROR,
    CLEAR_ERROR,
    LOAD_DATA,
    MAKE_SEEN
} from './actionTypes';

export function selectToggle() {
    return {
        type: SELECT_TOGGLE
    };
};

export function startLoading() {
    return {
        type: START_LOADING
    };
};

export function stopLoading() {
    return {
        type: STOP_LOADING
    };
};

export function setError(error) {
    return {
        type: SET_ERROR,
        error
    };
};

export function clearError() {
    return {
        type: CLEAR_ERROR,
    };
};


export function loadData() {
    return (dispatch, getState) => {
        const { searchType, searchValue, seenType, page } = getState().appointment;
        const paramData = {
            seen: seenType,
            page: page
        };
        paramData[searchType] = searchValue;
        dispatch(startLoading());
        iaxios.get('appointment-list/', {params: paramData})
            .then(response => {
                const data = response.data;
                console.log(data);
                const loadedData = {
                    seenInfo: {
                        all: data.seenCount + data.unseenCount, 
                        unseen: data.unseenCount, 
                        seen: data.seenCount
                    },
                    totalPage: Math.ceil(data.count / 6),
                    infoList: data.results.slice(),
                    }
                dispatch({ type: LOAD_DATA, loadedData });
                dispatch(stopLoading());
            })
            .catch(error => {
                console.log('xetaya girdi', error.response, error);
                dispatch(stopLoading());
            });
    };
};


export function changeSeenType(seenType) {
    return dispatch => {
        dispatch({ type: CHANGE_SEEN, seenType });
        dispatch(loadData());
    };
};

export function changePage(page) {
    return dispatch => {
        dispatch({ type: CHANGE_PAGE, page });
        dispatch(loadData());
    };
};

export function changeSearchType(searchType) {
    return {
        type: CHANGE_SEARCH_TYPE,
        searchType
    };
};

export function makeSeen(id) {
    return {
        type: MAKE_SEEN,
        id,
    }
}


