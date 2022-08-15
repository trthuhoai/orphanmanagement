import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FurnitureRequestEmployeeContext } from "../../contexts/FurnitureRequestEmployeeContext";
import "../../scss/abstracts/_modal.scss";
import "../../scss/abstracts/_table.scss";
import FurnitureRequestEmployee from "./FurnitureRequest_Employee";
import FurnitureRequestCreate from "./FurnitureRequestCreate";
import FurnitureRequestPaginationEmployee from "./FurnitureRequestPagination_Employee";
import "./_furnitureRequest.scss";
import { useNavigate } from "react-router-dom";
const FurnitureRequestList = () => {
    const navigate = useNavigate();
    const { furnitureRequestsEmployee } = useContext(FurnitureRequestEmployeeContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () =>{
        navigate("/furniture/request/create")
    }

    useEffect(() => {
        handleClose();
    }, [furnitureRequestsEmployee]);
    // furnitureRequests.reverse();
    return (
        <>
            <div className="table">
                <div className="table__top">
                    <h2>Danh sánh yêu cầu sửa chữa</h2>
                    {/* <Button className="btn btn--primary" onClick={handleShow}>
                        Thêm yêu cầu
                    </Button> */}
                </div>
                <table className="table__body">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Ngày yêu cầu</th>
                            <th scope="col">Hạn cuối</th>
                            <th scope="col">Trạng thái</th>
                            {/* <th scope="col">Nhân viên được giao</th> */}
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {furnitureRequestsEmployee.reverse().map((furnitureRequest) => (
                            <tr key={furnitureRequest.furnitureRequestId}>
                                <FurnitureRequestEmployee furnitureRequest={furnitureRequest} />
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
                        <Modal.Title>Thêm tài khoản</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal__body">
                        <FurnitureRequestCreate />
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
                            form="furnitureRequestCreate"
                            type="submit"
                            className="btn btn--primary btn__submit"
                        >
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <FurnitureRequestPaginationEmployee />
        </>
    );
};

export default FurnitureRequestList;
