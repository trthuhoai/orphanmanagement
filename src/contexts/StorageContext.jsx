import { createContext, useEffect, useState } from "react";

export const StorageContext = createContext();

const StorageContextProvider = (props) => {
    const [storages, setStorages] = useState([]);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        getStoragesList();
    }, []);

    // GET ACCOUNTS LIST
    async function getStoragesList(page = 1) {
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
            `https://orphanmanagement.herokuapp.com/api/v1/admin/deleted?page=${page}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                setStorages(result.data.result);
                setPages(result.data.pages);
            })
            .catch((error) => console.log("error", error));
    }
   
    // VIEW ACCOUNT DETAILS
    async function viewStorage(id) {
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
            `https://orphanmanagement.herokuapp.com/api/v1/admin/${id}`,
            requestOptions
        );
        result = await result.json();
        return result.data;
    }
    
    // DELETE ACCOUNT
    async function deleteStorage(id) {
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
            `https://orphanmanagement.herokuapp.com/api/v1/admin/deleted/${id}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                getStoragesList();
            })
            .catch((error) => console.log("error", error));
    }
    return (
        <StorageContext.Provider
            value={{
                storages,
                getStoragesList,
                deleteStorage,
                viewStorage,
                pages,
            }}
        >
            {props.children}
        </StorageContext.Provider>
    );
};

export default StorageContextProvider;
