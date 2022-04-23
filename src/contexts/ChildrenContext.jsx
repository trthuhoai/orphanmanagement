import { createContext, useEffect, useState } from "react";

export const ChildrenContext = createContext();

const ChildrenContextProvider = (props) => {
    const [childrens, setChildrens] = useState([]);
    useEffect(() => {
        getChildrensList();
    }, []);

    // GET ChildrenS LIST
    async function getChildrensList() {
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
            "https://orphanmanagement.herokuapp.com/api/v1/manager/children",
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                setChildrens(JSON.parse(result).data.result);
            })
            .catch((error) => console.log("error", error));
    }
    // ADD Children
    async function addChildren(
        image,
        fullName,
        date_of_birth,
        gender,
        roles,
        address,
        identification,
        phone,
        email,
        password,
        confirmPassword
    ) {
        let raw = JSON.stringify({
            image,
            fullName,
            date_of_birth,
            gender,
            roles,
            address,
            identification,
            phone,
            email,
            password,
            confirmPassword,
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
            "https://orphanmanagement.herokuapp.com/api/v1/admin",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
        setChildrens([
            ...childrens,
            {
                image,
                fullName,
                date_of_birth,
                gender,
                roles,
                address,
                identification,
                phone,
                email,
                password,
                confirmPassword,
            },
        ]);
    }
    // VIEW Children DETAILS
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

        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/admin/${id}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                console.log(JSON.parse(result).data);
                setChildrens(JSON.parse(result).data);
            })
            .catch((error) => console.log("error", error));
    }
    //EDIT Children
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
            `https://orphanmanagement.herokuapp.com/api/v1/admin/${id}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
        setChildrens(
            childrens.map((Children) =>
                Children.id === id ? updatedChildren : Children
            )
        );
    }
    // DELETE Children
    async function deleteChildren(id) {
        // const token = JSON.parse(localStorage.getItem("token"));
        // let requestOptions = {
        //     method: "DELETE",
        //     headers: {
        //         Authorization: "Bearer " + token,
        //         "Content-Type": "application/json",
        //     },
        //     redirect: "follow",
        // };

        // await fetch(
        //     `https://orphanmanagement.herokuapp.com/api/v1/admin/${id}`,
        //     requestOptions
        // )
        //     .then((response) => response.text())
        //     // .then((result) => console.log(result))
        //     .catch((error) => console.log("error", error));
        setChildrens(childrens.filter((Children) => Children.id !== id));
    }
    return (
        <ChildrenContext.Provider
            value={{
                childrens,
                addChildren,
                deleteChildren,
                viewChildren,
                updateChildren,
            }}
        >
            {props.children}
        </ChildrenContext.Provider>
    );
};

export default ChildrenContextProvider;
