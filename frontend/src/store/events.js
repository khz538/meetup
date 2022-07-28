// frontend/src/store/events.js
import { csrfFetch } from './csrf';

const GET_ALL_EVENTS = 'events/GET_ALL_EVENTS';
const GET_ONE_EVENT = 'events/GET_ONE_EVENT';
const GET_EVENT_ATTENDEES = 'events/GET_EVENT_ATTENDEES';
const CREATE_EVENT = 'events/CREATE_EVENT';
const EDIT_EVENT = 'events/EDIT_EVENT';
const DELETE_EVENT = 'events/DELETE_EVENT';

// Get all events action creator
const getAllEvents = events => {
    return {
        type: GET_ALL_EVENTS,
        events,
    }
};

// Get event by eventId
const getOneEvent = event => {
    return {
        type:GET_ONE_EVENT,
        event,
    };
};

// Get event attendees
const getEventAttendees = attendees => {
    return {
        type: GET_EVENT_ATTENDEES,
        attendees,
    }
};

// Get all events thunk action creator
export const getEvents = () => async dispatch => {
    const response = await fetch('/api/events');
    if (response.ok) {
        const events = await response.json();
        // console.log(events, '----------------------------')
        dispatch(getAllEvents(events));
        return events;
    }
};

// Get event by eventId thunk action creator
export const getOneEventThunk = id => async dispatch => {
    const response = await csrfFetch(`/api/events/${id}`);
    if (response.ok) {
        const event = await response.json();
        console.log('thunk', event)
        dispatch(getOneEvent(event));
    };
};

// Get event attendees thunk action creator
export const getEventAttendeesThunk = eventId => async dispatch => {
    const response = await csrfFetch(`/api/events/${eventId}/attendees`);
    if (response.ok) {
        const attendees = await response.json();
        dispatch(getEventAttendees(attendees));
    };
};

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
        case GET_ONE_EVENT: {
            // newState = { ...state }
            // newState[action.event.id] = action.event;
            // return newState;
            return {
                ...state,
                event: action.event,
            }
        };
        case GET_EVENT_ATTENDEES: {
            return {
                ...state,
                attendees: action.attendees,
            }
        }
        default: {
            return state;
        }
    };
};

export default eventsReducer;