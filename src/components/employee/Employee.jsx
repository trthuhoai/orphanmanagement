import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { EmployeeContext } from "../../contexts/EmployeeContext";
import EmployeeDetail from "./EmployeeDetail";
import EmployeeUpdate from "./EmployeeUpdate";

const Employee = ({ employee }) => {
    const { storeEmployee } = useContext(EmployeeContext);

    useEffect(() => {
        handleCloseUpdate();
        handleCloseDelete();
    }, [employee]);
    // MODAL DETAIL
    const [showDetail, setShowDetail] = useState(false);
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = () => setShowDetail(true);

    // MODAL FORM UPDATE
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    // MODAL CONFIRMATION DELETE
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    return (
        <>
            <td>
                <img
                    src={
                        employee.image ||
                        "https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
                    }
                    alt=""
                />
                {employee.fullName}
            </td>
            <td>{employee.email} </td>
            <td>{employee.phone}</td>
            <td>
                <i
                    title="Xem chi tiết"
                    className="bi bi-info-circle icon icon__view"
                    onClick={handleShowDetail}
                ></i>
                <i
                    title="Chỉnh sửa"
                    className="bi bi-pencil-square icon icon__update"
                    onClick={handleShowUpdate}
                ></i>
                <i
                    title="Lưu trữ"
                    className="bi bi-archive icon icon__storage"
                    onClick={handleShowDelete}
                ></i>
            </td>

            {/* ======================= MODAL ================================ */}
            {/* MODAL DETAIL */}
            <Modal
                show={showDetail}
                onHide={handleCloseDetail}
                centered
                className="modal"
            >
                <Modal.Header closeButton className="modal__header">
                    <Modal.Title>Thông tin nhân viên</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal__body">
                    <EmployeeDetail theEmployee={employee} />
                </Modal.Body>
            </Modal>
            {/* MODAL UPDATE */}
            <Modal
                show={showUpdate}
                onHide={handleCloseUpdate}
                centered
                className="modal"
            >
                <Modal.Header closeButton className="modal__header">
                    <Modal.Title>Cập nhật nhân viên</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal__body">
                    <EmployeeUpdate theEmployee={employee} />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleCloseUpdate}
                        className="btn btn--secondary btn__close"
                    >
                        Close
                    </Button>
                    <Button
                        form="employeeUpdate"
                        variant="success"
                        type="submit"
                        className="btn btn--primary btn__submit"
                    >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* MODAL DELETE */}
            <Modal
                show={showDelete}
                onHide={handleCloseDelete}
                centered
                className="modal"
            >
                <Modal.Header closeButton className="modal__header">
                    <Modal.Title>Xoá nhân viên</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal__body">
                    <p className="confirm-message">
                        {`Nhân viên ${employee.fullName} sẽ được lưu trữ và bị xoá vĩnh viễn trong 7 ngày. Bạn có muốn tiếp tục không?`}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleCloseDelete}
                        className="btn btn--secondary btn__close"
                    >
                        Close
                    </Button>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            storeEmployee(employee.id);
                        }}
                        className="btn btn--primary btn__submit"
                    >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Employee;
