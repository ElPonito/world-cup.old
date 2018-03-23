import MenuAppBar from './MenuAppBar/MenuAppBar'
import './App.less'

export default ({ children }) => {
    return (
        <div>
            <MenuAppBar/>
            <div className='app-container'>
                {children}
            </div>
        </div>
    )
}