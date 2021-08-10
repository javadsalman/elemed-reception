import { SELECT_TOGGLE } from './../actions/actionTypes';

const initialState = {
    loading: false,
    selecting: false,
    searchType: '',
    searchValue: '',
    seenType: '',
    page: '',
    resultList: [],
    selectedList: [],
};

const selectToggle = (state) => {
    return {...state, selecting: !state.selecting}
}


function AppointmentReducer(state=initialState, action) {
    switch(action.type) {
        case SELECT_TOGGLE: return selectToggle(state);
        default: return state;
    }
}

export default AppointmentReducer;