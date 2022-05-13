import { createContext, useEffect, useState } from "react";

export const StatisticContext = createContext();

const StatisticContextProvider = (props) => {
    const [accounts, setAccounts] = useState([]);
    const [childrens, setChildrens] = useState([]);

    const [amountAccount, setAmountAccount] = useState(undefined);
    const [amountChildren, setAmountChildren] = useState(undefined);

    const [accountRole, setAccountRole] = useState([]);

    const [childrenGender, setChildrenGender] = useState([]);
    const [childrenIntroduction, setChildrenIntroduction] = useState([]);
    const [childrenAdoption, setChildrenAdoption] = useState([]);

    const token = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        getAccountsList();
        getChildrensList();
        amountAccountRoles();
        amountChildrenGender();
        amountChildrenIntroduction();
        amountChildrenAdoption();
    }, []);

    // GET ACCOUNTS LIST
    async function getAccountsList() {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/admin`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setAccounts(result.data);
                setAmountAccount(result.data.total);
            })
            .catch((error) => console.log("error", error));
    }

    // GET CHILDRENS LIST
    async function getChildrensList() {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/children`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setChildrens(result.data);
                setAmountChildren(result.data.total);
            })
            .catch((error) => console.log("error", error));
    }

    // CHART
    // ACCOUNT BY ROLES
    async function amountAccountRoles() {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/admin/user/role`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setAccountRole(result.data);
            })
            .catch((error) => console.log("error", error));
    }
    // CHILDREN BY GENDER
    async function amountChildrenGender() {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/admin/children/gender`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setChildrenGender(result.data);
            })
            .catch((error) => console.log("error", error));
    }
    //CHILDREN BY TIME INTRODUCTION/ADOPTION
    async function amountChildrenIntroduction() {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/admin/children/introducer/year`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setChildrenIntroduction(result.data);
            })
            .catch((error) => console.log("error", error));
    }
    async function amountChildrenAdoption() {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/admin/children/nurturer/year`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setChildrenAdoption(result.data);
            })
            .catch((error) => console.log("error", error));
    }
    return (
        <StatisticContext.Provider
            value={{
                accounts,
                childrens,
                amountAccount,
                amountChildren,
                accountRole,
                childrenGender,
                childrenIntroduction,
                childrenAdoption,
            }}
        >
            {props.children}
        </StatisticContext.Provider>
    );
};

export default StatisticContextProvider;
