// frontend/src/store/groups.js
import { csrfFetch } from './csrf';

const GET_ALL_GROUPS = 'groups/GET_ALL_GROUPS';
const GET_ONE_GROUP = 'groups/GET_ONE_GROUP';

// Get all groups action creator
const getAllGroups = groups => {
    return {
        type: GET_ALL_GROUPS,
        groups,
    };
};

// Get single group action creator
const getOneGroup = group => {
    return {
        type: GET_ONE_GROUP,
        group,
    };
};

// Get all groups thunk action creator
export const getGroups = () => async dispatch => {
    const response = await csrfFetch('/api/groups');
    if (response.ok) {
        const groups = await response.json();
        dispatch(getAllGroups(groups));
        return groups;
    };
};

// Get single group thunk action creator
export const getGroupById = id => async dispatch => {
    const response = await fetch(`/api/groups/${id}`);
    if (response.ok) {
        const group = await response.json();
        dispatch(getOneGroup(group));
    };
};

const initialState = {};
const groupsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_GROUPS: {
            return {
                ...state,
                groups: action.groups,
            };
        };
        case GET_ONE_GROUP: {
            return {
                ...state,
                group: action.group,
            };
        };
        default: {
            return state;
        }
    };
};

export default groupsReducer;