import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FeedbackContext } from "../../contexts/FeedbackContext";

const FeedbackCreate = () => {
    const { addFeedback } = useContext(FeedbackContext);
    const [newFeedback, setNewFeedback] = useState({
        body: "",
        email: "",
        fullName: "",
        id: 0,
        subject: "",
    });

    const { body, email, fullName, id, subject } = newFeedback;

    const onInputChange = (e) => {
        setNewFeedback({
            ...newFeedback,
            [e.target.name]: e.target.value,
        });
        console.log(newFeedback);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addFeedback(body, email, fullName, id, subject);
    };
    return (
        <Form className="form" id="feedbackCreate" onSubmit={handleSubmit}>
            <Form.Group className="mb-3 form-group">
                <Form.Control
                    className="form-control"
                    type="text"
                    placeholder="Họ và tên"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => onInputChange(e)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3 form-group">
                <Form.Control
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => onInputChange(e)}
                    required
                />
            </Form.Group>
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
                    placeholder="Nội dung đánh giá"
                    name="body"
                    value={body}
                    onChange={(e) => onInputChange(e)}
                    style={{ height: "200px" }}
                    required
                />
            </Form.Group>
            <Button
                form="feedbackCreate"
                variant="success"
                type="submit"
                className="btn btn--primary btn__submit"
            >
                Gửi đánh giá
            </Button>
        </Form>
    );
};

export default FeedbackCreate;
