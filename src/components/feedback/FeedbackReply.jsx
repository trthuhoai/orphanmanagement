import moment from "moment";
import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { FeedbackContext } from "../../contexts/FeedbackContext";
import { viewDate } from "../picnic/Picnic";
import "./_feedback.scss";

const FeedbackReply = ({ theFeedback }) => {
    const { createReplyFeedback } = useContext(FeedbackContext);
    const [replyFeedback, setReplyFeedback] = useState({
        body: "",
        dateSend: moment(new Date()).format("DD/MM/YYYY hh:mm"),
        id: 0,
        recipients: [theFeedback.email],
        subject: "",
    });
    const { body, recipients, subject } = replyFeedback;

    const onInputChange = (e) => {
        setReplyFeedback({
            ...replyFeedback,
            [e.target.name]: e.target.value,
        });
        console.log(replyFeedback);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createReplyFeedback(theFeedback.id, body, recipients, subject);
    };

    return (
        <div className="feedback-detail">
            <div className="feedback-detail__top">
                <p className="feedback-detail__sender">
                    {theFeedback.fullName}
                </p>
                <span className="feedback-detail__timer">
                    {viewDate(theFeedback.dateFeedback)}
                </span>
            </div>
            <p className="feedback-detail__email">{theFeedback.email}</p>
            <p className="feedback-detail__content">{theFeedback.body}</p>
            {theFeedback.dateReply ? (
                <p className="feedback-detail__message">
                    Đánh giá này đã được phản hồi
                </p>
            ) : (
                <Form
                    className="form"
                    id="replyFeedback"
                    onSubmit={handleSubmit}
                >
                    <Form.Group className="mb-3 form-group">
                        <Form.Control
                            className="form-control"
                            type="text"
                            placeholder="Tiêu đề"
                            name="subject"
                            value={subject}
                            onChange={(e) => onInputChange(e)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 form-group">
                        <Form.Control
                            className="form-control"
                            as="textarea"
                            placeholder="Nội dung phản hồi"
                            name="body"
                            value={body}
                            onChange={(e) => onInputChange(e)}
                            style={{ height: "150px" }}
                            required
                        />
                    </Form.Group>
                </Form>
            )}
        </div>
    );
};

export default FeedbackReply;
