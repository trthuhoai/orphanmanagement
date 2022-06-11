import { MetaTags } from "react-meta-tags";
import FurnitureRequestExtendEmployee from "../../components/furnitureRequest/FurnitureRequestExtend_Employee";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import FurnitureRequestEmployeeContextProvider from "../../contexts/FurnitureRequestEmployeeContext";
// import { withRouter } from "react-router-dom";
import { useParams } from 'react-router-dom'
// import "./list.scss";

const ListFurnitureRequestDetail_Employee = () => {
    const params = useParams()
   console.log("id", params.id);
   let id=params.id;

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
                        <FurnitureRequestExtendEmployee furnitureRequestId={id}/>
                    </FurnitureRequestEmployeeContextProvider>
                </div>
            </div>
        </div>
    );
};

export default ListFurnitureRequestDetail_Employee;  