import React, { useContext } from "react";
import ReactPaginate from "react-paginate";
import { FeedbackContext } from "../../contexts/FeedbackContext";
import "../../scss/abstracts/_pagination.scss";

const FeedbackPagination = ({ keyword }) => {
    const { getFeedbacksList } = useContext(FeedbackContext);
    const { pages } = useContext(FeedbackContext);

    const handlePageClick = (data) => {
        let currentPage = data.selected + 1;
        localStorage.setItem("currentPage", currentPage);
        getFeedbacksList(currentPage, keyword);
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

export default FeedbackPagination;
