import { createBrowserRouter } from "react-router-dom";
import MainOutlet from "./components/MainOutlet";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserOutlet from "./components/UserOutlet";
import UserDashboard from "./pages/UserDashboard";
import ChatScreen from "./components/ChatScreen";
import UserProfile from "./pages/UserProfile";
import ForgetPassword from "./pages/ForgetPassword";
import ChangePassword from "./pages/ChangePassword";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainOutlet />,
        errorElement: <>Error Page</>,
        children: [
            { index: true, element: <Login /> },
            { path: "login", element: <Login /> },
            { path: "signup", element: <Signup /> },
            { path: "forget-password", element: <ForgetPassword /> },
        ]
    },
    {
        path: "/user",
        element: <UserOutlet />,
        children: [
            { index: true, element: <UserDashboard/> },
            { path: "chat", element: <ChatScreen/> },
            { path: "profile", element: <UserProfile/> },
            { path: "change-password", element: <ChangePassword/> },
        ]
    }
])

export default router