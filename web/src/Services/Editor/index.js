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

export const syncChanges = (author, code) => dispatch => {
    // WebSocket connection is in the state right now LOL
    const connection = Store.getState().editor.connection

    connection.send(JSON.stringify({
        type: EditorAPI.MESSAGE_TYPE_CODE,
        author: author,
        message: code
    }))

    dispatch({
        type: UPDATE_EDITOR,
        author: author,
        latestCode: code
    })
}

export const updateEditor = (author, code) => dispatch => {
    dispatch({
        type: UPDATE_EDITOR,
        author: author,
        latestCode: code
    })
}

export const evaluate = code => async dispatch => {
    dispatch({
        type: EVALUATING_CODE,
        code: code
    })

    const result = await EditorAPI.evaluate(code)

    dispatch({
        type: EVALUATING_CODE_COMPLETE,
        result: result.data.response
    })
}
