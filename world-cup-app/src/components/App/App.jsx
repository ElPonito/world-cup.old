import Grid from 'material-ui/Grid'
import MenuAppBar from './MenuAppBar/MenuAppBar'
import './App.less'

export default ({ children }) => {
    return (
        <div>
            <MenuAppBar/>
            <div className='app-container'>
                <Grid>
                    {children}
                </Grid>
            </div>
        </div>
    )
}