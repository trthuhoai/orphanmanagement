import { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";

const AccountDetail = ({ theAccount }) => {
    const id = theAccount.id;
    const [detailAccount, setDetailAccount] = useState({ roles: [] });

    useEffect(() => {
        getDetailAccount();
    }, []);

    async function getDetailAccount() {
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
            `https://orphanmanagement.herokuapp.com/api/v1/admin/${id}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                result = JSON.parse(result).data;
                setDetailAccount(result);
                console.log(result);
            })
            .catch((error) => console.log("error", error));
    }

    return (
        <Card className="card">
            <Card.Img
                className="card__image"
                variant="top"
                src={
                    detailAccount.image ||
                    "https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
                }
            />
            <Card.Body className="card__body">
                <Card.Title className="card__title">
                    {detailAccount.fullName}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {detailAccount.roles.includes("ROLE_ADMIN")
                        ? "Admin"
                        : detailAccount.roles.includes("ROLE_MANAGER")
                        ? "Manager"
                        : ""}
                </Card.Subtitle>
                <Card.Text>{detailAccount.address}</Card.Text>
                <ListGroup variant="flush">
                    <ListGroup.Item>{detailAccount.address}</ListGroup.Item>
                    <ListGroup.Item>{detailAccount.email}</ListGroup.Item>
                    <ListGroup.Item>
                        {detailAccount.date_of_birth}
                    </ListGroup.Item>
                    <ListGroup.Item>{detailAccount.phone}</ListGroup.Item>
                    <ListGroup.Item>
                        {detailAccount.identification}
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default AccountDetail;
