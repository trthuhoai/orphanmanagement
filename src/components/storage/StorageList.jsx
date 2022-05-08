import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { StorageContext } from "../../contexts/StorageContext";
import "../../scss/abstracts/_modal.scss";
import "../../scss/abstracts/_table.scss";
import Storage from "./Storage";
// import StorageCreate from "./StorageCreate";
import StoragePagination from "./StoragePagination";

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
                    <h2>Lưu trữ</h2>
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
            </div>
            <StoragePagination />
        </>
    );
};

export default StorageList;
