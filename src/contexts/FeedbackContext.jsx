import { createContext, useEffect, useState } from "react";

export const FeedbackContext = createContext();

const FeedbackContextProvider = (props) => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [pages, setPages] = useState([]);

    const currentPage = JSON.parse(localStorage.getItem("currentPage"));
    const token = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        localStorage.setItem("currentPage", 1);
        getFeedbacksList(1, "");
    }, []);

    async function getFeedbacksList(currentPage, keyword) {
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/manager/feedback?page=${currentPage}&limit=5`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                setFeedbacks(result.data.result);
                setPages(result.data.pages);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }
    async function addFeedback(body, email, fullName, id, subject) {
        let raw = JSON.stringify({
            body,
            email,
            fullName,
            id,
            subject,
        });
        let requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: raw,
            redirect: "follow",
        };

        await fetch(
            "https://orphanmanagement.herokuapp.com/api/v1/home/feedback",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                alert("Đánh giá của bạn được gửi thành công");
            })
            .catch((error) => console.log("error", error));
    }
    async function createReplyFeedback(feedBackId, body, recipients, subject) {
        let raw = JSON.stringify({
            body,
            recipients,
            subject,
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
            `https://orphanmanagement.herokuapp.com/api/v1/manager/feedback/${feedBackId}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                alert("Phản hồi được gửi thành công");
                getFeedbacksList(currentPage, "");
            })
            .catch((error) => console.log("error", error));
    }
    async function viewFeedback(id) {
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

    return (
        <FeedbackContext.Provider
            value={{
                feedbacks,
                viewFeedback,
                addFeedback,
                pages,
                createReplyFeedback,
                getFeedbacksList,
            }}
        >
            {props.children}
        </FeedbackContext.Provider>
    );
};

export default FeedbackContextProvider;
