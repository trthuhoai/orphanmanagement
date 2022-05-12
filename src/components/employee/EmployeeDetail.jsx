import { useContext, useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { EmployeeContext } from "../../contexts/EmployeeContext";
import "../../scss/abstracts/_card.scss";

const EmployeeDetail = ({ theEmployee }) => {
    const id = theEmployee.id;

    const [detailEmployee, setDetailEmployee] = useState({
        roles: [{ description: "" }],
    });

    const { viewEmployee } = useContext(EmployeeContext);
    useEffect(() => {
        viewEmployee(id).then((result) => {
            setDetailEmployee(result);
        });
    },[])

    return (
        <Card className="card">
            <Card.Header className="card__header">
                <Card.Img
                    className="card__image"
                    variant="top"
                    src={
                        detailEmployee.image ||
                        "https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
                    }
                />
                <div>
                    <Card.Title className="card__title">
                        {detailEmployee.fullName}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted card__subtitle">
                        {detailEmployee.roles[0].description}
                    </Card.Subtitle>
                    <Card.Text className="card-text">
                        {detailEmployee.email}
                    </Card.Text>
                </div>
            </Card.Header>
            <Card.Body className="card__body">
                <ListGroup variant="flush" className="list-group">
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Giới tính
                        </span>
                        <p className="list-group__item-content">
                            {detailEmployee.gender === true
                                ? "Nam"
                                : detailEmployee.gender === false
                                ? "Nữ"
                                : ""}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Ngày sinh
                        </span>
                        <p className="list-group__item-content">
                            {detailEmployee.date_of_birth}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            CMND/CCCD
                        </span>
                        <p className="list-group__item-content">
                            {detailEmployee.identification}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Số điện thoại
                        </span>
                        <p className="list-group__item-content">
                            {detailEmployee.phone}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Địa chỉ
                        </span>
                        <p className="list-group__item-content">
                            {detailEmployee.address}
                        </p>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default EmployeeDetail;