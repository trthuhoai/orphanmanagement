import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AccountContext } from "../../contexts/AccountContext";
import AccountDetail from "./AccountDetail";
import AccountUpdate from "./AccountUpdate";

const Furniture = ({ furniture }) => {
    // const { deleteAccount } = useContext(AccountContext);

    // // MODAL DETAIL
    // const [showDetail, setShowDetail] = useState(false);
    // const handleCloseDetail = () => setShowDetail(false);
    // const handleShowDetail = () => setShowDetail(true);

    // // MODAL FORM UPDATE
    // const [showUpdate, setShowUpdate] = useState(false);
    // const handleCloseUpdate = () => setShowUpdate(false);
    // const handleShowUpdate = () => setShowUpdate(true);

    // // MODAL CONFIRMATION DELETE
    // const [showDelete, setShowDelete] = useState(false);
    // const handleCloseDelete = () => setShowDelete(false);
    // const handleShowDelete = () => setShowDelete(true);

    return (
        <>
            <td>
                <img
                    src={
                        furniture.image ||
                        "https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
                    }
                    alt=""
                />
                {furniture.nameFurniture}
            </td>
            <td>{furniture.status} </td>
            <td>
                {furniture.quantity}
                {/* {furniture.roles.includes("ROLE_ADMIN") ||
                furniture.roles.includes("admin")
                    ? "Admin"
                    : furniture.roles.includes("ROLE_MANAGER") ||
                      furniture.roles.includes("manager")
                    ? "Manager"
                    : ""} */}
            </td>
            <td>
                {/* <i
                    title="Xem chi tiết"
                    className="bi bi-info-circle icon icon__view"
                    onClick={handleShowDetail}
                ></i>
                <i
                    title="Chỉnh sửa"
                    className="bi bi-pencil-square icon icon__update"
                    onClick={handleShowUpdate}
                ></i>
                <i
                    className="bi bi-trash3 icon icon__delete"
                    onClick={handleShowDelete}
                ></i> */}
            </td>
{/* Modal */}
        </>
    );
};

export default Furniture;
