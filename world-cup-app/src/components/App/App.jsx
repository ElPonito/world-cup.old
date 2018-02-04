import MenuAppBar from './MenuAppBar/MenuAppBar'

export default ({ children }) => {
    return (
        <div>
            <MenuAppBar/>
            <div>
                {children}
            </div>
        </div>
    )
}