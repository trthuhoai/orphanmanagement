import { createContext, useEffect, useState } from "react";

export const CharityContext = createContext();

const CharityContextProvider = (props) => {
    const [charitys, setCharitys] = useState([]);
    const [pages, setPages] = useState([]);

    const currentPage = JSON.parse(localStorage.getItem("currentPage"));
    const token = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        localStorage.setItem("currentPage", 1);
        getCharitysList(1, "");
    }, []);

    // GET CHARITYS LIST
    async function getCharitysList(currentPage, keyword) {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/charity?page=${currentPage}&limit=${5}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setCharitys(result.data.result);
                setPages(result.data.pages);
            })
            .catch((error) => {
                console.log("error", error);
                setCharitys([]);
                getCharitysList(currentPage - 1);
            });
    }

    // ADD CHARITY
    async function addCharity(image, charityName, title, dateOfEvent, content) {
        let raw = JSON.stringify({
            image,
            charityName,
            title,
            dateOfEvent,
            content,
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
            "https://orphanmanagement.herokuapp.com/api/v1/manager/charity",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                getCharitysList(currentPage);
            })
            .catch((error) => console.log("error", error));
    }
    // VIEW CHARITY DETAILS
    async function viewCharity(id) {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };

        let result = await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/charity/${id}`,
            requestOptions
        );

        result = await result.json();
        return result.data;
    }
    //EDIT CHARITY
    async function updateCharity(id, updatedCharity) {
        let raw = JSON.stringify(updatedCharity);
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
            `https://orphanmanagement.herokuapp.com/api/v1/manager/charity/${id}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                getCharitysList(currentPage);
            })
            .catch((error) => console.log("error", error));
    }
    // DELETE CHARITY
    async function deleteCharity(id) {
        let requestOptions = {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };

        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/charity/${id}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                getCharitysList(currentPage);
            })
            .catch((error) => console.log("error", error));
    }
    //SEARCH CHARITY
    async function searchCharity(keyword) {
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
            `https://orphanmanagement.herokuapp.com/api/v1/manager/charity/search?page=${currentPage}&limit=${5}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setCharitys(result.data.result);
                setPages(result.data.pages);
            })
            .catch((error) => console.log("error", error));
    }
    return (
        <CharityContext.Provider
            value={{
                charitys,
                getCharitysList,
                addCharity,
                deleteCharity,
                viewCharity,
                updateCharity,
                searchCharity,
                pages,
            }}
        >
            {props.children}
        </CharityContext.Provider>
    );
};

export default CharityContextProvider;
