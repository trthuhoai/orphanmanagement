import { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";

const FurnitureDetail = ({ theFurniture }) => {
    const id = theFurniture.furnitureId;
    const [detailFurniture, setDetailFurniture] = useState({ roles: [] });
    useEffect(() => {
        getDetailFurniture();
    }, []);

    async function getDetailFurniture() {
        const token = JSON.parse(localStorage.getItem("token"));
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };

        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/furniture/${id}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                result = JSON.parse(result).data;
                setDetailFurniture(result);
                console.log(result);
            })
            .catch((error) => console.log("error", error));
    }

    return (
        <Card className="card">
            <Card.Header className="card__header">
                <Card.Img
                    className="card__image"
                    variant="top"
                    src={
                        detailFurniture.image ||
                        "https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
                    }
                />
                <div>
                    <Card.Title className="card__title">
                        {detailFurniture.nameFurniture}
                    </Card.Title>
                    {/* <Card.Subtitle className="mb-2 text-muted card__subtitle">
                        {detailAccount.roles.includes("ROLE_ADMIN")
                            ? "Admin"
                            : detailAccount.roles.includes("ROLE_MANAGER")
                            ? "Manager"
                            : ""}
                    </Card.Subtitle>
                    <Card.Text className="card-text">
                        {detailAccount.email}
                    </Card.Text> */}
                </div>
            </Card.Header>
            <Card.Body className="card__body">
                <ListGroup variant="flush" className="list-group">
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Số lượng
                        </span>
                        <p className="list-group__item-content">
                            {/* {detailAccount.gender === true
                                ? "Nam"
                                : detailAccount.gender === false
                                ? "Nữ"
                                : ""} */}
                                {detailFurniture.quantity}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Tình trạng
                        </span>
                        <p className="list-group__item-content">
                            {detailFurniture.status} 
                        </p>
                    </ListGroup.Item>
                    {/* <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            CMND/CCCD
                        </span>
                        <p className="list-group__item-content">
                            {detailAccount.identification}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Số điện thoại
                        </span>
                        <p className="list-group__item-content">
                            {detailAccount.phone}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Địa chỉ
                        </span>
                        <p className="list-group__item-content">
                            {detailAccount.address}
                        </p>
                    </ListGroup.Item> */}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default FurnitureDetail;
