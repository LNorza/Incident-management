import { Navigate, Route, Routes } from 'react-router-dom'
import {
    BuildingPage,
    Dashboard,
    DevicePage,
    IncidentPage,
    UserPage,
    ProfilePage,
    ChangePage,
    SparePartsPage,
} from '../pages'
import { Navbar, Sidebar } from '../../ui'
import { Toaster } from 'sonner'
import style from '../style/appContainer.module.css'

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
                    <Route path="user" element={<UserPage />} />
                    <Route path="build" element={<BuildingPage />} />
                    <Route path="change" element={<DevicePage />} />
                    <Route path="incident" element={<IncidentPage />} />

                    <Route path="spare-parts" element={<ChangePage />} />
                    <Route path="device" element={<SparePartsPage />} />

                    <Route path="profile" element={<ProfilePage />} />
                    {/* DefaultRoute */}
                    <Route path="/*" element={<Navigate to={'/home'} />} />
                </Routes>
            </div>
        </>
    )
}
