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
            <Toaster
                theme="dark"
                toastOptions={{
                    style: {
                        color: '#fff',
                    },
                }}
                duration={3000}
                closeButton
            />
            <div className={`${style.container}`}>
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
