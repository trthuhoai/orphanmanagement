import React, { useContext } from "react";
import ReactPaginate from "react-paginate";
import { FurnitureRequestEmployeeContext } from "../../contexts/FurnitureRequestEmployeeContext";
import "../../scss/abstracts/_pagination.scss";

const FurnitureRequestPagination = () => {
    const { getFurnitureRequestsEmployeeList } = useContext(FurnitureRequestEmployeeContext);
    const { pages } = useContext(FurnitureRequestEmployeeContext);

    const handlePageClick = (data) => {
        let currentPage = data.selected + 1;
        localStorage.setItem("furnitureRequestPage", currentPage);
        getFurnitureRequestsEmployeeList(currentPage);
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
