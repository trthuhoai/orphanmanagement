import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { CharityContext } from "../../contexts/CharityContext";
import CharityDetail from "./CharityDetail";
import CharityUpdate from "./CharityUpdate";

export const viewDate = (dateString) => {
    const dateObj = new Date(
        dateString.substring(6, 10),
        dateString.substring(3, 5) - 1,
        dateString.substring(0, 2),
        dateString.substring(11, 13),
        dateString.substring(14, 16)
    );
    return `${dateObj.getHours()}h${
        dateObj.getMinutes() === 0 ? "" : dateObj.getMinutes()
    } ${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
};

const Charity = ({ charity }) => {
    const { deleteCharity } = useContext(CharityContext);

    useEffect(() => {
        handleCloseUpdate();
        handleCloseDelete();
    }, [charity]);
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
                        charity.image ||
                        "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
                    }
                    alt=""
                />
                {charity.charityName}
            </td>
            <td>{charity.title} </td>
            <td>
                {viewDate(charity.dateStart)} - {viewDate(charity.dateEnd)}
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
                    <Modal.Title>Thông tin hoạt động từ thiện</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal__body">
                    <CharityDetail theCharity={charity} />
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
                    <Modal.Title>Cập nhật hoạt động từ thiện</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal__body">
                    <CharityUpdate theCharity={charity} />
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
                        form="charityUpdate"
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
                    <Modal.Title>Xoá hoạt động từ thiện</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal__body">
                    <p className="confirm-message">
                        {`Bạn có chắc chắn muốn xoá ${charity.fullName} khỏi danh sách không?`}
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
                            deleteCharity(charity.id);
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

export default Charity;
