// frontend/src/store/events.js
import { csrfFetch } from './csrf';

const GET_ALL_EVENTS = 'events/GET_ALL_EVENTS';

// Get all events action creator
const getAllEvents = events => {
    return {
        type: GET_ALL_EVENTS,
        events,
    }
}

// Get all events thunk action creator
export const getEvents = () => async dispatch => {
    const response = await csrfFetch('/api/events');
    if (response.ok) {
        const events = await response.json();
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
                events: action.events,
            };
        };
        default: {
            return state;
        }
    };
};

export default eventsReducer;