import { MetaTags } from "react-meta-tags";
import FurnitureRequestUpdate from "./FurnitureRequestUpdate";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import FurnitureRequestContextProvider from "../../contexts/FurnitureRequestContext";
import { useParams } from 'react-router-dom'

const ListFurnitureRequest_Create = () => {
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
                    <FurnitureRequestContextProvider>
                        <FurnitureRequestUpdate furnitureRequestId={id}/>
                    </FurnitureRequestContextProvider>
                </div>
            </div>
        </div>
    );
};

export default ListFurnitureRequest_Create;  