import React, { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/golang';
import 'brace/theme/terminal';
import 'brace/theme/twilight';

export default class CodeEditor extends Component {
    onChange(code) {
        const { onChange } = this.props

        console.log('change', code);

        onChange('Default User', code)
    }

    render() {
        const { code } = this.props

        return (
            <AceEditor
                value={code}
                mode="golang"
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
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: true,
                    showLineNumbers: true,
                    tabSize: 4,
                }}
            />
        )
    }
}