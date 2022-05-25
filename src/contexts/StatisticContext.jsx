import moment from "moment";
import { createContext, useEffect, useMemo, useState } from "react";

export const StatisticContext = createContext();

const getAge = (
    currentDate = moment(new Date(), "DD/MM/YYYY"),
    dateOfBirth
) => {
    let duration = moment.duration(currentDate.diff(dateOfBirth));
    let age = Math.round(duration.asYears());
    return age;
};

const getChildrenAge = (children) => {
    let kindergarten = 0,
        primary = 0,
        secondary = 0,
        high = 0,
        adult = 0;
    children.forEach((child) => {
        let childrenDateOfBirth = moment(child.dateOfBirth, "DD/MM/YYYY");
        let age = getAge(undefined, childrenDateOfBirth);
        switch (true) {
            case age < 6:
                kindergarten++;
                break;
            case age < 11:
                primary++;
                break;
            case age < 16:
                secondary++;
                break;
            case age < 19:
                high++;
                break;
            default:
                adult++;
                break;
        }
    });
    return [
        { keyword: "kindergarten", value: kindergarten },
        { keyword: "primary", value: primary },
        { keyword: "secondary", value: secondary },
        { keyword: "high", value: high },
        { keyword: "adult", value: adult },
    ];
};

const StatisticContextProvider = (props) => {
    const [accountRole, setAccountRole] = useState([]);
    const [accountStatusActive, setAccountStatusActive] = useState(0);
    const [accountStatusDeleted, setAccountStatusDeleted] = useState(0);
    const [accountActiveYear, setAccountActiveYear] = useState([]);
    const [accountDeletedYear, setAccountDeletedYear] = useState([]);

    const [children, setChildren] = useState([]);
    const [childrenTotal, setChildrenTotal] = useState(0);

    const [childrenGender, setChildrenGender] = useState([]);
    const [childrenIntroduction, setChildrenIntroduction] = useState([]);
    const [childrenAdoption, setChildrenAdoption] = useState([]);

    const token = JSON.parse(localStorage.getItem("token"));
    let requestOptions = {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        redirect: "follow",
    };

    useEffect(() => {
        getAccountRoles();
        getAccountStatus();
        getAccountActiveYear();
        getAccountDeletedYear();

        getChildrensList();
        getChildrenGender();
        getChildrenStatus();
    }, []);

    // ================ACCOUNT STATS================
    // BAR CHART ACCOUNT ROLES STATS
    async function getAccountRoles() {
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/admin/user/role`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                setAccountRole(result.data);
            })
            .catch((error) => console.log("error", error));
    }
    // PIE CHART ACCOUNT STATUS STATS
    async function getAccountStatus() {
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/admin`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                setAccountStatusActive(result.data.total);
            })
            .catch((error) => console.log("error", error));

        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/admin/deleted`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                setAccountStatusDeleted(result.data.total);
            })
            .catch((error) => console.log("error", error));
    }
    // LINE CHART ACCOUNT YEAR STATS
    async function getAccountActiveYear() {
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/admin/user/onboard/year`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                setAccountActiveYear(result.data);
            })
            .catch((error) => console.log("error", error));
    }
    async function getAccountDeletedYear() {
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/admin/user/archived/month`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                setAccountDeletedYear(result.data);
            })
            .catch((error) => console.log("error", error));
    }

    // ================CHILDREN STATS================
    // BAR CHART CHILDREN AGES STATS
    async function getChildrensList() {
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/children/all`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                setChildrenTotal(result.data.length);
                setChildren(result.data);
            })
            .catch((error) => console.log("error", error));
    }
    const childrenAge = useMemo(() => getChildrenAge(children), [children]);

    // PIE CHART CHILDREN GENDER STATS
    async function getChildrenGender() {
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/admin/children/gender`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result.data);
                setChildrenGender(result.data);
            })
            .catch((error) => console.log("error", error));
    }
    // LINE CHART CHILDREN INTRODUCTION/ADOPTION STATS
    async function getChildrenStatus() {
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/admin/children/introducer/year`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                setChildrenIntroduction(result.data);
            })
            .catch((error) => console.log("error", error));
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/admin/children/nurturer/year`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                setChildrenAdoption(result.data);
            })
            .catch((error) => console.log("error", error));
    }

    return (
        <StatisticContext.Provider
            value={{
                accountRole,
                accountStatusActive,
                accountStatusDeleted,
                accountActiveYear,
                accountDeletedYear,
                childrenTotal,
                childrenAge,
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
