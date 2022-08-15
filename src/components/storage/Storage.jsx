import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { StorageContext } from "../../contexts/StorageContext";
import StorageDetail from "./StorageDetail";

const Storage = ({ storage }) => {
    const { deleteStorage } = useContext(StorageContext);
    const { restoreStorage } = useContext(StorageContext);

    useEffect(() => {
        handleCloseRestore();
        handleCloseDelete();
    }, [storage]);
    // MODAL DETAIL
    const [showDetail, setShowDetail] = useState(false);
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = () => setShowDetail(true);

    // MODAL FORM Restore
    const [showRestore, setShowRestore] = useState(false);
    const handleCloseRestore = () => setShowRestore(false);
    const handleShowRestore = () => setShowRestore(true);

    // MODAL CONFIRMATION DELETE
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    return (
        <>
            <td>
                <img
                    src={
                        storage.image ||
                        "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
                    }
                    alt=""
                />
                {storage.fullName}
            </td>
            <td>{storage.email} </td>
            <td>{storage.roles[0].description}</td>
            <td>
                <i
                    title="Xem chi tiết"
                    className="bi bi-info-circle icon icon__view"
                    onClick={handleShowDetail}
                ></i>
                <i
                    title="Hoàn tác"
                    className="bi bi-arrow-clockwise icon icon__restore"
                    onClick={handleShowRestore}
                ></i>
                <i
                    className="bi bi-trash3 icon icon__delete"
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
                    <Modal.Title>Thông tin tài khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal__body">
                    <StorageDetail theStorage={storage} />
                </Modal.Body>
            </Modal>
            {/* MODAL RESTORE */}
            <Modal
                show={showRestore}
                onHide={handleCloseRestore}
                centered
                className="modal"
            >
                <Modal.Header closeButton className="modal__header">
                    <Modal.Title>Khôi phục tài khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal__body">
                    <p className="confirm-message">
                        {`Bạn có chắc chắn muốn khôi phục ${storage.fullName} không?`}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleCloseRestore}
                        className="btn btn--secondary btn__close"
                    >
                        Close
                    </Button>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            restoreStorage(storage.id);
                        }}
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
                    <Modal.Title>Xoá tài khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal__body">
                    <p className="confirm-message">
                        {`Bạn có chắc chắn muốn xoá vĩnh viễn ${storage.fullName} khỏi kho lưu trữ không?`}
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
                            deleteStorage(storage.id);
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

export default Storage;
