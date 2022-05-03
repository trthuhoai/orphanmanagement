import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ChildrenContext } from "../../contexts/ChildrenContext";
import ChildrenDetail from "./ChildrenDetail";
import ChildrenUpdate from "./ChildrenUpdate";

const Children = ({ children }) => {
    const { deleteChildren } = useContext(ChildrenContext);

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

    useEffect(() => {
        handleCloseUpdate();
        handleCloseDelete();
    }, [children]);

    return (
        <>
            <td>
                <img
                    src={
                        children.image ||
                        "https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
                    }
                    alt=""
                />
                {children.fullName}
            </td>
            <td>{children.dateOfBirth} </td>
            <td>
                {children.status === "WAIT_TO_RECEIVE"
                    ? "Đang ở trung tâm"
                    : "Đã được nhận nuôi"}
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

            {/* ======================= MODAL ================================ */}
            {/* MODAL DETAIL */}
            <Modal
                show={showDetail}
                onHide={handleCloseDetail}
                centered
                className="modal"
            >
                <Modal.Header closeButton className="modal__header">
                    <Modal.Title>Thông tin trẻ em</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal__body">
                    <ChildrenDetail theChildren={children} />
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
                    <Modal.Title>Cập nhật trẻ em</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal__body">
                    <ChildrenUpdate theChildren={children} />
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
                        form="childrenUpdate"
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
                    <Modal.Title>Xoá trẻ em</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal__body">
                    <p className="confirm-message">
                        {`Bạn có chắc chắn muốn xoá ${children.fullName} khỏi danh sách không?`}
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
                            deleteChildren(children.id);
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

export default Children;
