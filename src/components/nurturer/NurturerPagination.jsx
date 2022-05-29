import React, { useContext } from "react";
import ReactPaginate from "react-paginate";
import { NurturerContext } from "../../contexts/NurturerContext";
import "../../scss/abstracts/_pagination.scss";

const NurturerPagination = ({ keyword }) => {
    const { getNurturersList } = useContext(NurturerContext);
    const { pages } = useContext(NurturerContext);

    const handlePageClick = (data) => {
        let currentPage = data.selected + 1;
        localStorage.setItem("currentPage", currentPage);
        getNurturersList(currentPage, keyword);
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

export default NurturerPagination;
