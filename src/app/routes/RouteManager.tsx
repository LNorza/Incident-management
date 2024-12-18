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
    ChangeHistoryPage,
    ServicesPage,
    ProblemsPage,
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
                    <Route path="device" element={<DevicePage />} />
                    <Route path="incident" element={<IncidentPage />} />
                    <Route path="change" element={<ChangePage />} />
                    <Route path="spare-parts" element={<SparePartsPage />} />
                    <Route path="changes-history" element={<ChangeHistoryPage />} />
                    <Route path="services" element={<ServicesPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="problems" element={<ProblemsPage />} />
                    {/* DefaultRoute */}
                    <Route path="/*" element={<Navigate to={'/home'} />} />
                </Routes>
            </div>
        </>
    )
}
