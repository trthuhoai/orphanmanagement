import React, { useContext } from "react";
import ReactPaginate from "react-paginate";
import { ChildrenContext } from "../../contexts/ChildrenContext";
import "../../scss/abstracts/_pagination.scss";

const ChildrenPagination = () => {
    const { getChildrensList } = useContext(ChildrenContext);
    const { pages } = useContext(ChildrenContext);

    const handlePageClick = (data) => {
        let currentPage = data.selected + 1;
        getChildrensList(currentPage);
    };

    return (
        <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pages}
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

export default ChildrenPagination;
