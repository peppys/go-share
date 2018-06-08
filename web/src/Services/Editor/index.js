import { CONNECTING_TO_SERVER, CONNECTING_TO_SERVER_COMPLETE, UPDATE_EDITOR } from './types'
import Store from '../Store'
import EditorAPI from '../../API/Editor'

export const connectToServer = () => async dispatch => {
    dispatch({
        type: CONNECTING_TO_SERVER
    })

    const connection = await EditorAPI.connect('tradesy')

    dispatch({
        type: CONNECTING_TO_SERVER_COMPLETE,
        connection: connection,
        latestCode: ''
    })
}

export const syncChanges = (author, code) => dispatch => {
    const connection = Store.getState().editor.connection

    connection.send(JSON.stringify({
        author: author,
        code: code
    }))
}

export const updateEditor = (author, code) => dispatch => {
    dispatch({
        type: UPDATE_EDITOR,
        author: author,
        latestCode: code
    })
}