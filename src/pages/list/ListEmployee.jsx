import { Navigate } from "react-router-dom";
import { MetaTags } from "react-meta-tags";
import EmployeeList from "../../components/employee/EmployeeList";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import EmployeeContextProvider from "../../contexts/EmployeeContext";
import "./list.scss";

const ListEmployee = () => {
    const token = localStorage.getItem("token");
    if (token === null) {
        return <Navigate to="/" />;
    }

    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Nhân viên</title>
            </MetaTags>
            <Sidebar />
            <div className="listContainer">
                <Header />
                <div className="main">
                    <EmployeeContextProvider>
                        <EmployeeList />
                    </EmployeeContextProvider>
                </div>
            </div>
        </div>
    );
};

export default ListEmployee;
