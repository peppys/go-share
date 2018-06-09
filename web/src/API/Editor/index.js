import axios from 'axios'
import { API_BASE_URL, WEB_SOCKET_BASE_URL } from '../../Config'

export default {
    MESSAGE_TYPE_CODE: 'MESSAGE_TYPE_CODE',
    MESSAGE_TYPE_EVALUATING: 'MESSAGE_TYPE_EVALUATING',
    MESSAGE_TYPE_EVALUATION: 'MESSAGE_TYPE_EVALUATION',

    connect: async topic => {
        return new Promise((resolve, reject) => {
            const endpoint = `${WEB_SOCKET_BASE_URL}/ws`

            console.log(`Attempting to connect to: ${endpoint}?topic=${topic}`)
            const conn = new WebSocket(`${endpoint}?topic=${topic}`)

            conn.onopen = e => {
                resolve(conn)
            };
        })
    },

    evaluate: async code => {
        return axios({
            method: 'post',
            url: '/eval',
            data: {
                code
            },
            baseURL: API_BASE_URL,
            timeout: 100000,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}
