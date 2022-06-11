import { createContext, useEffect, useState } from "react";
import moment from "moment";
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
    async function extendRequestFurniture(id, resultDate) {
        const extensionDate =moment(resultDate).format('DD/MM/yyyy');
        const updatedRequestFurniture={id, extensionDate}
        console.log("ssssss",updatedRequestFurniture);
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
            `https://orphanmanagement.herokuapp.com/api/v1/account/furniture/request_form/extend`,
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
                extendRequestFurniture,
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
