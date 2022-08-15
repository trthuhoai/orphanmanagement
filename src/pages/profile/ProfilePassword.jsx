import { MetaTags } from "react-meta-tags";
import { Navigate } from "react-router-dom";
import Header from "../../components/header/Header";
import FormPassword from "../../components/profile/FormPassword";
import Sidebar from "../../components/sidebar/Sidebar";
import NotificationContextProvider from "../../contexts/NotificationContext";
import "./_profile.scss";

const ProfilePassword = () => {
    const token = localStorage.getItem("token");
    if (token === null) {
        return <Navigate to="/" />;
    }

    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Trang cá nhân</title>
            </MetaTags>
            <Sidebar />
            <div className="listContainer">
                <NotificationContextProvider>
                    <Header />
                </NotificationContextProvider>
                <div className="main">
                    <div className="profile">
                        <FormPassword></FormPassword>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePassword;
