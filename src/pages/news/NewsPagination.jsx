import React, { useContext,useState } from "react";
import ReactPaginate from "react-paginate";
import { NewsContext } from "../../contexts/NewsContext";
import "../../scss/abstracts/_pagination.scss";

const NewsPagination = ({ keyword }) => {
    const [charity, setCharity]=useState([]);
    const { getNewsList } = useContext(NewsContext);
    // const { pages } = useContext(FurnitureContext);
    const { pages } = useContext(NewsContext);
    console.log("pages0000",pages);
    const handlePageClick = (data) => {
        let currentPage = data.selected + 1;
        localStorage.setItem("currentPage", currentPage);
        getNewsList(currentPage);
        console.log("pages0000",pages);
    };
    // async function getNewsList(newsPage) {
    //     let requestOptions = {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json",
    //         },
    //         redirect: "follow",
    //     };
    //     await fetch(
    //         `https://orphanmanagement.herokuapp.com/api/v1/home/charity?page=${newsPage}&limit=5`,
    //         requestOptions
    //     )
    //         .then((response) => response.json())
    //         .then((result) => {
    //             console.log(result)
    //             // setCharity(result.data.result);
    //             setPages(result.data.pages);
    //         })
    //         .catch((error) => console.log("error", error));
    // }
    //  getNewsList(1);
    //  console.log("pages",pages);
    return (
        <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={Math.ceil(pages)}
            marginPagesDisplayed={3}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
        />
    );
};

export default NewsPagination;
