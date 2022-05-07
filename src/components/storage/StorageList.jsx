import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { StorageContext } from "../../contexts/StorageContext";
import "../../scss/abstracts/_modal.scss";
import "../../scss/abstracts/_table.scss";
import Storage from "./Storage";
// import StorageCreate from "./StorageCreate";
// import StoragePagination from "./StoragePagination";

const StorageList = () => {
    const { storages } = useContext(StorageContext);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        handleClose();
    }, [storages]);

    return (
        <>
            <div className="table">
                <div className="table__top">
                    <h2>Thành viên</h2>
                    <Button className="btn btn--primary" onClick={handleShow}>
                        Thêm tài khoản
                    </Button>
                </div>
                <table className="table__body">
                    <thead>
                        <tr>
                            <th scope="col">Họ và tên</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phân quyền</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {storages.map((storage) => (
                            <tr key={storage.id}>
                                <Storage storage={storage} />
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* <Modal
                    show={show}
                    onHide={handleClose}
                    centered
                    className="modal"
                >
                    <Modal.Header closeButton className="modal__header">
                        <Modal.Title>Thêm tài khoản</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal__body">
                        <StorageCreate />
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
                            form="storageCreate"
                            type="submit"
                            className="btn btn--primary btn__submit"
                        >
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal> */}
            </div>
            {/* <StoragePagination /> */}
        </>
    );
};

export default StorageList;
