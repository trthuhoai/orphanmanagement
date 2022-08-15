import { MetaTags } from "react-meta-tags";
import { useParams } from "react-router-dom";
import FurnitureRequestContextProvider from "../../contexts/FurnitureRequestContext";
import NotificationContextProvider from "../../contexts/NotificationContext";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import FurnitureRequestUpdate from "./FurnitureRequestUpdate";

const ListFurnitureRequest_Create = () => {
    const params = useParams();
    console.log("id", params.id);
    let id = params.id;
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
                    <FurnitureRequestContextProvider>
                        <FurnitureRequestUpdate furnitureRequestId={id} />
                    </FurnitureRequestContextProvider>
                </div>
            </div>
        </div>
    );
};

export default ListFurnitureRequest_Create;
