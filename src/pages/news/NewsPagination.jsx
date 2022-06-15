import React, { useContext } from "react";
import ReactPaginate from "react-paginate";
import { NewsContext } from "../../contexts/NewsContext";
import "../../scss/abstracts/_pagination.scss";

const NewsPagination = () => {
    const { getNewsList } = useContext(NewsContext);
    const { pages } = useContext(NewsContext);
    const handlePageClick = (data) => {
        let currentPage = data.selected + 1;
        localStorage.setItem("newsPage", currentPage);
        getNewsList(currentPage);
    };

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