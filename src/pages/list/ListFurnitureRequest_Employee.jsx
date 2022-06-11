import { Navigate } from "react-router-dom";
import { MetaTags } from "react-meta-tags";
import FurnitureRequestListEmployee from "../../components/furnitureRequest/FurnitureRequestList_Employee";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import FurnitureRequestEmployeeContextProvider from "../../contexts/FurnitureRequestEmployeeContext";
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
                    <FurnitureRequestEmployeeContextProvider>
                        <FurnitureRequestListEmployee />
                    </FurnitureRequestEmployeeContextProvider>
                </div>
            </div>
        </div>
    );
};

export default ListFurnitureRequest;
