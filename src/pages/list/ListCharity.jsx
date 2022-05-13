import { MetaTags } from "react-meta-tags";
// import CharityList from "../../components/charity/CharityList";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
// import CharityContextProvider from "../../contexts/CharityContext";
import "./list.scss";

const ListCharity = () => {
    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Từ thiện</title>
            </MetaTags>
            <Sidebar />
            <div className="listContainer">
                <Header />
                <div className="main">
                    <h1 style={{ color: "black" }}>Chua co du lieu tu thien</h1>
                    {/* <CharityContextProvider>
                        <CharityList />
                    </CharityContextProvider> */}
                </div>
            </div>
        </div>
    );
};

export default ListCharity;
