import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './redux/store'
import './index.css'
import App from './components/App/App'
import registerServiceWorker from './registerServiceWorker'

const renderApp = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <App/>
            </div>
        </ConnectedRouter>
    </Provider>
)

ReactDOM.render(renderApp(), document.getElementById('root'))
registerServiceWorker()
