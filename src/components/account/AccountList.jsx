import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { LoadingList } from "../../components/loading/LoadingSkeleton";
import { AccountContext } from "../../contexts/AccountContext";
import "../../scss/abstracts/_modal.scss";
import "../../scss/abstracts/_table.scss";
import SearchList from "../search/SearchList";
import Account from "./Account";
import AccountCreate from "./AccountCreate";
import AccountPagination from "./AccountPagination";

const AccountList = () => {
    const { accounts } = useContext(AccountContext);
    const { searchAccount } = useContext(AccountContext);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        handleClose();
    }, [accounts]);

    return (
        <>
            <div className="table">
                <div className="table__top">
                    <h2>Tài khoản</h2>
                    <SearchList
                        placeholder={"Tìm kiếm tài khoản "}
                        searchValue={searchAccount}
                    ></SearchList>
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
                    {accounts.length !== 0 && (
                        <tbody>
                            {accounts.map((account) => (
                                <tr key={account.id}>
                                    <Account account={account} />
                                </tr>
                            ))}
                        </tbody>
                    )}
                    {accounts.length === 0 && (
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
                        <Modal.Title>Thêm tài khoản</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal__body">
                        <AccountCreate />
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
                            form="accountCreate"
                            type="submit"
                            className="btn btn--primary btn__submit"
                        >
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <AccountPagination />
        </>
    );
};

export default AccountList;
