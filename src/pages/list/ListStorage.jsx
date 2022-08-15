import { MetaTags } from "react-meta-tags";
import { Navigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import StorageList from "../../components/storage/StorageList";
import NotificationContextProvider from "../../contexts/NotificationContext";
import StorageContextProvider from "../../contexts/StorageContext";
import "./list.scss";

const ListStorage = () => {
    const token = localStorage.getItem("token");
    if (token === null) {
        return <Navigate to="/" />;
    }

    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Lưu trữ</title>
            </MetaTags>
            <Sidebar />
            <div className="listContainer">
                <NotificationContextProvider>
                    <Header />
                </NotificationContextProvider>
                <div className="main">
                    <StorageContextProvider>
                        <StorageList />
                    </StorageContextProvider>
                </div>
            </div>
        </div>
    );
};

export default ListStorage;
