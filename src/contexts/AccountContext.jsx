import { createContext, useEffect, useState } from "react";

export const AccountContext = createContext();

const AccountContextProvider = (props) => {
    const [accounts, setAccounts] = useState([]);
    const [pages, setPages] = useState([]);

    const accountPage = JSON.parse(localStorage.getItem("accountPage"));
    const token = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        getAccountsList(1);
    }, []);

    // GET ACCOUNTS LIST
    async function getAccountsList(accountPage) {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/admin?page=${accountPage}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                setAccounts(result.data.result);
                setPages(result.data.pages);
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
                getAccountsList(accountPage);
            })
            .catch((error) => console.log("error", error));
    }
    // VIEW ACCOUNT DETAILS
    async function viewAccount(id) {
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
    //EDIT ACCOUNT
    async function updateAccount(id, updatedAccount) {
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
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                getAccountsList(accountPage);
            })
            .catch((error) => console.log("error", error));
    }
    // STORE ACCOUNT
    async function storeAccount(id) {
        let requestOptions = {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };

        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/admin/${id}/updateStatus`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                getAccountsList(accountPage);
            })
            .catch((error) => console.log("error", error));
    }
    return (
        <AccountContext.Provider
            value={{
                accounts,
                getAccountsList,
                addAccount,
                storeAccount,
                viewAccount,
                updateAccount,
                pages,
            }}
        >
            {props.children}
        </AccountContext.Provider>
    );
};

export default AccountContextProvider;
