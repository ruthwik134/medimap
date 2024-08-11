import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import { UserContextProvider } from "./context/userContext";
import AnotherAccount from "./components/AnotherAccount";
import Testing from "./components/Testing";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/account",
            element: <AnotherAccount />,
        },
        {
            path: "/testing",
            element: <Testing />,
        },
    ]);
    return (
        <>
            <UserContextProvider>
                <RouterProvider router={router} />
            </UserContextProvider>
        </>
    );
}

export default App;
