import { useContext, useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { AccountContext } from "../../contexts/AccountContext";
import "../../scss/abstracts/_card.scss";
import { LoadingDetail } from "../loading/LoadingSkeleton";

const AccountDetail = ({ theAccount }) => {
    const id = theAccount.id;

    const [detailAccount, setDetailAccount] = useState({
        roles: [{ description: "" }],
    });
    console.log(detailAccount);
    const { viewAccount } = useContext(AccountContext);
    useEffect(() => {
        viewAccount(id).then((result) => {
            setDetailAccount(result);
        });
    }, []);

    return Object.keys(detailAccount).length !== 1 ? (
        <Card className="card">
            <Card.Header className="card__header">
                <Card.Img
                    className="card__image"
                    variant="top"
                    src={
                        detailAccount.image ||
                        "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
                    }
                />
                <div>
                    <Card.Title className="card__title">
                        {detailAccount.fullName}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted card__subtitle">
                        {detailAccount.roles[0].description}
                    </Card.Subtitle>
                    <Card.Text className="card-text">
                        {detailAccount.email}
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
                            {detailAccount.gender === true
                                ? "Nam"
                                : detailAccount.gender === false
                                ? "Nữ"
                                : ""}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
                        <span className="list-group__item-heading">
                            Ngày sinh
                        </span>
                        <p className="list-group__item-content">
                            {detailAccount.date_of_birth}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item className="list-group__item">
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
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    ) : (
        <LoadingDetail tableName={"account"}/>
    );
};

export default AccountDetail;
