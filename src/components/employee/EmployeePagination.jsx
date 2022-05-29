import React, { useContext } from "react";
import ReactPaginate from "react-paginate";
import { EmployeeContext } from "../../contexts/EmployeeContext";
import "../../scss/abstracts/_pagination.scss";

const EmployeePagination = ({ keyword }) => {
    const { getEmployeesList } = useContext(EmployeeContext);
    const { pages } = useContext(EmployeeContext);

    const handlePageClick = (data) => {
        let currentPage = data.selected + 1;
        localStorage.setItem("currentPage", currentPage);
        getEmployeesList(currentPage, keyword);
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

export default EmployeePagination;
