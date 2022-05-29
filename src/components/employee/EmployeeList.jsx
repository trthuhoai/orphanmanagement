import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { LoadingList } from "../../components/loading/LoadingSkeleton";
import { EmployeeContext } from "../../contexts/EmployeeContext";
import "../../scss/abstracts/_modal.scss";
import "../../scss/abstracts/_table.scss";
import SearchList from "../search/SearchList";
import Employee from "./Employee";
import EmployeeCreate from "./EmployeeCreate";
import EmployeePagination from "./EmployeePagination";

const EmployeeList = () => {
    const { employees } = useContext(EmployeeContext);
    const { getEmployeesList } = useContext(EmployeeContext);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [keyword, setKeyword] = useState("");
    const getKeyword = (keyword) => {
        setKeyword(keyword);
    };

    useEffect(() => {
        handleClose();
    }, [employees]);

    return (
        <>
            <div className="table">
                <div className="table__top">
                    <h2>Nhân viên</h2>
                    <SearchList
                        placeholder={"Tìm kiếm nhân viên "}
                        getSearchList={getEmployeesList}
                        getKeyword={getKeyword}
                    ></SearchList>
                    <Button className="btn btn--primary" onClick={handleShow}>
                        Thêm nhân viên
                    </Button>
                </div>
                <table className="table__body">
                    <thead>
                        <tr>
                            <th scope="col">Họ và tên</th>
                            <th scope="col">Email</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    {employees.length !== 0 && (
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id}>
                                    <Employee employee={employee} />
                                </tr>
                            ))}
                        </tbody>
                    )}
                    {employees.length === 0 && (
                        <LoadingList columns={4}></LoadingList>
                    )}
                </table>
                <Modal
                    show={show}
                    onHide={handleClose}
                    centered
                    className="modal"
                >
                    <Modal.Header closeButton className="modal__header">
                        <Modal.Title>Thêm nhân viên</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal__body">
                        <EmployeeCreate />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handleClose}
                            className="btn btn--secondary btn__close"
                        >
                            Đóng
                        </Button>
                        <Button
                            variant="success"
                            form="employeeCreate"
                            type="submit"
                            className="btn btn--primary btn__submit"
                        >
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <EmployeePagination keyword={keyword} />
        </>
    );
};

export default EmployeeList;
