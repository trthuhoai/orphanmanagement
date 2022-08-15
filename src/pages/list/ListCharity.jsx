import { MetaTags } from "react-meta-tags";
import { Navigate } from "react-router-dom";
import CharityList from "../../components/charity/CharityList";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import CharityContextProvider from "../../contexts/CharityContext";
import NotificationContextProvider from "../../contexts/NotificationContext";
import "./list.scss";

const ListCharity = () => {
    const token = localStorage.getItem("token");
    if (token === null) {
        return <Navigate to="/" />;
    }

    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Từ thiện</title>
            </MetaTags>
            <Sidebar />
            <div className="listContainer">
                <NotificationContextProvider>
                    <Header />
                </NotificationContextProvider>
                <div className="main">
                    <CharityContextProvider>
                        <CharityList />
                    </CharityContextProvider>
                </div>
            </div>
        </div>
    );
};

export default ListCharity;
