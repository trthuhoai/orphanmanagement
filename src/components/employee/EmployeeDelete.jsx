import React, { useContext } from "react";
import { EmployeeContext } from "../../contexts/EmployeeContext";

const EmployeeDelete = ({ theEmployee }) => {
    const id = theEmployee.id;
    const { deleteEmployee } = useContext(EmployeeContext);

    const handleConfirm = (e) => {
        e.preventDefault();
        deleteEmployee(id);
    };
    return (
        <div>
            <p className="confirm-message">
                {`Bạn có chắc chắn muốn xoá ${theEmployee.fullName} khỏi danh sách không?`}
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

export default EmployeeDelete;