import { MetaTags } from "react-meta-tags";
import FurnitureRequestCreate from "../../components/furnitureRequest/FurnitureRequestCreate";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import FurnitureRequestContextProvider from "../../contexts/FurnitureRequestContext";
import { useParams } from "react-router-dom";
import NotificationContextProvider from "../../contexts/NotificationContext";

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
                        <FurnitureRequestCreate />
                    </FurnitureRequestContextProvider>
                </div>
            </div>
        </div>
    );
};

export default ListFurnitureRequest_Create;
