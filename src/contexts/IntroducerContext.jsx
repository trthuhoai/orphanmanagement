import { createContext, useEffect, useState } from "react";

export const IntroducerContext = createContext();

const IntroducerContextProvider = (props) => {
    const [introducers, setIntroducers] = useState([]);
    const [pages, setPages] = useState([]);

    const currentPage = JSON.parse(localStorage.getItem("currentPage"));
    const token = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        localStorage.setItem("currentPage", 1);
        getIntroducersList(1, "");
    }, []);

    // GET INTRODUCERS LIST
    async function getIntroducersList(currentPage, keyword) {
        if (keyword) {
            let raw = JSON.stringify({
                keyword,
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
                `https://orphanmanagement.herokuapp.com/api/v1/manager/introducer/search?page=${currentPage}&limit=${5}`,
                requestOptions
            )
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    setIntroducers(result.data.result);
                    setPages(result.data.pages);
                })
                .catch((error) => console.log("error", error));
        } else {
            let requestOptions = {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                redirect: "follow",
            };
            await fetch(
                `https://orphanmanagement.herokuapp.com/api/v1/manager/introducer?page=${currentPage}&limit=${5}`,
                requestOptions
            )
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    setIntroducers(result.data.result);
                    setPages(result.data.pages);
                })
                .catch((error) => {
                    console.log("error", error);
                    setIntroducers([]);
                    getIntroducersList(currentPage - 1);
                });
        }
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
                getIntroducersList(currentPage);
            })
            .catch((error) => console.log("error", error));
    }
    // VIEW INTRODUCER DETAILS
    async function viewIntroducer(id) {
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
                getIntroducersList(currentPage);
            })
            .catch((error) => console.log("error", error));
    }
    // DELETE INTRODUCER
    async function deleteIntroducer(id) {
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
                getIntroducersList(currentPage);
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
