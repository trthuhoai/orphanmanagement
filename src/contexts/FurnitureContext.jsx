import { createContext, useEffect, useState } from "react";
import FurnitureList from "../components/furniture/FurnitureList";

export const FurnitureContext = createContext();

const FurnitureContextProvider = (props) => {
    const [furnitures, setFurnitures] = useState([]);
    const [addResult, setAddResult] = useState("false");
    const [detailAccounts, setDetailAccounts] = useState({});

    useEffect(() => {
        getFurnituresList();
    }, []);

    // GET ACCOUNTS LIST
    async function getFurnituresList() {
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
            "https://orphanmanagement.herokuapp.com/api/v1/manager/furniture/all",
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
                setFurnitures(JSON.parse(result).data);
            })
            .catch((error) => console.log("error", error));
    }
    // ADD ACCOUNT
    async function addFurniture(
        image,
        nameFurniture,
        quantity,
        status
    ) {
        let raw = JSON.stringify({
            image,
            nameFurniture,
            quantity,
            status
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
            "https://orphanmanagement.herokuapp.com/api/v1/manager/furniture",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result.code+"ddddf");
                if(result.code==="200")
                {
                    setAddResult("true");
                }
                //setFurnitures([...furnitures, result.data]);
            })
            .catch((error) => console.log("error", error));
    }
    // VIEW ACCOUNT DETAILS
    async function viewFurniture(id) {
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
            `https://orphanmanagement.herokuapp.com/api/v1/admin/${id}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                console.log(result);

                //Cần fix để hiển thi ds thay đổi sau khi add
               // setAccounts(JSON.parse(result).data);
            })
            .catch((error) => console.log("error", error));
    }
    //UPDATE ACCOUNT
    async function updateFurniture(id, updatedFurniture) {
        const token = JSON.parse(localStorage.getItem("token"));
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
                        furniture.furnitureId === id ? JSON.parse(result).data : furniture
                    )
                );
            })
            .catch((error) => console.log("error", error));
    }
    // DELETE ACCOUNT
    async function deleteFurniture(id) {
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
            `https://orphanmanagement.herokuapp.com/api/v1/manager/furniture/${id}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                setFurnitures(furnitures.filter((furniture) => furniture.furnitureId !== id));
            })
            .catch((error) => console.log("error", error));
    }
    return (
        <FurnitureContext.Provider
            value={{
                // accounts,
                furnitures,
                addFurniture,
                addResult,
                deleteFurniture,
                viewFurniture,
                updateFurniture,
            }}
        >
            {/* <div className="App">
              <FurnitureList />
            </div> */}
            {props.children}
        </FurnitureContext.Provider>
    );
};

export default FurnitureContextProvider;
