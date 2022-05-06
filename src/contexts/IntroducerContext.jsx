import { createContext, useEffect, useState } from "react";

export const IntroducerContext = createContext();

const IntroducerContextProvider = (props) => {
    const [introducers, setIntroducers] = useState([]);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        getIntroducersList();
    }, []);

    // GET INTRODUCERS LIST
    async function getIntroducersList(page = 1) {
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
            `https://orphanmanagement.herokuapp.com/api/v1/manager/introducer?page=${page}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setIntroducers(result.data.result);
                setPages(result.data.pages);
            })
            .catch((error) => console.log("error", error));
    }

    // ADD INTRODUCER
    async function addIntroducer(
        image,
        fullName,
        dateOfBirth,
        gender,
        address,
        identification,
        phone,
        email
    ) {
        let raw = JSON.stringify({
            image,
            fullName,
            dateOfBirth,
            gender,
            address,
            identification,
            phone,
            email,
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
            "https://orphanmanagement.herokuapp.com/api/v1/manager/introducer",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                getIntroducersList();
            })
            .catch((error) => console.log("error", error));
    }
    // VIEW INTRODUCER DETAILS
    async function viewIntroducer(id) {
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
            `https://orphanmanagement.herokuapp.com/api/v1/manager/introducer/${id}`,
            requestOptions
        );

        result = await result.json();
        return result.data;
    }
    //EDIT INTRODUCER
    async function updateIntroducer(id, updatedIntroducer) {
        const token = JSON.parse(localStorage.getItem("token"));
        let raw = JSON.stringify(updatedIntroducer);
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
            `https://orphanmanagement.herokuapp.com/api/v1/manager/introducer/${id}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                getIntroducersList();
            })
            .catch((error) => console.log("error", error));
    }
    // DELETE INTRODUCER
    async function deleteIntroducer(id) {
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
            `https://orphanmanagement.herokuapp.com/api/v1/manager/introducer/${id}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                getIntroducersList();
            })
            .catch((error) => console.log("error", error));
    }
    return (
        <IntroducerContext.Provider
            value={{
                introducers,
                getIntroducersList,
                addIntroducer,
                deleteIntroducer,
                viewIntroducer,
                updateIntroducer,
                pages,
            }}
        >
            {props.children}
        </IntroducerContext.Provider>
    );
};

export default IntroducerContextProvider;
