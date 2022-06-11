import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FurnitureRequestContext } from "../../contexts/FurnitureRequestContext";
import { useNavigate } from "react-router-dom";

const FurnitureRequest = ({ furnitureRequest }) => {
    // const { deleteFurnitureRequest } = useContext(FurnitureRequestContext);
    const navigate = useNavigate();

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
   const openModal=(id)=> {
        navigate(`/employee/furniture/request/${id}`);
    }
    const openUpdate=(id)=> {
        navigate(`/employee/furniture/request/update/${id}`);
    }
    const openExtend=(id)=> {
        navigate(`/employee/furniture/request/update/${id}`);
    }
    useEffect(() => {
        handleCloseDelete();
    }, [furnitureRequest]);
    if(furnitureRequest.totalPrice===null){
    return (
        <>
            <td>
                {furnitureRequest.furnitureRequestId}
            </td>
            <td>
                {furnitureRequest.startDate }
            </td>
            <td>
                {furnitureRequest.deadlineDate }
            </td>
            <td>
                {furnitureRequest.status === "DONE"
                    ? "Đã hoàn thành"
                    : "Chưa hoàn thành"}
            </td>
            {/* <td>{furnitureRequest.employeeName} </td> */}
          
            <td>
                <i
                    title="Xem chi tiết"
                    className="bi bi-info-circle icon icon__view"
                    onClick={(e)=>openModal(furnitureRequest.furnitureRequestId)}
                ></i>
                <i
                    title="Gia hạn"
                    className="bi bi-alarm"
                    style={{fontSize: 25}}
                    onClick={(e)=>openExtend(furnitureRequest.furnitureRequestId)}
                ></i>
                <i
                    title="Chỉnh sửa"
                    className="bi bi-pencil-square icon icon__update"
                    onClick={(e)=>openUpdate(furnitureRequest.furnitureRequestId)}
                ></i>
                <i  
                // aria-disabled
                    // className="bi bi-trash3 icon icon__delete"
                    // onClick={handleShowDelete}
                ></i>
            </td>
            {/* MODAL DELETE */}
            <Modal
                show={showDelete}
                onHide={handleCloseDelete}
                centered
                className="modal"
            >
                <Modal.Header closeButton className="modal__header">
                    <Modal.Title>Xoá yêu cầu sửa chữa</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal__body">
                    <p className="confirm-message">
                        {`Bạn có chắc chắn muốn xoá yêu cầu có ID ${furnitureRequest.furnitureRequestId} khỏi danh sách không?`}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleCloseDelete}
                        className="btn btn--secondary btn__close"
                    >
                        Close
                    </Button>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            // deleteFurnitureRequest(furnitureRequest.furnitureRequestId);
                        }}
                        className="btn btn--primary btn__submit"
                    >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );}
    else{
        return (
            <>
                <td>
                    {furnitureRequest.furnitureRequestId}
                </td>
                <td>
                    {furnitureRequest.startDate }
                </td>
                <td>
                    {furnitureRequest.deadlineDate }
                </td>
                <td>
                    {furnitureRequest.status === "DONE"
                        ? "Đã hoàn thành"
                        : "Chưa hoàn thành"}
                </td>
                {/* <td>{furnitureRequest.employeeName} </td> */}
              
                <td>
                    <i
                        title="Xem chi tiết"
                        className="bi bi-info-circle icon icon__view"
                        onClick={(e)=>openModal(furnitureRequest.furnitureRequestId)}
                    ></i>
                     <i
                    title="Gia hạn"
                    className="bi bi-alarm"
                    style={{fontSize: 25,opacity: 0.5}}
                    // onClick={(e)=>openExtend(furnitureRequest.furnitureRequestId)}
                ></i>
                    <i
                        title="Chỉnh sửa"
                        className="bi bi-pencil-square icon icon__update"
                        style={{ opacity: 0.5 }}
                        // onClick={(e)=>openUpdate(furnitureRequest.furnitureRequestId)}
                    ></i>
                    <i  
                    // aria-disabled
                        // className="bi bi-trash3 icon icon__delete"
                        // onClick={handleShowDelete}
                    ></i>
                </td>
                {/* MODAL DELETE */}
                <Modal
                    show={showDelete}
                    onHide={handleCloseDelete}
                    centered
                    className="modal"
                >
                    <Modal.Header closeButton className="modal__header">
                        <Modal.Title>Xoá yêu cầu sửa chữa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal__body">
                        <p className="confirm-message">
                            {`Bạn có chắc chắn muốn xoá yêu cầu có ID ${furnitureRequest.furnitureRequestId} khỏi danh sách không?`}
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handleCloseDelete}
                            className="btn btn--secondary btn__close"
                        >
                            Close
                        </Button>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                // deleteFurnitureRequest(furnitureRequest.furnitureRequestId);
                            }}
                            className="btn btn--primary btn__submit"
                        >
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        ); 
    }
};

export default FurnitureRequest;
