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
                    const message = JSON.parse(e.data)
                    console.log(message)

                    updateEditor(message.author, message.code)
                }
            })
    }
    evaluate() {
        console.log("Evaluating...")
    }

    render() {
        const { syncChanges } = this.props
        const { code } = this.props.editor;

        return (
            <div>
                <button onClick={this.evaluate}>Evaluate</button>
                {/* TODO - make side by side */}
                <CodeEditor code={code} onChange={syncChanges}/>
                <Terminal />
            </div>
        )
    }
}
