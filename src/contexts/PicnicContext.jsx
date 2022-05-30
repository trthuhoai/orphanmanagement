import { createContext, useEffect, useState } from "react";

export const PicnicContext = createContext();

const PicnicContextProvider = (props) => {
    const [picnics, setPicnics] = useState([]);
    const [pages, setPages] = useState([]);

    const currentPage = JSON.parse(localStorage.getItem("currentPage"));
    const token = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        localStorage.setItem("currentPage", 1);
        getPicnicsList(1, "");
    }, []);

    // GET PICNICS LIST
    async function getPicnicsList(currentPage, keyword) {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/picnic?page=${currentPage}&limit=${5}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setPicnics(result.data.result);
                setPages(result.data.pages);
            })
            .catch((error) => {
                console.log("error", error);
                setPicnics([]);
                getPicnicsList(currentPage - 1);
            });
    }

    // ADD PICNIC
    async function addPicnic(
        image,
        namePicnic,
        title,
        dateStart,
        dateEnd,
        address,
        money,
        content,
        personInChargeId
    ) {
        let raw = JSON.stringify({
            image,
            namePicnic,
            title,
            dateStart,
            dateEnd,
            address,
            money,
            content,
            personInChargeId
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
            "https://orphanmanagement.herokuapp.com/api/v1/manager/picnic",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                getPicnicsList(currentPage);
            })
            .catch((error) => console.log("error", error));
    }
    // VIEW PICNIC DETAILS
    async function viewPicnic(id) {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };

        let result = await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/picnic/${id}`,
            requestOptions
        );

        result = await result.json();
        return result.data;
    }
    //EDIT PICNIC
    async function updatePicnic(id, updatedPicnic) {
        let raw = JSON.stringify(updatedPicnic);
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
            `https://orphanmanagement.herokuapp.com/api/v1/manager/picnic/${id}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                getPicnicsList(currentPage);
            })
            .catch((error) => console.log("error", error));
    }
    // DELETE PICNIC
    async function deletePicnic(id) {
        let requestOptions = {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };

        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/picnic/${id}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                getPicnicsList(currentPage);
            })
            .catch((error) => console.log("error", error));
    }
    //SEARCH PICNIC
    async function searchPicnic(keyword) {
        let raw = JSON.stringify({
            keyword,
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
            `https://orphanmanagement.herokuapp.com/api/v1/manager/picnic/search?page=${currentPage}&limit=${5}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setPicnics(result.data.result);
                setPages(result.data.pages);
            })
            .catch((error) => console.log("error", error));
    }
    return (
        <PicnicContext.Provider
            value={{
                picnics,
                getPicnicsList,
                addPicnic,
                deletePicnic,
                viewPicnic,
                updatePicnic,
                searchPicnic,
                pages,
            }}
        >
            {props.children}
        </PicnicContext.Provider>
    );
};

export default PicnicContextProvider;
