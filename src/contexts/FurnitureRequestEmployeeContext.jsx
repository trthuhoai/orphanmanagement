import { createContext, useEffect, useState } from "react";

export const FurnitureRequestEmployeeContext = createContext();

const FurnitureRequestEmployeeContextProvider = (props) => {
    const [furnitureRequests, setFurnitureRequests] = useState([]);
    const [furnitures, setFurnitures] = useState([]);
    const [furnituresOp, setFurnituresOp] = useState([]);
    const [introducers, setIntroducers] = useState([]);
    const [nurturers, setNurturers] = useState([]);
    const [pages, setPages] = useState([]);
    const [accounts, setAccounts] = useState([]);

    const [furnitureRequestsEmployee, setFurnitureRequestsEmployee] = useState([]);
    

    const furnitureRequestPage = JSON.parse(
        localStorage.getItem("furnitureRequestPage")
    );
    const token = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        getFurnitureRequestsEmployeeList(1);
        // getFurnituresList();
        // getAccountsList()
    }, []);

    // async function getAccountsList() {
    //     let requestOptions = {
    //         method: "GET",
    //         headers: {
    //             Authorization: "Bearer " + token,
    //             "Content-Type": "application/json",
    //         },
    //         redirect: "follow",
    //     };
    //     await fetch(
    //         `https://orphanmanagement.herokuapp.com/api/v1/manager/furniture/request_form/employee`,
    //         requestOptions
    //     )
    //         .then((response) => response.json())
    //         .then((result) => {
    //             setAccounts(result.data);
    //             // setPages(result.data.pages);
    //         })
    //         .catch((error) => {
    //             console.log("error", error);
    //             setAccounts([]);
    //             // getAccountsList(currentPage - 1);
    //         });
    // }
    // async function getFurnituresList() {
    //     const token = JSON.parse(localStorage.getItem("token"));
    //     let requestOptions = {
    //         method: "GET",
    //         headers: {
    //             Authorization: "Bearer " + token,
    //             "Content-Type": "application/json",
    //         },
    //         redirect: "follow",
    //     };
    //     await fetch(
    //         `https://orphanmanagement.herokuapp.com/api/v1/manager/furniture/all`,
    //         requestOptions
    //     )
    //         .then((response) => response.json())
    //         .then((result) => {
    //             console.log(result)
    //             setFurnitures(result.data);
    //             setFurnituresOp(result.data);
                
                
    //             // furnituresOp.map((furniture) => {
    //             //     renameObjectKey(furniture);

    //             // });
    //             // console.log('iiiiiiiiiii', furnituresOp);
    //             // furnitures.map((furniture) => {
    //             //         console.log('furrrr', furniture);
                        
    //             //         setA(furniture.nameFurniture);
    //             //         setB(furniture.furnitureId);
    //             //         setOp({...op, value: b,label: a});
    //             //         // setOp({...op, label: a});
    //             //         console.log('iiiiiiiiiii', op);
    //             //         list.push(op);
    //             // });
    //             // // setPages(result.data.pages);
    //             // console.log('rrrrrr', list);
    //         })
    //         .catch((error) => console.log("error", error)); 
    // }
    // let renameObjectKey = (object) => {
    //     // gán giá trị của name vào thuộc tính `firstName`
    //     object.label = object.nameFurniture;
    //     object.value=object.furnitureId;
      
    //     // xóa thuộc tính `name`
    //     delete object.nameFurniture;
    //     delete object.furnitureId;
    //     delete object.goodQuantity;
    //     delete object.image;
    //     delete object.status;
    //     delete object.unitPrice;
    //     delete object.brokenQuantity;
    //   };
    // async function getFurniture(id) {
    //     let requestOptions = {
    //         method: "GET",
    //         headers: {
    //             Authorization: "Bearer " + token,
    //             "Content-Type": "application/json",
    //         },
    //         redirect: "follow",
    //     };

    //     let result = await fetch(
    //         `https://orphanmanagement.herokuapp.com/api/v1/manager/furniture/${id}`,
    //         requestOptions
    //     );

    //     result = await result.json();
    //     console.log("rrrrrrr",result.data.nameFurniture);
    //     return result.data.nameFurniture;
    // }
    // async function getNameFurniture(id) {
    //     const token = JSON.parse(localStorage.getItem("token"));
    //     let requestOptions = {
    //         method: "GET",
    //         headers: {
    //             Authorization: "Bearer " + token,
    //             "Content-Type": "application/json",
    //         },
    //         redirect: "follow",
    //     };

    //     await fetch(
    //         `https://orphanmanagement.herokuapp.com/api/v1/manager/furniture/${id}`,
    //         requestOptions
    //     )
    //         .then((response) => response.text())
    //         .then((result) => {
    //             result = JSON.parse(result).data;
    //             // setDetailFurniture(result);
    //             console.log(result);
    //             return result.nameFurniture;
                
    //         })
    //         .catch((error) => console.log("error", error));
    // }
    // // GET CHILDRENS LIST
    // async function getFurnitureRequestsList(furnitureRequestPage) {
    //     let requestOptions = {
    //         method: "GET",
    //         headers: {
    //             Authorization: "Bearer " + token,
    //             "Content-Type": "application/json",
    //         },
    //         redirect: "follow",
    //     };
    //     await fetch(
    //         `https://orphanmanagement.herokuapp.com/api/v1/manager/furniture/request_form?page=${furnitureRequestPage}`,
    //         requestOptions
    //     )
    //         .then((response) => response.json())
    //         .then((result) => {
    //             console.log(result);
    //             setFurnitureRequests(result.data.result);
                
    //             setPages(result.data.pages);
    //         })
    //         .catch((error) => console.log("error", error));
    // }
    async function viewFurnitureRequestEmployee(id) {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };

        let result = await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/account/furniture/request_form/${id}`,
            requestOptions
        );

        result = await result.json();
        return result.data;
    }
    async function getFurnitureRequestsEmployeeList(furnitureRequestPage) {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/account/furniture/request_form?page=${furnitureRequestPage}&limit=5`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setFurnitureRequestsEmployee(result.data.result);
                
                setPages(result.data.pages);
            })
            .catch((error) => console.log("error", error));
    }
    // GET INTRODUCERS LIST
    async function updateRequestFurniture(id, totalMoney) {
        const updatedRequestFurniture={id, totalMoney}
        let raw = JSON.stringify(updatedRequestFurniture);
        let requestOptions = {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: raw,
            redirect: "follow",
        };

        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/account/furniture/request_form/confirm`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                // setFurnitures(
                //     furnitures.map((furniture) =>
                //         furniture.furnitureId === id
                //             ? JSON.parse(result).data
                //             : furniture
                //     )
                // );
            })
            .catch((error) => console.log("error", error));
    }
    return (
        <FurnitureRequestEmployeeContext.Provider
            value={{
                // furnitureRequests,
                furnitureRequestsEmployee,
                viewFurnitureRequestEmployee,
                updateRequestFurniture,
                // introducers,
                // nurturers,
                // accounts,
                // furnitures,
                // furnituresOp,
                // getFurniture,
                // getNameFurniture,
                // getFurnitureRequestsList,
                getFurnitureRequestsEmployeeList,
                pages,
            }}
        >
             {props.children}
        </FurnitureRequestEmployeeContext.Provider>
    );
};

export default FurnitureRequestEmployeeContextProvider;
