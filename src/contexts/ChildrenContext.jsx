import { createContext, useEffect, useState } from "react";

export const ChildrenContext = createContext();

const ChildrenContextProvider = (props) => {
    const [childrens, setChildrens] = useState([]);
    const [introducers, setIntroducers] = useState([]);
    const [nurturers, setNurturers] = useState([]);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        getChildrensList();
        getIntroducersList();
        getNurturersList();
    }, []);

    // GET CHILDRENS LIST
    async function getChildrensList(page = 1) {
        const token = JSON.parse(localStorage.getItem("token"));
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/children?page=${page}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setChildrens(result.data.result);
                setPages(result.data.pages);
            })
            .catch((error) => console.log("error", error));
    }
    // GET INTRODUCERS LIST
    async function getIntroducersList() {
        const token = JSON.parse(localStorage.getItem("token"));
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/introducer`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setIntroducers(result.data.result);
            })
            .catch((error) => console.log("error", error));
    }

    // GET NURTURERS LIST
    async function getNurturersList() {
        const token = JSON.parse(localStorage.getItem("token"));
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/nurturer`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setNurturers(result.data.result);
            })
            .catch((error) => console.log("error", error));
    }
    // ADD CHILDREN
    async function addChildren(
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

        const token = JSON.parse(localStorage.getItem("token"));
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
            "https://orphanmanagement.herokuapp.com/api/v1/manager/children",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                getChildrensList();
            })
            .catch((error) => console.log("error", error));
    }
    // VIEW CHILDREN DETAILS
    async function viewChildren(id) {
        const token = JSON.parse(localStorage.getItem("token"));
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };

        let result = await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/children/${id}`,
            requestOptions
        );

        result = await result.json();
        return result.data;
    }
    //EDIT CHILDREN
    async function updateChildren(id, updatedChildren) {
        const token = JSON.parse(localStorage.getItem("token"));
        let raw = JSON.stringify(updatedChildren);
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
            `https://orphanmanagement.herokuapp.com/api/v1/manager/children/${id}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                getChildrensList();
            })
            .catch((error) => console.log("error", error));
    }
    // DELETE CHILDREN
    async function deleteChildren(id) {
        const token = JSON.parse(localStorage.getItem("token"));
        let requestOptions = {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };

        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/children/${id}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                getChildrensList();
            })
            .catch((error) => console.log("error", error));
    }
    return (
        <ChildrenContext.Provider
            value={{
                childrens,
                introducers,
                nurturers,
                getChildrensList,
                addChildren,
                deleteChildren,
                viewChildren,
                updateChildren,
                pages,
            }}
        >
            {props.children}
        </ChildrenContext.Provider>
    );
};

export default ChildrenContextProvider;
