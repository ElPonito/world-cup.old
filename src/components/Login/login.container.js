import { connect } from 'react-redux'
import Login from './login.jsx'
import { bindActionCreators } from 'redux'
import { storeToken } from '../../redux/Login'

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        storeToken
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(Login)
