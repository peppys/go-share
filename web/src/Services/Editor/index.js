import {
    CONNECTING_TO_SERVER, CONNECTING_TO_SERVER_COMPLETE, UPDATE_EDITOR,
    EVALUATING_CODE, EVALUATING_CODE_COMPLETE
} from './types'
import Store from '../Store'
import EditorAPI from '../../API/Editor'

export const connectToServer = () => async dispatch => {
    dispatch({
        type: CONNECTING_TO_SERVER
    })

    const connection = await EditorAPI.connect('tradesy')

    dispatch({
        type: CONNECTING_TO_SERVER_COMPLETE,
        connection: connection
    })
}

export const syncChanges = (code) => dispatch => {
    // WebSocket connection is in the state right now LOL
    const state = Store.getState().editor

    state.connection.send(JSON.stringify({
        sender: 'Default',
        code: code,
        evaluating: state.evaluating,
        evaluation: state.evaluation
    }))

    dispatch(updateEditor(code, state.evaluating, state.evaluation))
}

export const updateEditor = (code, evaluating, evaluation) => dispatch => {
    dispatch({
        type: UPDATE_EDITOR,
        code,
        evaluating,
        evaluation
    })
}

export const evaluate = () => async dispatch => {
    // WebSocket connection is in the state right now LOL
    const connection = Store.getState().editor.connection
    const state = Store.getState().editor

    dispatch(evaluating('Default User'))

    connection.send(JSON.stringify({
        sender: 'Default',
        code: state.code,
        evaluating: true,
        evaluation: state.evaluation
    }))

    const result = await EditorAPI.evaluate(state.code)

    dispatch(evaluatingComplete('Default User', result.data.response))

    connection.send(JSON.stringify({
        sender: 'Default',
        code: state.code,
        evaluating: false,
        evaluation: result.data.response
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
