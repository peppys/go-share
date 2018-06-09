import axios from 'axios'

export default {
    MESSAGE_TYPE_CODE: 'MESSAGE_TYPE_CODE',
    MESSAGE_TYPE_EVALUATING: 'MESSAGE_TYPE_EVALUATING',
    MESSAGE_TYPE_EVALUATION: 'MESSAGE_TYPE_EVALUATION',

    connect: async topic => {
        return new Promise((resolve, reject) => {
            const endpoint = 'ws://localhost:8000/ws'

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
            baseURL: 'http://localhost:8000',
            timeout: 100000,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}
