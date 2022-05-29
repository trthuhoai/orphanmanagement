import React, { useContext } from "react";
import ReactPaginate from "react-paginate";
import { FurnitureRequestContext } from "../../contexts/FurnitureRequestContext";
import "../../scss/abstracts/_pagination.scss";

const FurnitureRequestPagination = () => {
    const { getFurnitureRequestsList } = useContext(FurnitureRequestContext);
    const { pages } = useContext(FurnitureRequestContext);

    const handlePageClick = (data) => {
        let currentPage = data.selected + 1;
        localStorage.setItem("furnitureRequestPage", currentPage);
        getFurnitureRequestsList(currentPage);
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

export default FurnitureRequestPagination;
