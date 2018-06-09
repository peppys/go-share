import {
    CONNECTING_TO_SERVER, CONNECTING_TO_SERVER_COMPLETE, UPDATE_EDITOR,
    EVALUATING_CODE, EVALUATING_CODE_COMPLETE, SET_USER
} from './types'
import Store from '../Store'
import EditorAPI from '../../API/Editor'

export const connectToServer = () => async dispatch => {
    dispatch({
        type: CONNECTING_TO_SERVER
    })

    const connection = await EditorAPI.connect(window.location.pathname.substr(1))

    dispatch({
        type: CONNECTING_TO_SERVER_COMPLETE,
        connection: connection
    })
}

export const syncChanges = (code) => dispatch => {
    // WebSocket connection is in the state right now LOL
    const state = Store.getState().editor

    state.connection.send(JSON.stringify({
        type: UPDATE_EDITOR,
        sender: state.user,
        code: code,
        evaluating: state.evaluating,
        evaluation: state.evaluation
    }))

    dispatch(updateEditor(state.user, code, state.evaluating, state.evaluation))
}

export const updateEditor = (author, code, evaluating, evaluation) => dispatch => {
    dispatch({
        type: UPDATE_EDITOR,
        author,
        code,
        evaluating,
        evaluation
    })
}

export const evaluate = () => async dispatch => {
    // WebSocket connection is in the state right now LOL
    const connection = Store.getState().editor.connection
    const state = Store.getState().editor

    dispatch(evaluating(state.user))

    connection.send(JSON.stringify({
        type: EVALUATING_CODE,
        sender: state.user,
        code: state.code,
        evaluating: true,
        evaluation: state.evaluation
    }))

    let result

    try {
        let response = await EditorAPI.evaluate(state.code)
        result = response.data.response
    } catch (e) {
        result = e.response.data
    }

    dispatch(evaluatingComplete(state.user, result))

    connection.send(JSON.stringify({
        type: EVALUATING_CODE_COMPLETE,
        sender: state.user,
        code: state.code,
        evaluating: false,
        evaluation: result
    }))
}

export const evaluating = (author) => dispatch => {
    dispatch({
        type: EVALUATING_CODE,
        author
    })
}

export const evaluatingComplete = (author, result) => dispatch => {
    dispatch({
        type: EVALUATING_CODE_COMPLETE,
        author,
        result
    })
}

export const setUser = user => dispatch => {
    dispatch({
        type: SET_USER,
        user: user
    })
}
