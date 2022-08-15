import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { LoadingList } from "../../components/loading/LoadingSkeleton";
import { ChildrenContext } from "../../contexts/ChildrenContext";
import "../../scss/abstracts/_modal.scss";
import "../../scss/abstracts/_table.scss";
import SearchList from "../search/SearchList";
import Children from "./Children";
import ChildrenCreate from "./ChildrenCreate";
import ChildrenPagination from "./ChildrenPagination";
import "./_children.scss";

const ChildrenList = () => {
    const { childrens } = useContext(ChildrenContext);
    const { getChildrensList } = useContext(ChildrenContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [keyword, setKeyword] = useState("");
    const getKeyword = (keyword) => {
        setKeyword(keyword);
    };

    useEffect(() => {
        handleClose();
    }, [childrens]);

    return (
        <>
            <div className="table">
                <div className="table__top">
                    <h2>Trẻ em</h2>
                    <SearchList
                        placeholder={"Tìm kiếm trẻ em "}
                        getSearchList={getChildrensList}
                        getKeyword={getKeyword}
                    ></SearchList>
                    <Button className="btn btn--primary" onClick={handleShow}>
                        Thêm trẻ em
                    </Button>
                </div>
                <table className="table__body">
                    <thead>
                        <tr>
                            <th scope="col">Họ và tên</th>
                            <th scope="col">Ngày sinh</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    {childrens.length !== 0 && (
                        <tbody>
                            {childrens.map((children) => (
                                <tr key={children.id}>
                                    <Children children={children} />
                                </tr>
                            ))}
                        </tbody>
                    )}
                    {childrens.length === 0 && (
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
                        <Modal.Title>Thêm trẻ em</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal__body">
                        <ChildrenCreate />
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
                            form="childrenCreate"
                            type="submit"
                            className="btn btn--primary btn__submit"
                        >
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <ChildrenPagination keyword={keyword} />
        </>
    );
};

export default ChildrenList;
