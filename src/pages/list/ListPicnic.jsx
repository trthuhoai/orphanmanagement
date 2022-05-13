import { MetaTags } from "react-meta-tags";
// import PicnicList from "../../components/picnic/PicnicList";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
// import PicnicContextProvider from "../../contexts/PicnicContext";
import "./list.scss";

const ListPicnic = () => {
    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Dã ngoại</title>
            </MetaTags>
            <Sidebar />
            <div className="listContainer">
                <Header />
                <div className="main">
                    <h1 style={{ color: "black" }}>Chua co du lieu da ngoai</h1>
                    {/* <PicnicContextProvider>
                        <PicnicList />
                    </PicnicContextProvider> */}
                </div>
            </div>
        </div>
    );
};

export default ListPicnic;
