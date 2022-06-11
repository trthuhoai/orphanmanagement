import { MetaTags } from "react-meta-tags";
import FurnitureRequestDetail from "../../components/furnitureRequest/FurnitureRequestDetail";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import FurnitureRequestContextProvider from "../../contexts/FurnitureRequestContext";
// import { withRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
// import "./list.scss";
import NotificationContextProvider from "../../contexts/NotificationContext";

const ListFurnitureRequest_Detail = () => {
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
                        <FurnitureRequestDetail furnitureRequestId={id} />
                    </FurnitureRequestContextProvider>
                </div>
            </div>
        </div>
    );
};

export default ListFurnitureRequest_Detail;
