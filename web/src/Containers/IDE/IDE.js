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

                    updateEditor(messagePayload.code, messagePayload.evaluating, messagePayload.evaluation)
                }
            })
    }
    evaluate() {
        const { code } = this.props.editor
        const { evaluate } = this.props

        evaluate('Default Author', code)
    }

    render() {
        const { syncChanges } = this.props
        const { code, evaluation } = this.props.editor;

        return (
            <div>
                <button onClick={this.evaluate.bind(this)}>Evaluate</button>
                {/* TODO - make side by side */}
                <CodeEditor code={code} onChange={syncChanges} />
                <Terminal evaluation={evaluation} />
            </div>
        )
    }
}
