import { createBrowserRouter } from "react-router-dom";
import MainOutlet from "./components/MainOutlet";
import Login from "./components/Login";
import Signup from "./components/Signup";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainOutlet />,
        errorElement: <>Error Page</>,
        children: [
            { index: true, element: <Login /> },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <SignUp /> }
        ]
    }
])

export default router