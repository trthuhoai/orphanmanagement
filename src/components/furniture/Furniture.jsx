import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FurnitureContext } from "../../contexts/FurnitureContext";
import FurnitureDetail from "./FurnitureDetail";
import FurnitureUpdate from "./FurnitureUpdate";

const Furniture = ({ furniture }) => {
    // const { deleteAccount } = useContext(AccountContext);
    const { deleteFurniture } = useContext(FurnitureContext);
    const { updateFurniture } = useContext(FurnitureContext);
    const { storeAccount } = useContext(FurnitureContext);

    useEffect(() => {
        handleCloseUpdate();
        handleCloseDelete();
    }, [furniture]);
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
                        "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
                    }
                    alt=""
                />
                {furniture.nameFurniture}
            </td>
            <td>{furniture.goodQuantity} </td>
            <td>{furniture.brokenQuantity}</td>
            <td>{furniture.status}</td>
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
                    <Modal.Title>Cập nhật thông tin thiết bị</Modal.Title>
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
