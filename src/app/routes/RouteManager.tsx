import { Navigate, Route, Routes } from 'react-router-dom'
import { BuildingPage } from '../pages/BuildingPage'
import { Navbar, Sidebar } from '../../ui'
import { Dashboard } from '../pages'
import style from '../style/appContainer.module.css'
import { Toaster } from 'sonner'
import { DevicePage } from '../pages/DevicePage'

export const RouteManager = () => {
    return (
        <>
            <Sidebar />
            <div className={`${style.container}`}>
                <Toaster
                    theme="dark"
                    toastOptions={{
                        style: {
                            background: '#1D1E28',
                        },
                    }}
                />
                <Navbar />
                <Routes>
                    <Route path="home" element={<Dashboard />} />
                    <Route path="build" element={<BuildingPage />} />
                    <Route path="device" element={<DevicePage />} />

                    {/* DefaultRoute */}
                    <Route path="/*" element={<Navigate to={'/home'} />} />
                </Routes>
            </div>
        </>
    )
}
