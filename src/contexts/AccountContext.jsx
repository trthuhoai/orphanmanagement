import { createContext, useEffect, useState } from "react";

export const AccountContext = createContext();

const AccountContextProvider = (props) => {
    const [accounts, setAccounts] = useState([]);
    const [detailAccounts, setDetailAccounts] = useState({});

    useEffect(() => {
        getAccountsList();
    }, []);

    // GET ACCOUNTS LIST
    async function getAccountsList() {
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
            "https://orphanmanagement.herokuapp.com/api/v1/admin",
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
                setAccounts(JSON.parse(result).data.result);
            })
            .catch((error) => console.log("error", error));
    }
    // ADD ACCOUNT
    async function addAccount(
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
            .then((result) => {
                console.log(result);
                setAccounts([...accounts, result.data]);
            })
            .catch((error) => console.log("error", error));
    }
    // VIEW ACCOUNT DETAILS
    async function viewAccount(id) {
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
                setAccounts(JSON.parse(result).data);
            })
            .catch((error) => console.log("error", error));
    }
    //EDIT ACCOUNT
    async function updateAccount(id, updatedAccount) {
        const token = JSON.parse(localStorage.getItem("token"));
        let raw = JSON.stringify(updatedAccount);
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
            .then((result) => {
                console.log(result);
                setAccounts(
                    accounts.map((account) =>
                        account.id === id ? JSON.parse(result).data : account
                    )
                );
            })
            .catch((error) => console.log("error", error));
    }
    // DELETE ACCOUNT
    async function deleteAccount(id) {
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
            `https://orphanmanagement.herokuapp.com/api/v1/admin/${id}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                setAccounts(accounts.filter((account) => account.id !== id));
            })
            .catch((error) => console.log("error", error));
    }
    return (
        <AccountContext.Provider
            value={{
                accounts,
                addAccount,
                deleteAccount,
                viewAccount,
                updateAccount,
            }}
        >
            {props.children}
        </AccountContext.Provider>
    );
};

export default AccountContextProvider;
