import { Navigate } from "react-router-dom";
import { MetaTags } from "react-meta-tags";
import FurnitureList from "../../components/furniture/FurnitureList";
import Header from "../../components/header/Header";
import SidebarLogistic from "../../components/sidebar/Sidebar_Logistic";
import FurnitureContextProvider from "../../contexts/FurnitureContext";
import "./list.scss";

const List = () => {
    const token = localStorage.getItem("token");
    if (token === null) {
        return <Navigate to="/" />;
    }

    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Quản lý trang thiết bị</title>
            </MetaTags>
            <SidebarLogistic />
            <div className="listContainer">
                <Header />
                <div className="main">
                    <FurnitureContextProvider>
                        <FurnitureList />
                    </FurnitureContextProvider>
                </div>
            </div>
        </div>
    );
};

export default List;
