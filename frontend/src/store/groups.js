// frontend/src/store/groups.js
import { csrfFetch } from './csrf';

const GET_ALL_GROUPS = 'groups/GET_ALL_GROUPS';
const GET_ONE_GROUP = 'groups/GET_ONE_GROUP';
const CREATE_GROUP = 'groups/CREATE_GROUP';


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

// Create group action creator
const createGroup = group => {
    return {
        type: CREATE_GROUP,
        group,
    }
}

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
    const response = await csrfFetch(`/api/groups/${id}`);
    console.log('........', response)
    if (response.ok) {
        const group = await response.json();
        // console.log(group)
        dispatch(getOneGroup(group));
    };
};

// Create a group thunk action creator
export const createGroupThunk = payload => async dispatch => {
    const response = await csrfFetch(`/api/groups`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        const newGroup = await response.json();
        dispatch(createGroup(newGroup))
        return newGroup;
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
        case CREATE_GROUP: {
            return {
                ...state,
                group: action.group,
            }
        }
        default: {
            return state;
        }
    };
};

export default groupsReducer;