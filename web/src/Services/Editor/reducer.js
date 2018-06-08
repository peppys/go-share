import { CONNECTING_TO_SERVER, CONNECTING_TO_SERVER_COMPLETE, UPDATE_EDITOR } from './types'

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CONNECTING_TO_SERVER:
            return { ...state, loading: true, code: '' }

        case CONNECTING_TO_SERVER_COMPLETE:
            return { ...state, loading: false, connection: action.connection, code: action.latestCode }

        case UPDATE_EDITOR:
            return { ...state, code: action.latestCode }

        default:
            return state
    }
}
