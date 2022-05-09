import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { EmployeeContext } from "../../contexts/EmployeeContext";
import "../../scss/abstracts/_modal.scss";
import "../../scss/abstracts/_table.scss";
import Employee from "./Employee";
import EmployeeCreate from "./EmployeeCreate";
import EmployeePagination from "./EmployeePagination";

const EmployeeList = () => {
    const { employees } = useContext(EmployeeContext);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        handleClose();
    }, [employees]);

    return (
        <>
            <div className="table">
                <div className="table__top">
                    <h2>Nhân viên</h2>
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
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <Employee employee={employee} />
                            </tr>
                        ))}
                    </tbody>
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
            <EmployeePagination />
        </>
    );
};

export default EmployeeList;
