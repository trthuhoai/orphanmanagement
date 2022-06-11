import { MetaTags } from "react-meta-tags";
import { Navigate } from "react-router-dom";
import Header from "../../components/header/Header";
import NotificationCreate from "../../components/notification/NotificationCreate";
import Sidebar from "../../components/sidebar/Sidebar";
import NotificationContextProvider from "../../contexts/NotificationContext";

const Notification = () => {
    const token = localStorage.getItem("token");
    if (token === null) {
        return <Navigate to="/" />;
    }

    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Thông báo</title>
            </MetaTags>
            <Sidebar />
            <div className="listContainer">
                <NotificationContextProvider>
                    <Header />
                    <div className="main">
                        <NotificationCreate/>
                    </div>
                </NotificationContextProvider>
            </div>
        </div>
    );
};

export default Notification;
