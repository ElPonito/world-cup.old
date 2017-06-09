import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import Routes from './routes'
import store from './redux/store'
import './assets/style/index.less'
import 'flatpickr/dist/themes/material_blue.css'

render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('app')
)
