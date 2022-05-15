import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { IntroducerContext } from "../../contexts/IntroducerContext";
import "../../scss/abstracts/_modal.scss";
import "../../scss/abstracts/_table.scss";
import { LoadingList } from "../loading/LoadingSkeleton";
import SearchList from "../search/SearchList";
import Introducer from "./Introducer";
import IntroducerCreate from "./IntroducerCreate";
import IntroducerPagination from "./IntroducerPagination";

const IntroducerList = () => {
    const { introducers } = useContext(IntroducerContext);
    const { searchIntroducer } = useContext(IntroducerContext);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        handleClose();
    }, [introducers]);

    return (
        <>
            <div className="table">
                <div className="table__top">
                    <h2>Giới thiệu trẻ</h2>
                    <SearchList
                        placeholder={"Tìm kiếm người giới thiệu "}
                        searchValue={searchIntroducer}
                    ></SearchList>
                    <Button className="btn btn--primary" onClick={handleShow}>
                        Thêm người giới thiệu
                    </Button>
                </div>
                <table className="table__body">
                    <thead>
                        <tr>
                            <th scope="col">Họ và tên</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    {introducers.length !== 0 && (
                        <tbody>
                            {introducers.map((introducer) => (
                                <tr key={introducer.id}>
                                    <Introducer introducer={introducer} />
                                </tr>
                            ))}
                        </tbody>
                    )}{" "}
                    {introducers.length === 0 && <LoadingList></LoadingList>}
                </table>
                <Modal
                    show={show}
                    onHide={handleClose}
                    centered
                    className="modal"
                >
                    <Modal.Header closeButton className="modal__header">
                        <Modal.Title>Thêm người giới thiệu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal__body">
                        <IntroducerCreate />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handleClose}
                            className="btn btn--secondary btn__close"
                        >
                            Đóng
                        </Button>
                        <Button
                            variant="success"
                            form="introducerCreate"
                            type="submit"
                            className="btn btn--primary btn__submit"
                        >
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <IntroducerPagination />
        </>
    );
};

export default IntroducerList;
