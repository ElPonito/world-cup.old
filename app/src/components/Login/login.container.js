import { connect } from 'react-redux'
import Login from './login.jsx'
import { bindActionCreators } from 'redux'
import { storeToken, storeTokenInDb } from '../../redux/Login'

const mapDispatchToProps = dispatch => bindActionCreators({ storeToken, storeTokenInDb }, dispatch)

export default connect(null, mapDispatchToProps)(Login)
