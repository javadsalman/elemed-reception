
import { 
    SELECT_TOGGLE, 
    CHANGE_SEEN, 
    CHANGE_PAGE, 
    CHANGE_SEARCH_TYPE, 
    LOAD_DATA, 
    START_LOADING, 
    STOP_LOADING, 
    SET_ERROR, 
    CLEAR_ERROR, 
    MAKE_SEEN,
    TOGGLE_SELECT_ID,
    TOGGLE_SELECT_ALL,
    CLEAR_ID_SET,
    CHANGE_SEARCH_VALUE
} from './../actions/actionTypes';

const initialState = {
    loading: false,
    error: '',
    searchType: 'name',
    searchValue: '',
    seenType: '',
    page: 1,
    totalPage: null,
    infoList: [],
    selectMode: false,
    selectedIdSet: new Set(),
    seenInfo: {all: 0, seen: 0, unseen: 0},
    openedInfo: null,
};

const selectToggle = (state) => {
    if (state.selectMode) {
        return { ...state, selectMode: false, selectedIdSet: new Set() };
    }
    else {
        return { ...state, selectMode: true };
    }
};
const changeSeenType = (state, action) => {
    return { ...state, seenType: action.seenType };
};
const changePage = (state, action) => {
    return { ...state, page: action.page }
}
const changeSearchType = (state, action) => {
    return {...state, searchType: action.searchType};
};
const changeSearchValue = (state, action) => {
    return {...state, searchValue: action.searchValue};
};
const loadData = (state, action) => {
    return {...state, ...action.loadedData, loading: false};
};
const startLoading = (state) => {
    return {...state, loading: true};
};
const stopLoading = (state) => {
    return {...state, loading: false};
};
const setError = (state, action) => {
    return {...state, error: action.error};
};
const clearError = (state) => {
    return {...state, error: null};
};
const makeSeen = (state, action) => {
    const infoIndex = state.infoList.findIndex(info=>info.id === action.id);
    if (state.infoList[infoIndex].seen === false) {
        const newInfo = {...state.infoList[infoIndex], seen: true};
        const newInfoList = state.infoList.map((el, index) => {
            if (index === infoIndex) {
                return newInfo;
            }
            else {
                return el
            }
        });
        const newSeenInfo = {
            all: state.seenInfo.all,
            seen: state.seenInfo.seen + 1,
            unseen: state.seenInfo.unseen - 1,
        };
        return {...state, infoList: newInfoList, seenInfo: newSeenInfo};
    }
    return state;
};
const toggleSelectId = (state, action) => {
    const newIdSet = new Set(state.selectedIdSet);
    if (state.selectedIdSet.has(action.id)) {
        newIdSet.delete(action.id);
        return {...state, selectedIdSet: newIdSet};
    }
    else {
        newIdSet.add(action.id);
        return {...state, selectedIdSet: newIdSet};
    }
};
const toggleSelectAll = (state) => {
    const pageIdList = state.infoList.map(info => info.id);
    const newIdSet = new Set(state.selectedIdSet);
    const difference = pageIdList.filter(e => !newIdSet.has(e))
    if (difference.length) {
        pageIdList.forEach(id => newIdSet.add(id))
        return {...state, selectedIdSet: newIdSet};
    }
    else {
        pageIdList.forEach(id => newIdSet.delete(id))
        return {...state, selectedIdSet: newIdSet};
    }
};
const clearIdSet = (state) => {
    return {...state, selectedIdSet: new Set()};
};


function AppointmentReducer(state = initialState, action) {
    switch (action.type) {
        case SELECT_TOGGLE: return selectToggle(state);
        case CHANGE_SEEN: return changeSeenType(state, action);
        case CHANGE_PAGE: return changePage(state, action);
        case CHANGE_SEARCH_TYPE: return changeSearchType(state, action);
        case CHANGE_SEARCH_VALUE: return changeSearchValue(state, action);
        case LOAD_DATA: return loadData(state, action);
        case START_LOADING: return startLoading(state);
        case STOP_LOADING: return stopLoading(state);
        case SET_ERROR: return setError(state, action);
        case CLEAR_ERROR: return clearError(state);
        case MAKE_SEEN: return makeSeen(state, action);
        case TOGGLE_SELECT_ID: return toggleSelectId(state, action);
        case TOGGLE_SELECT_ALL: return toggleSelectAll(state);
        case CLEAR_ID_SET: return clearIdSet(state);
        default: return state;
    }
}

export default AppointmentReducer;