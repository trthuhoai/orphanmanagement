import { MetaTags } from "react-meta-tags";
import { Navigate } from "react-router-dom";
import Header from "../../components/header/Header";
import NurturerList from "../../components/nurturer/NurturerList";
import Sidebar from "../../components/sidebar/Sidebar";
import NotificationContextProvider from "../../contexts/NotificationContext";
import NurturerContextProvider from "../../contexts/NurturerContext";
import "./list.scss";

const ListNurturer = () => {
    const token = localStorage.getItem("token");
    if (token === null) {
        return <Navigate to="/" />;
    }

    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Nhận nuôi trẻ</title>
            </MetaTags>
            <Sidebar />
            <div className="listContainer">
                <NotificationContextProvider>
                    <Header />
                </NotificationContextProvider>
                <div className="main">
                    <NurturerContextProvider>
                        <NurturerList />
                    </NurturerContextProvider>
                </div>
            </div>
        </div>
    );
};

export default ListNurturer;
