import { Navigate } from "react-router-dom";
import { MetaTags } from "react-meta-tags";
import FurnitureRequestListLogistic from "../../components/furnitureRequest/FurnitureRequestList_Logistic";
import Header from "../../components/header/Header";
import SidebarLogistic from "../../components/sidebar/Sidebar_Logistic";
import FurnitureRequestContextProvider from "../../contexts/FurnitureRequestContext";
import "./list.scss";

const ListFurnitureRequest = () => {
    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Yêu cầu sửa chữa</title>
            </MetaTags>
            <SidebarLogistic />
            <div className="listContainer">
                <Header />
                <div className="main">
                    <FurnitureRequestContextProvider>
                        <FurnitureRequestListLogistic />
                    </FurnitureRequestContextProvider>
                </div>
            </div>
        </div>
    );
};

export default ListFurnitureRequest;
