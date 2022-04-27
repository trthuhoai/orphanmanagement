import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AccountContext } from "../../contexts/AccountContext";
import { FurnitureContext } from "../../contexts/FurnitureContext";
import AccountDetail from "./AccountDetail";
import FurnitureDetail from "./FurnitureDetail";
import AccountUpdate from "./AccountUpdate";
import FurnitureUpdate from "./FurnitureUpdate";

const Furniture = ({ furniture }) => {
    // const { deleteAccount } = useContext(AccountContext);
    const { deleteFurniture } = useContext(FurnitureContext);
    // // MODAL DETAIL
    const [showDetail, setShowDetail] = useState(false);
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = () => setShowDetail(true);

    // // MODAL FORM UPDATE
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
                        furniture.image ||
                        "https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
                    }
                    alt=""
                />
                {furniture.nameFurniture}
            </td>
            <td>{furniture.status} </td>
            <td>
                {furniture.quantity}
                {/* {furniture.roles.includes("ROLE_ADMIN") ||
                furniture.roles.includes("admin")
                    ? "Admin"
                    : furniture.roles.includes("ROLE_MANAGER") ||
                      furniture.roles.includes("manager")
                    ? "Manager"
                    : ""} */}
            </td>
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
                    className="bi bi-trash3 icon icon__delete"
                    onClick={handleShowDelete}
                ></i> 
            </td>
            <Modal
                show={showDetail}
                onHide={handleCloseDetail}
                centered
                className="modal"
            >
                <Modal.Header closeButton className="modal__header">
                    <Modal.Title>Thông tin trang thiết bị</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal__body">
                    <FurnitureDetail theFurniture={furniture} />
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
                    <Modal.Title>Cập nhật tài khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal__body">
                    <FurnitureUpdate theFurniture={furniture} />
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
                        form="furnitureUpdate"
                        variant="success"
                        type="submit"
                        className="btn btn--primary btn__submit"
                    >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showDelete}
                onHide={handleCloseDelete}
                centered
                className="modal"
            >
                <Modal.Header closeButton className="modal__header">
                    <Modal.Title>Xoá trang thiết bị</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal__body">
                    <p className="confirm-message">
                        {`Bạn có chắc chắn muốn xoá ${furniture.nameFurniture} khỏi danh sách không?`}
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
                            deleteFurniture(furniture.furnitureId);
                        }}
                        className="btn btn--primary btn__submit"
                    >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
{/* Modal */}
        </>
    );
};

export default Furniture;
