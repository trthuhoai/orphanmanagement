import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { viewDate } from "../picnic/Picnic";
import FeedbackReply from "./FeedbackReply";

const Feedback = ({ feedback }) => {
    useEffect(() => {
        handleCloseReply();
    }, [feedback]);

    // MODAL FORM REPLY
    const [showReply, setShowReply] = useState(false);
    const handleCloseReply = () => setShowReply(false);
    const handleShowReply = () => setShowReply(true);

    return (
        <>
            <td>
                <img
                    src={
                        feedback.image ||
                        "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
                    }
                    alt=""
                />
                {feedback.fullName}
            </td>
            <td>{feedback.subject} </td>
            <td>{viewDate(feedback.dateFeedback)}</td>
            <td>
                {feedback.dateReply
                    ? viewDate(feedback.dateReply)
                    : "Đang chờ"}
            </td>
            <td>
                <i
                    title="Phản hồi"
                    className="bi bi-reply icon icon__view"
                    onClick={handleShowReply}
                    style={{ paddingRight: "42px" }}
                ></i>
            </td>

            {/* ======================= MODAL ================================ */}
            {/* MODAL REPLY */}
            <Modal
                show={showReply}
                onHide={handleCloseReply}
                centered
                className="modal"
            >
                <Modal.Header closeButton className="modal__header">
                    <Modal.Title>{feedback.subject}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal__body">
                    <FeedbackReply theFeedback={feedback} />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleCloseReply}
                        className="btn btn--secondary btn__close"
                    >
                        Close
                    </Button>
                    <Button
                        form="replyFeedback"
                        variant="success"
                        type="submit"
                        className="btn btn--primary btn__submit"
                    >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Feedback;
