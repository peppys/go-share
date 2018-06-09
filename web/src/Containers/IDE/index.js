import IDE from './IDE'
import { bindActionCreators } from 'redux'
import { connectToServer, updateEditor, syncChanges, evaluate } from '../../Services/Editor'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
    editor: state.editor
})
const mapDispatchToProps = dispatch => bindActionCreators({
    connectToServer,
    updateEditor, syncChanges, evaluate
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(IDE)
