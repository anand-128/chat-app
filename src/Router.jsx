import { createBrowserRouter } from "react-router-dom";
import MainOutlet from "./components/MainOutlet";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserOutlet from "./components/UserOutlet";
import ForgetPass from "./pages/ForgetPass";
import ChatScreen from "./components/ChatScreen";
import UserProfile from "./pages/UserProfile";
import ChangePassword from "./pages/ChangePassword";
import UserDashboard from "./pages/UserDashboard";

const rout = createBrowserRouter([
    {
        path: "/",
        element: <MainOutlet />,
        errorElement: <>Error Page</>,
        children: [
            { index: true, element: <Login /> },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <SignUp /> },
            { path: "forget-password", element: <ForgetPass />}
        ]
    },

    {
        path: "/user",
        element: <UserOutlet />,
        children:[
            {index: true, element: <UserDashboard />},
            { path: "chat", element: <ChatScreen /> },
            { path: "profile", element: <UserProfile />},
            { path: "change-password", element: <ChangePassword />}
        ]
    }
])

export default rout