import { createContext, useEffect, useState } from "react";

export const NurtererContext = createContext();

const NurtererContextProvider = (props) => {
    const [nurterers, setNurterers] = useState([]);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        getNurterersList();
    }, []);

    // GET NURTURERS LIST
    async function getNurterersList(page = 1) {
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
            `https://orphanmanagement.herokuapp.com/api/v1/manager/nurterer?page=${page}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setNurterers(result.data.result);
                setPages(result.data.pages);
            })
            .catch((error) => console.log("error", error));
    }

    // ADD NURTURER
    async function addNurterer(
        image,
        fullName,
        gender,
        dateOfBirth,
        introductoryDate,
        adoptiveDate,
        nurtererId,
        nurturerId
    ) {
        let raw = JSON.stringify({
            image,
            fullName,
            gender,
            dateOfBirth,
            introductoryDate,
            adoptiveDate,
            nurtererId,
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
            "https://orphanmanagement.herokuapp.com/api/v1/manager/nurterer",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                getNurterersList();
            })
            .catch((error) => console.log("error", error));
    }
    // VIEW NURTURER DETAILS
    async function viewNurterer(id) {
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
            `https://orphanmanagement.herokuapp.com/api/v1/manager/nurterer/${id}`,
            requestOptions
        );

        result = await result.json();
        return result.data;
    }
    //EDIT NURTURER
    async function updateNurterer(id, updatedNurterer) {
        const token = JSON.parse(localStorage.getItem("token"));
        let raw = JSON.stringify(updatedNurterer);
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
            `https://orphanmanagement.herokuapp.com/api/v1/manager/nurterer/${id}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                getNurterersList();
            })
            .catch((error) => console.log("error", error));
    }
    // DELETE NURTURER
    async function deleteNurterer(id) {
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
            `https://orphanmanagement.herokuapp.com/api/v1/manager/nurterer/${id}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                getNurterersList();
            })
            .catch((error) => console.log("error", error));
    }
    return (
        <NurtererContext.Provider
            value={{
                nurterers,
                getNurterersList,
                addNurterer,
                deleteNurterer,
                viewNurterer,
                updateNurterer,
                pages,
            }}
        >
            {props.nurterer}
        </NurtererContext.Provider>
    );
};

export default NurtererContextProvider;
