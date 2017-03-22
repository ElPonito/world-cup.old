import { connect } from 'react-redux'
import Counter from './counter.jsx'
import { bindActionCreators } from 'redux'
import { addOne, removeOne } from '../../redux/Counter'

const mapStateToProps = (state) => {
    return {
        counterValue: state.counterReducer.counterValue
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addOne,
        removeOne
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)