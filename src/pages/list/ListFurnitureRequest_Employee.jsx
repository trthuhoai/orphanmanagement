import { MetaTags } from "react-meta-tags";
import FurnitureRequestListEmployee from "../../components/furnitureRequest/FurnitureRequestList_Employee";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import FurnitureRequestEmployeeContextProvider from "../../contexts/FurnitureRequestEmployeeContext";
import NotificationContextProvider from "../../contexts/NotificationContext";
import "./list.scss";

const ListFurnitureRequest = () => {
    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Yêu cầu sửa chữa</title>
            </MetaTags>
            <Sidebar />
            <div className="listContainer">
                <NotificationContextProvider>
                    <Header />
                </NotificationContextProvider>
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
