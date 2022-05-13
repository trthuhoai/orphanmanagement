import { useContext, useState, useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { ChildrenContext } from "../../contexts/ChildrenContext";

const ChildrenDetail = ({ theChildren }) => {
    const id = theChildren.id;

    const [detailChildren, setDetailChildren] = useState({});

    const { viewChildren } = useContext(ChildrenContext);
    useEffect(() => {
        viewChildren(id).then((result) => {
            setDetailChildren(result);
        });
    }, []);

    return (
        <Card className="card">
            <Card.Header className="card__header">
                <Card.Img
                    className="card__image"
                    variant="top"
                    src={
                        detailChildren.image ||
                        "https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
                    }
                />
                <div>
                    <Card.Title className="card__title">
                        {detailChildren.fullName}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted card__subtitle">
                        {detailChildren.gender ? "Nam" : "Nữ"}
                    </Card.Subtitle>
                    <Card.Text className="card-text">
                        {detailChildren.status === "WAIT_TO_RECEIVE"
                            ? "Đang ở trung tâm"
                            : "Đã được nhận nuôi"}
                    </Card.Text>
                </div>
            </Card.Header>
            <Card.Body className="card__body">
                <ListGroup variant="flush" className="list-group">
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Ngày sinh
                        </span>
                        <p className="list-group__item-content">
                            {detailChildren.dateOfBirth}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Ngày vào trung tâm
                        </span>
                        <p className="list-group__item-content">
                            {detailChildren.introductoryDate}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Người giới thiệu
                        </span>
                        <p className="list-group__item-content">
                            {detailChildren.nameOfIntroducer}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Ngày được nhận nuôi
                        </span>
                        <p className="list-group__item-content">
                            {detailChildren.adoptiveDate}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Người nhận nuôi
                        </span>
                        <p className="list-group__item-content">
                            {detailChildren.nameOfNurturer}
                        </p>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default ChildrenDetail;
