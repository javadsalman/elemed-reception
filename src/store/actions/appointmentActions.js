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
    MAKE_SEEN,
    TOGGLE_SELECT_ID,
    TOGGLE_SELECT_ALL,
    CLEAR_ID_SET,
    CHANGE_SEARCH_VALUE,
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
                const loadedData = {
                    seenInfo: {
                        all: data.seenCount + data.unseenCount, 
                        unseen: data.unseenCount, 
                        seen: data.seenCount
                    },
                    totalPage: Math.ceil(data.count / 6),
                    infoList: data.results.slice(),
                    };
                dispatch({ type: LOAD_DATA, loadedData });
                dispatch(stopLoading());
            })
            .catch(error => {
                if (error.response.status === 404 && page !== 1) {
                    dispatch(changePage(1));
                    dispatch(loadData());
                }
                dispatch(stopLoading());
            });
    };
};

export function deleteInfo(id) {
    return dispatch => {
        iaxios.delete(`appointment-list/${id}/`)
            .then(response => {
                dispatch(loadData());
            });
    };
};

export function changeSeenType(seenType) {
    return {
        type: CHANGE_SEEN,
        seenType
    };
};

export function changePage(page) {
    return {
        type: CHANGE_PAGE,
        page
    };
};

export function changingSeenType(seenType) {
    return dispatch => {
        dispatch(changeSeenType(seenType));
        dispatch(changePage(1));
        dispatch(loadData());
    };
};

export function changingPage(page) {
    return dispatch => {
        dispatch(changePage(page));
        dispatch(loadData());
    };
};

export function changeSearchType(searchType) {
    return {
        type: CHANGE_SEARCH_TYPE,
        searchType
    };
};

export function changeSearchValue(searchValue) {
    return {
        type: CHANGE_SEARCH_VALUE,
        searchValue,
    };
};

export function makeSeen(id) {
    return {
        type: MAKE_SEEN,
        id,
    };
};

export function toggleSelectId(id) {
    return {
        type: TOGGLE_SELECT_ID,
        id
    };
};

export function toggleSelectAll() {
    return {
        type: TOGGLE_SELECT_ALL,
    };
};

export function clearIdSet() {
    return {
        type: CLEAR_ID_SET,
    };
};

export function editSelectedRows(editType) {
    return (dispatch, getState) => {
        const selectedIdSet = getState().appointment.selectedIdSet
        dispatch(startLoading());
        iaxios.put('appointment-list/edit/', {editType: editType, idList: [...selectedIdSet]})
            .then(response => {
                dispatch(clearIdSet());
                dispatch(loadData());
            })
            .catch(error => {
                dispatch(stopLoading());
            });
    }
}

export function search(searchValue) {
    return dispatch => {
        dispatch(startLoading());
        dispatch(changeSearchValue(searchValue));
        dispatch(loadData());
    }
};