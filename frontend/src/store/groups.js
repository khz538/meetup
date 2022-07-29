// frontend/src/store/groups.js
import { csrfFetch } from './csrf';

const GET_ALL_GROUPS = 'groups/GET_ALL_GROUPS';
const GET_ONE_GROUP = 'groups/GET_ONE_GROUP';
const CREATE_GROUP = 'groups/CREATE_GROUP';
const EDIT_GROUP = 'groups/EDIT_GROUP';
const DELETE_GROUP = 'groups/DELETE_GROUP'


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

// Edit group action creator
const editGroup = group => {
    return {
        type: EDIT_GROUP,
        group
    }
}

// Delete group by group ID action creator
const deleteGroup = groupId => {
    return {
        type: DELETE_GROUP,
        groupId,
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
    // console.log('........', response)
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

// Edit a group thunk action creator
export const editGroupThunk = group => async dispatch => {
    const response = await csrfFetch(`/api/groups/${group.id}`, {
        method: 'PUT',
        body: JSON.stringify(group),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        const group = await response.json();
        console.log('group from backend', group);
        dispatch(editGroup(group));
        return group;
    }
}

// Delete a group by its ID thunk action creator
export const deleteGroupThunk = groupId => async dispatch => {
    const response = await csrfFetch(`/api/groups/${groupId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(deleteGroup(groupId));
        return response.ok;
    }
}

const initialState = {};
const groupsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_GROUPS: {
            newState = {};
            action.groups.forEach(group => {
                newState[group.id] = group;
            });
            // newState["groupsArr"] = action.groups;
            return newState;
            // return {
            //     ...state,
            //     groups: action.groups,
            // };
        };
        case GET_ONE_GROUP: {
            newState = {};
            newState[action.group.id] = action.group;
            return newState;
            // return {
            //     ...state,
            //     groups[action.group.id] = action.group,
            // };
        };
        case CREATE_GROUP: {
            newState = { ...state };
            newState[action.group.id] = action.group;
            return newState;
            // return {
            //     ...state,
            //     group: action.group,
            // };
        };
        case EDIT_GROUP: {
            // newState = { ...state }
            // newState[action.group.id] = { ...newState[action.group.id], ...action.group}
            // return newState;
            return {
                ...state,
                [action.group.id]: action.group,
                // state.groups
            };
            // newState = { ...state };
            // newState[action.group.id]: action.group
        };
        case DELETE_GROUP: {
            newState = { ...state };
            delete newState[action.groupId];
            return newState;
        }
        default: {
            return state;
        };
    };
};

export default groupsReducer;