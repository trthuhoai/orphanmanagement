import React, { useContext } from "react";
import { AccountContext } from "../../contexts/AccountContext";

const AccountDelete = ({ theAccount }) => {
    const id = theAccount.id;
    const { deleteAccount } = useContext(AccountContext);

    const handleConfirm = (e) => {
        e.preventDefault();
        deleteAccount(id);
    };
    return (
        <div>
            <p className="confirm-message">
                {`Bạn có chắc chắn muốn xoá ${theAccount.fullName} khỏi danh sách không?`}
            </p>
            <button
                onClick={handleConfirm}
                className="btn btn--primary btn__submit"
            >
                Xác nhận
            </button>
        </div>
    );
};

export default AccountDelete;