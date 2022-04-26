import { useContext, useEffect, useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";
import { AccountContext } from "../../contexts/AccountContext";
import { FurnitureContext } from "../../contexts/FurnitureContext";
import "../../scss/abstracts/_modal.scss";
import "../../scss/abstracts/_table.scss";
import Account from "./Account";
import Furniture from "./Furniture";
import AccountCreate from "./AccountCreate";
import FurnitureCreate from "./FurnitureCreate";
// import "./_account.scss";

const FurnitureList = () => {
   
    // const { accounts } = useContext(AccountContext);
    const { furnitures,addResult } = useContext(FurnitureContext);
    // const { addResult } = useContext(FurnitureContext);
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState(addResult);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // setErrorMessage("addResult");
    useEffect(() => {
        handleClose();
    }, [furnitures]);

    return (
        <div className="table">
            <div className="table__top">
                <h2>Danh sách trang thiết bị</h2>
                <Button className="btn btn--primary" onClick={handleShow}>
                    Thêm trang thiết bị
                </Button>
            </div>
            <table className="table__body">
                <thead>
                    <tr>
                        <th scope="col">Tên trang thiết bị</th>
                        <th scope="col">Tình trạng</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {furnitures.map((furniture) => (
                        <tr key={furniture.id}>
                            <Furniture furniture={furniture} />
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={show} onHide={handleClose} centered className="modal">
                <Modal.Header closeButton className="modal__header">
                    <Modal.Title>Thêm trang thiết bị</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal__body">
                    <FurnitureCreate />
                </Modal.Body>
                <Modal.Footer>
               
                    {/* <Row className="mb-6">
                    <p style={{ color: "red" }}>
                        {errorMessage && (
                            <div className="error"> {errorMessage} </div>
                        )}
                    </p>
                        </Row> */}
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                        className="btn btn--secondary btn__close"
                    >
                        Đóng
                    </Button>
                    <Button
                        variant="success"
                        form="furnitureCreate"
                        type="submit"
                        className="btn btn--primary btn__submit"
                    >
                        Xác nhận 
                    </Button>
                   
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default FurnitureList;
