import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { PicnicContext } from "../../contexts/PicnicContext";
import "../../scss/abstracts/_modal.scss";
import "../../scss/abstracts/_table.scss";
import { LoadingList } from "../loading/LoadingSkeleton";
import SearchList from "../search/SearchList";
import Picnic from "./Picnic";
import PicnicCreate from "./PicnicCreate";
import PicnicPagination from "./PicnicPagination";

const PicnicList = () => {
    const { picnics } = useContext(PicnicContext);
    const { getPicnicsList } = useContext(PicnicContext);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [keyword, setKeyword] = useState("");
    const getKeyword = (keyword) => {
        setKeyword(keyword);
    };

    useEffect(() => {
        handleClose();
    }, [picnics]);

    return (
        <>
            <div className="table">
                <div className="table__top">
                    <h2>Dã ngoại</h2>
                    <SearchList
                        placeholder={"Tìm kiếm hoạt động dã ngoại "}
                        getSearchList={getPicnicsList}
                    ></SearchList>
                    <Button className="btn btn--primary" onClick={handleShow}>
                        Thêm hoạt động dã ngoại
                    </Button>
                </div>
                <table className="table__body">
                    <thead>
                        <tr>
                            <th scope="col">Tên sự kiện</th>
                            <th scope="col">Chủ đề</th>
                            <th scope="col">Thời gian tổ chức</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    {picnics.length !== 0 && (
                        <tbody>
                            {picnics.map((picnic) => (
                                <tr key={picnic.id}>
                                    <Picnic picnic={picnic} />
                                </tr>
                            ))}
                        </tbody>
                    )}{" "}
                    {picnics.length === 0 && (
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
                        <Modal.Title>Thêm hoạt động dã ngoại</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal__body">
                        <PicnicCreate />
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
                            form="picnicCreate"
                            type="submit"
                            className="btn btn--primary btn__submit"
                        >
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <PicnicPagination keyword={keyword} />
        </>
    );
};

export default PicnicList;
