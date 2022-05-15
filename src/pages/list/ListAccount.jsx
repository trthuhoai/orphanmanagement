import { MetaTags } from "react-meta-tags";
import { Navigate } from "react-router-dom";
import AccountList from "../../components/account/AccountList";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import AccountContextProvider from "../../contexts/AccountContext";
import "./list.scss";

const ListAccount = () => {
    const token = localStorage.getItem("token");
    if (token === null) {
        return <Navigate to="/" />;
    }

    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Tài khoản</title>
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
