import { MetaTags } from "react-meta-tags";
import FurnitureRequestDetail from "../../components/furnitureRequest/FurnitureRequestDetail";
import Header from "../../components/header/Header";
import SidebarLogistic from "../../components/sidebar/Sidebar_Logistic";
import FurnitureRequestContextProvider from "../../contexts/FurnitureRequestContext";
// import { withRouter } from "react-router-dom";
import { useParams } from 'react-router-dom'
// import "./list.scss";

const ListFurnitureRequest_Detail = () => {
    const params = useParams()
   console.log("id", params.id);
   let id=params.id;

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
                        <FurnitureRequestDetail furnitureRequestId={id}/>
                    </FurnitureRequestContextProvider>
                </div>
            </div>
        </div>
    );
};

export default ListFurnitureRequest_Detail;  