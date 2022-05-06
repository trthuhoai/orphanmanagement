import { MetaTags } from "react-meta-tags";
import AccountList from "../../components/account/AccountList";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import AccountContextProvider from "../../contexts/AccountContext";
import "./list.scss";

const ListAccount = () => {
    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Thành viên</title>
            </MetaTags>
            <Sidebar />
            <div className="listContainer">
                <Header />
                <div className="main">
                    <AccountContextProvider>
                        <AccountList />
                    </AccountContextProvider>
                </div>
            </div>
        </div>
    );
};

export default ListAccount;
