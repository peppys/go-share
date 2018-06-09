import React, { Component } from 'react';
import CodeEditor from '../../Components/CodeEditor'
import Terminal from '../../Components/Terminal'

export default class IDE extends Component {
    componentWillMount() {
        const { connectToServer, updateEditor } = this.props

        connectToServer()
            .then(() => {
                const { connection } = this.props.editor

                connection.onmessage = e => {
                    const messagePayload = JSON.parse(e.data)

                    updateEditor(messagePayload.sender, messagePayload.code, messagePayload.evaluating, messagePayload.evaluation)
                }
            })
    }

    evaluate() {
        const { code, user } = this.props.editor
        const { evaluate } = this.props

        evaluate(user, code)
    }

    onUserChange(e) {
        const { setUser } = this.props
        setUser(e.target.value)
    }

    render() {
        const { syncChanges } = this.props
        const { code, evaluation, user, updates } = this.props.editor;

        return (
            <div>
                <input onChange={this.onUserChange.bind(this)} value={user}/>
                <button onClick={this.evaluate.bind(this)}>Evaluate</button>
                <span>{updates}</span>
                {/* TODO - make side by side */}
                <div>
                    <CodeEditor code={code} onChange={syncChanges} />
                    <Terminal evaluation={evaluation} />
                </div>
            </div>
        )
    }
}
