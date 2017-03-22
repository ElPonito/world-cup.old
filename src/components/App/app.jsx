import { Link } from 'react-router'
import Navbar from '../Navbar'

const App = ({children}) => {
    return (
        <div className="container-fluid">
            <Navbar/>
            {children}

        </div>
    )
}

export default App