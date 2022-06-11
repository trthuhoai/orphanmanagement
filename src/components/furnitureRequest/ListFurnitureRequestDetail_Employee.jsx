import { MetaTags } from "react-meta-tags";
import FurnitureRequestDetailEmployee from "../../components/furnitureRequest/FurnitureRequestDetail_Employee";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import FurnitureRequestEmployeeContextProvider from "../../contexts/FurnitureRequestEmployeeContext";
import { useParams } from 'react-router-dom'

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
                        <FurnitureRequestDetailEmployee furnitureRequestId={id}/>
                    </FurnitureRequestEmployeeContextProvider>
                </div>
            </div>
        </div>
    );
};

export default ListFurnitureRequestDetail_Employee;  