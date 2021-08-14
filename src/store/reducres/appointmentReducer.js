
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
    MAKE_SEEN
} from './../actions/actionTypes';

const initialState = {
    loading: false,
    error: '',
    selecting: false,
    searchType: 'name',
    searchValue: '',
    seenType: '',
    page: 1,
    totalPage: null,
    infoList: [],
    selectedInfoList: [],
    seenInfo: {all: 0, seen: 0, unseen: 0},
    openedInfo: null,
};

const selectToggle = (state) => {
    return { ...state, selecting: !state.selecting };
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
    // console.log(state.infoList, action.id)
    const infoIndex = state.infoList.findIndex(info=>info.id === action.id);
    // console.log('info index', infoIndex);
    if (state.infoList[infoIndex].seen === false) {
        const newInfo = {...state.infoList[infoIndex], seen: true}
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
            unseen: state.seenInfo.unseen -1,
        }
        return {...state, infoList: newInfoList, seenInfo: newSeenInfo};
    }
    return state;
}

function AppointmentReducer(state = initialState, action) {
    switch (action.type) {
        case SELECT_TOGGLE: return selectToggle(state);
        case CHANGE_SEEN: return changeSeenType(state, action);
        case CHANGE_PAGE: return changePage(state, action);
        case CHANGE_SEARCH_TYPE: return changeSearchType(state, action);
        case LOAD_DATA: return loadData(state, action);
        case START_LOADING: return startLoading(state);
        case STOP_LOADING: return stopLoading(state);
        case SET_ERROR: return setError(state, action);
        case CLEAR_ERROR: return clearError(state);
        case MAKE_SEEN: return makeSeen(state, action);
        default: return state;
    }
}

export default AppointmentReducer;