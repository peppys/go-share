import React, { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/ext/language_tools';
import 'brace/theme/terminal';
import 'brace/theme/twilight';

export default class CodeEditor extends Component {
    onChange(code) {
        const { onChange } = this.props

        onChange(code)
    }

    render() {
        const { code } = this.props

        return (
            <AceEditor
                value={code}
                mode="javascript"
                theme="twilight"
                onChange={this.onChange.bind(this)}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                width="auto"
                height="300px"
                showGutter={true}
                highlightActiveLine={true}
                fontSize={14}
                setOptions={{
                    enableLiveAutocompletion: true,
                    showLineNumbers: true,
                    tabSize: 4,
                }}
            />
        )
    }
}