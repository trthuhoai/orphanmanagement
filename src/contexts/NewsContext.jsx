import { createContext, useEffect, useState } from "react";

export const NewsContext = createContext();

const NewsContextProvider = (props) => {
    const [charity, setCharity] = useState([]);
    const [pages, setPages] = useState([]);

    // const currentPage = JSON.parse(localStorage.getItem("newsPage"));
    // console.log("Current",currentPage);

    useEffect(() => {
        // localStorage.setItem("newsPage", 1);
        getNewsList(1,"");
    }, []);

    // GET CHARITYS LIST
    async function getNewsList(currentPage) {
        let requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            redirect: "follow",
        };
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/home/charity?page=${currentPage}&limit=5`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                setCharity(result.data.result);
                setPages(result.data.pages);
               
            })
            .catch((error) => console.log("error", error));
    }
    return (
        <NewsContext.Provider
            value={{
                charity,
                getNewsList,
                pages,
            }}
        >
            {props.children}
        </NewsContext.Provider>
    );
};

export default NewsContextProvider;
