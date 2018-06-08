import IDE from './IDE'
import { bindActionCreators } from 'redux'
import { connectToServer, updateEditor, syncChanges } from '../../Services/Editor'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
    editor: state.editor
})
const mapDispatchToProps = dispatch => bindActionCreators({ connectToServer, updateEditor, syncChanges }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(IDE)
