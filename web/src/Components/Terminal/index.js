import React, { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/golang';
import 'brace/theme/terminal';

export default class CodeEditor extends Component {

    render() {
        return (
            <AceEditor
                mode="golang"
                theme="terminal"
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                width="auto"
                showGutter={true}
                highlightActiveLine={false}
                fontSize={16}
                readOnly={true}
                setOptions={{
                    showLineNumbers: false,
                }}
            />
        )
    }
}