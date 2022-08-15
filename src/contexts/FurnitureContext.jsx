import { createContext, useEffect, useState } from "react";

export const FurnitureContext = createContext();

const FurnitureContextProvider = (props) => {
    const [furnitures, setFurnitures] = useState([]);
    const [addResult, setAddResult] = useState("false");
    const [pages, setPages] = useState([]);
    // const furniturePage = JSON.parse(localStorage.getItem("furniturePage"));
    const [detailAccounts, setDetailAccounts] = useState({});

    const token = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        getFurnituresList(1, "");
    }, []);
    async function getFurnituresList(furniturePage) {
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
            `https://orphanmanagement.herokuapp.com/api/v1/manager/furniture?page=${furniturePage}&limit=5`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                setFurnitures(result.data.result);
                setPages(result.data.pages);
            })
            .catch((error) => console.log("error", error));
    }
    // GET ACCOUNTS LIST
    async function getFurnituresList1() {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
        await fetch(
            "https://orphanmanagement.herokuapp.com/api/v1/manager/furniture/all",
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                setFurnitures(JSON.parse(result).data);
            })
            .catch((error) => console.log("error", error));
    }
    // ADD ACCOUNT
    async function addFurniture(
        image,
        nameFurniture,
        status,
        goodQuantity,
        brokenQuantity
    ) {
        let raw = JSON.stringify({
            image,
            nameFurniture,
            status,
            goodQuantity,
            brokenQuantity,
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
            "https://orphanmanagement.herokuapp.com/api/v1/manager/furniture",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result.code + "ddddf");
                if (result.code === "200") {
                    setAddResult("true");
                }
                getFurnituresList();
                //setFurnitures([...furnitures, result.data]);
            })
            .catch((error) => console.log("error", error));
    }
    // VIEW ACCOUNT DETAILS
    async function viewFurniture(id) {
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
        // .then((response) => response.text())
        // .then((result) => {
        //     console.log(result);
        result = await result.json();
        return result.data;

        //Cần fix để hiển thi ds thay đổi sau khi add
        // setAccounts(JSON.parse(result).data);
        // })
        // .catch((error) => console.log("error", error));
    }
    //UPDATE ACCOUNT
    async function updateFurniture(id, updatedFurniture) {
        let raw = JSON.stringify(updatedFurniture);
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
            `https://orphanmanagement.herokuapp.com/api/v1/manager/furniture/${id}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                setFurnitures(
                    furnitures.map((furniture) =>
                        furniture.furnitureId === id
                            ? JSON.parse(result).data
                            : furniture
                    )
                );
            })
            .catch((error) => console.log("error", error));
    }
    // DELETE ACCOUNT
    async function deleteFurniture(id) {
        let requestOptions = {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };

        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/furniture/${id}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                setFurnitures(
                    furnitures.filter(
                        (furniture) => furniture.furnitureId !== id
                    )
                );
            })
            .catch((error) => console.log("error", error));
    }
    return (
        <FurnitureContext.Provider
            value={{
                furnitures,
                getFurnituresList,
                addFurniture,
                addResult,
                deleteFurniture,
                viewFurniture,
                updateFurniture,
                pages,
            }}
        >
            {props.children}
        </FurnitureContext.Provider>
    );
};

export default FurnitureContextProvider;
