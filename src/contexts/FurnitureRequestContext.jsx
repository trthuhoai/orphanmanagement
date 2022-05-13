import { createContext, useEffect, useState } from "react";

export const FurnitureRequestContext = createContext();

const FurnitureRequestContextProvider = (props) => {
    const [furnitureRequests, setFurnitureRequests] = useState([]);
    const [introducers, setIntroducers] = useState([]);
    const [nurturers, setNurturers] = useState([]);
    const [pages, setPages] = useState([]);

    const furnitureRequestPage = JSON.parse(
        localStorage.getItem("furnitureRequestPage")
    );
    const token = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        getFurnitureRequestsList(1);
        getIntroducersList();
        getNurturersList();
    }, []);

    // GET CHILDRENS LIST
    async function getFurnitureRequestsList(furnitureRequestPage) {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/furniture/request_form?page=${furnitureRequestPage}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setFurnitureRequests(result.data.result);
                setPages(result.data.pages);
            })
            .catch((error) => console.log("error", error));
    }
    // GET INTRODUCERS LIST
    async function getIntroducersList() {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/introducer/all`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setIntroducers(result.data);
            })
            .catch((error) => console.log("error", error));
    }

    // GET NURTURERS LIST
    async function getNurturersList() {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/nurturer/all`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setNurturers(result.data);
            })
            .catch((error) => console.log("error", error));
    }
    // ADD CHILDREN
    async function addFurnitureRequest(
        image,
        fullName,
        gender,
        dateOfBirth,
        introductoryDate,
        adoptiveDate,
        introducerId,
        nurturerId
    ) {
        let raw = JSON.stringify({
            image,
            fullName,
            gender,
            dateOfBirth,
            introductoryDate,
            adoptiveDate,
            introducerId,
            nurturerId,
        });

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
            "https://orphanmanagement.herokuapp.com/api/v1/manager/furniture/request_form",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                getFurnitureRequestsList(furnitureRequestPage);
            })
            .catch((error) => console.log("error", error));
    }
    // VIEW CHILDREN DETAILS
    async function viewFurnitureRequest(id) {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };

        let result = await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/furniture/request_form/${id}`,
            requestOptions
        );

        result = await result.json();
        return result.data;
    }
    //EDIT CHILDREN
    async function updateFurnitureRequest(id, updatedFurnitureRequest) {
        let raw = JSON.stringify(updatedFurnitureRequest);
        let requestOptions = {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: raw,
            redirect: "follow",
        };

        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/furnitureRequest/${id}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                getFurnitureRequestsList(furnitureRequestPage);
            })
            .catch((error) => console.log("error", error));
    }
    // DELETE CHILDREN
    async function deleteFurnitureRequest(id) {
        let requestOptions = {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };

        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/furniture/request_form/${id}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                getFurnitureRequestsList(furnitureRequestPage);
            })
            .catch((error) => console.log("error", error));
    }
    return (
        <FurnitureRequestContext.Provider
            value={{
                furnitureRequests,
                introducers,
                nurturers,
                getFurnitureRequestsList,
                addFurnitureRequest,
                deleteFurnitureRequest,
                viewFurnitureRequest,
                updateFurnitureRequest,
                pages,
            }}
        >
            {props.furnitureRequest}
        </FurnitureRequestContext.Provider>
    );
};

export default FurnitureRequestContextProvider;
