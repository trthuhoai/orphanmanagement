import { MetaTags } from "react-meta-tags";
import { Navigate } from "react-router-dom";
import Header from "../../components/header/Header";
import FormInfo from "../../components/profile/FormInfo";
import Sidebar from "../../components/sidebar/Sidebar";
import NotificationContextProvider from "../../contexts/NotificationContext";
import "./_profile.scss";

const ProfileInfo = () => {
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
                        <FormInfo></FormInfo>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
