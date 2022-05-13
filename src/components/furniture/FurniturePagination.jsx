import React, { useContext } from "react";
import ReactPaginate from "react-paginate";
import { AccountContext } from "../../contexts/AccountContext";
import { FurnitureContext } from "../../contexts/FurnitureContext";
import "../../scss/abstracts/_pagination.scss";

const FurniturePagination = () => {
    const { getFurnituresList } = useContext(FurnitureContext);
    const { pages } = useContext(FurnitureContext);

    const handlePageClick = (data) => {
        let currentPage = data.selected + 1;
        localStorage.setItem("furniturePage", currentPage);
        getFurnituresList(currentPage);
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

export default FurniturePagination;
