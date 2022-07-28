// frontend/src/store/events.js
import { csrfFetch } from './csrf';

const GET_ALL_EVENTS = 'events/GET_ALL_EVENTS';
const GET_ONE_EVENT = 'events/GET_ONE_EVENT';
const CREATE_EVENT = 'events/CREATE_EVENT';
const EDIT_EVENT = 'events/EDIT_EVENT';
const DELETE_EVENT = 'events/DELETE_EVENT';

// Get all events action creator
const getAllEvents = events => {
    return {
        type: GET_ALL_EVENTS,
        events,
    }
}

// Get all events thunk action creator
export const getEvents = () => async dispatch => {
    const response = await fetch('/api/events');
    if (response.ok) {
        const events = await response.json();
        // console.log(events, '----------------------------')
        dispatch(getAllEvents(events));
        return events;
    }
}

const initialState = {};
const eventsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_EVENTS: {
            return {
                ...state,
                ...action.events,
            };
        };
        default: {
            return state;
        }
    };
};

export default eventsReducer;