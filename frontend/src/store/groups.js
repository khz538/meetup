// frontend/src/store/groups.js
import { csrfFetch } from './csrf';

const GET_ALL_GROUPS = 'groups/GET_ALL_GROUPS';

const getAllGroups = groups => {
    return {
        type: GET_ALL_GROUPS,
        groups,
    };
};

export const getAllGroupsThunk = () => async dispatch => {
    const response = await fetch('/api/groups');
    if (response.ok) {
        const data = await response.json();
        dispatch(getAllGroups(data));
        return data;
    }
}

const initialState = {};
const groupsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_GROUPS: {
            const newState = { ...state };
            action.groups.map(group => newState[group.id] = group);
            return newState;
        };
    };
};

export default groupsReducer;