import React, { useContext } from "react";
import ReactPaginate from "react-paginate";
import { IntroducerContext } from "../../contexts/IntroducerContext";
import "../../scss/abstracts/_pagination.scss";

const IntroducerPagination = ({ keyword }) => {
    const { getIntroducersList } = useContext(IntroducerContext);
    const { pages } = useContext(IntroducerContext);

    const handlePageClick = (data) => {
        let currentPage = data.selected + 1;
        localStorage.setItem("currentPage", currentPage);
        getIntroducersList(currentPage, keyword);
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

export default IntroducerPagination;
