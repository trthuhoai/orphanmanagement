import { Navigate } from "react-router-dom";
import { MetaTags } from "react-meta-tags";
import FurnitureRequestListLogistic from "../../components/furnitureRequest/FurnitureRequestList_Logistic";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import FurnitureRequestContextProvider from "../../contexts/FurnitureRequestContext";
import "./list.scss";

const ListFurnitureRequest = () => {
    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Yêu cầu sửa chữa</title>
            </MetaTags>
            <Sidebar />
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
