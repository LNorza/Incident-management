import { AuthProvider } from "./auth/context/AuthProvider";
import { AppRouter } from "./routes/AppRouter";

const GestorApp = () => {
    return (
        <>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </>
    );
};

export default GestorApp;
