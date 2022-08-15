import { createContext, useEffect, useState } from "react";

export const NotificationContext = createContext();

const NotificationContextProvider = (props) => {
    const [notifications, setNotifications] = useState([]);
    const [accounts, setAccounts] = useState([]);

    const currentPage = JSON.parse(localStorage.getItem("currentPage"));
    const token = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        getNotificationsList();
        getAccountsList();
    }, []);

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
            "https://orphanmanagement.herokuapp.com/api/v1/manager/notification/user/all",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                setAccounts(result.data);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

    async function getNotificationsList() {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
        await fetch(
            "https://orphanmanagement.herokuapp.com/api/v1/profile/notify",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                setNotifications(result.data);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }
    async function addNotification(
        body,
        createdId,
        id,
        dateSend,
        isAllRole,
        feedBackId,
        isCompleted,
        isSendImmediately,
        recipients,
        roles,
        subject,
        type
    ) {
        if (isAllRole) {
            roles = [];
        }
        let raw = JSON.stringify({
            body,
            createdId,
            id,
            dateSend,
            isAllRole,
            feedBackId,
            isCompleted,
            isSendImmediately,
            recipients,
            roles,
            subject,
            type,
        });
        console.log(JSON.parse(raw));
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
            "https://orphanmanagement.herokuapp.com/api/v1/manager/notification",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                alert("Thông báo được gửi thành công");
            })
            .catch((error) => console.log("error", error));
    }
    async function viewNotification(id) {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };

        let result = await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/profile/notify/${id}`,
            requestOptions
        );
        result = await result.json();
        return result.data;
    }

    async function viewSender(id) {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
        let result = await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/profile/account/${id}`,
            requestOptions
        );
        result = await result.json();
        return result.data;
    }

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                viewNotification,
                viewSender,
                addNotification,
                accounts
            }}
        >
            {props.children}
        </NotificationContext.Provider>
    );
};

export default NotificationContextProvider;
