// import { useEffect, useState } from "react";
// import { Modal, Button } from "react-bootstrap";
// import FormCreate from "../formCreate/FormCreate";
// import "./table.scss";

// const Table = () => {
//     const [accountsList, setAccountsList] = useState([]);
//     const [tableHeaders, setTableHeaders] = useState([]);

//     useEffect(() => {
//         getAccountsList();
//     }, []);

//     async function getAccountsList() {
//         let requestOptions = {
//             method: "GET",
//             headers: {
//                 Authorization:
//                     "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjQ5MzM2NjAwLCJhdWQiOiIxNjQ5NTUyNjAwMTc1In0.a9wyvgh0XyHPgtf2SXNXNTbBW7tKDBkKC-7UDck6rIRtboxhcwVjcq24cW7S8lkOXMVGKDf2Uh5UazIrDBHUOA",
//                 "Content-Type": "application/json",
//             },
//             redirect: "follow",
//         };
//         const result = await fetch(
//             "https://orphanmanagement.herokuapp.com/api/v1/admin",
//             requestOptions
//         );
//         const getResult = await result.json();
//         setAccountsList(getResult.data.result);
//         setTableHeaders(getResult.data.result[0]);
//         console.log(getResult.data.result[0]);
//     }

//     function viewItem() {}
//     function editItem() {}
//     function deleteItem() {}
//     const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     return (
//         // <div className="datatable">
//         //     <div className="datatable__top">
//         //         <h2 class="datatable__title">Thành viên</h2>
//         //         <Button
//         //             className="btn btn__add btn--primary"
//         //             onClick={handleShow}
//         //         >
//         //             Thêm tài khoản
//         //         </Button>
//         //     </div>
//         //     <table className="datatable__main">
//         //         <thead>
//         //             <tr>
//         //                 <th scope="col">Họ và tên</th>
//         //                 <th scope="col">Email</th>
//         //                 <th scope="col">Phân quyền</th>
//         //                 <th scope="col">Hành động</th>
//         //             </tr>
//         //         </thead>
//         //         <tbody>
//         //             {accountsList.map((account) => (
//         //                 <tr>
//         //                     <td>{account.fullName}</td>
//         //                     <td>{account.email} </td>
//         //                     <td>
//         //                         {account.roles.includes("ROLE_ADMIN")
//         //                             ? "Admin"
//         //                             : account.roles.includes("ROLE_MANAGER")
//         //                             ? "Manager"
//         //                             : ""}
//         //                     </td>
//         //                     <td>
//         //                         <i
//         //                             title="Xem chi tiết"
//         //                             className="bi bi-info-circle icon icon__view"
//         //                             onClick={handleShow}
//         //                         ></i>
//         //                         <i
//         //                             title="Chỉnh sửa"
//         //                             className="bi bi-pencil-square icon icon__edit"
//         //                             onClick={handleShow}
//         //                         ></i>
//         //                         <i
//         //                             title="Xoá"
//         //                             className="bi bi-trash3 icon icon__delete"
//         //                             onClick={handleShow}
//         //                         ></i>
//         //                     </td>
//         //                 </tr>
//         //             ))}
//         //         </tbody>
//         //     </table>
//         //     <Modal show={show} onHide={handleClose}>
//         //         <Modal.Header closeButton>
//         //             <Modal.Title>Thêm tài khoản</Modal.Title>
//         //         </Modal.Header>
//         //         <Modal.Body> 
//         //             <FormCreate></FormCreate>
//         //         </Modal.Body>
//         //         <Modal.Footer>
//         //             <Button variant="secondary" onClick={handleClose}>
//         //                 Close
//         //             </Button>
//         //         </Modal.Footer>
//         //     </Modal>
//         // </div>
//         <div className="table">
//             <div className="table__title"></div>
//             <div className="table__content"></div>
//         </div>
//     );
// };

// export default Table;
