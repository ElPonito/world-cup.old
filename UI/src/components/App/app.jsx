import './app.less'
import Navbar from '../Navbar'

const App = ({children}) => {
    return (
        <div className="container-fluid">
            <Navbar/>
            <div className="app-container">
                {children}
            </div>
        </div>
    )
}

export default App