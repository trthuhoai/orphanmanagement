import { MetaTags } from "react-meta-tags";
import { Navigate } from "react-router-dom";
import Header from "../../components/header/Header";
import NotificationDetail from "../../components/notification/NotificationDetail";
import Sidebar from "../../components/sidebar/Sidebar";
import AccountContextProvider from "../../contexts/AccountContext";
import NotificationContextProvider from "../../contexts/NotificationContext";

const NotificationDetailPage = () => {
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
                            <NotificationDetail />
                        </div>
                </NotificationContextProvider>
            </div>
        </div>
    );
};

export default NotificationDetailPage;
