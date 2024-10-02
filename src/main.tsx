import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import GestorApp from './gestorApp'
import { CustomProvider } from 'rsuite'
import './index.css'
import 'rsuite/dist/rsuite.min.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CustomProvider theme="dark">
            <BrowserRouter>
                <GestorApp />
            </BrowserRouter>
        </CustomProvider>
    </React.StrictMode>,
)
