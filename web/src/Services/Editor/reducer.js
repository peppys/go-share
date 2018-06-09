import {
    CONNECTING_TO_SERVER, CONNECTING_TO_SERVER_COMPLETE, UPDATE_EDITOR,
    EVALUATING_CODE, EVALUATING_CODE_COMPLETE
} from './types'

const initialState = {
    loading: true, 
    code: '',
    evaluating: false,
    evaluation: ''
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CONNECTING_TO_SERVER:
            return { ...state, loading: true, code: '' }

        case CONNECTING_TO_SERVER_COMPLETE:
            return { ...state, loading: false, connection: action.connection, code: action.latestCode }

        case UPDATE_EDITOR:
            return { ...state, code: action.code, evaluating: action.evaluating, evaluation: action.evaluation }

        case EVALUATING_CODE:
            return { ...state, evaluating: true }

        case EVALUATING_CODE_COMPLETE:
            return { ...state, evaluating: false, evaluation: action.result }

        default:
            return state
    }
}
