export default {
    connect: async (topic) => {
        return new Promise((resolve, reject) => {
            const endpoint = 'ws://localhost:8000/ws'

            // TODO remove window.conn
            const conn = window.conn = new WebSocket(`${endpoint}?topic=${topic}`)

            conn.onopen = e => {
                resolve(conn)
            };
        })
    }
}
