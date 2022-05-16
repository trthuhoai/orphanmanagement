import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { CharityContext } from "../../contexts/CharityContext";
import "../../scss/abstracts/_modal.scss";
import "../../scss/abstracts/_table.scss";
import { LoadingList } from "../loading/LoadingSkeleton";
import SearchList from "../search/SearchList";
import Charity from "./Charity";
import CharityCreate from "./CharityCreate";
import CharityPagination from "./CharityPagination";

const CharityList = () => {
    const { charitys } = useContext(CharityContext);
    const { searchCharity } = useContext(CharityContext);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        handleClose();
    }, [charitys]);

    return (
        <>
            <div className="table">
                <div className="table__top">
                    <h2>Từ thiện</h2>
                    <SearchList
                        placeholder={"Tìm kiếm hoạt động từ thiện "}
                        searchValue={searchCharity}
                    ></SearchList>
                    <Button className="btn btn--primary" onClick={handleShow}>
                        Thêm hoạt động từ thiện
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
                    {charitys.length !== 0 && (
                        <tbody>
                            {charitys.map((charity) => (
                                <tr key={charity.id}>
                                    <Charity charity={charity} />
                                </tr>
                            ))}
                        </tbody>
                    )}{" "}
                    {charitys.length === 0 && (
                        <LoadingList columns={4}></LoadingList>
                    )}
                </table>
                <Modal
                    show={show}
                    onHide={handleClose}
                    centered
                    className="modal"
                >
                    <Modal.Header closeButton className="modal__header">
                        <Modal.Title>Thêm hoạt động từ thiện</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal__body">
                        <CharityCreate />
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
                            form="charityCreate"
                            type="submit"
                            className="btn btn--primary btn__submit"
                        >
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <CharityPagination />
        </>
    );
};

export default CharityList;
