import React, { useContext } from "react";
import ReactPaginate from "react-paginate";
import { PicnicContext } from "../../contexts/PicnicContext";
import "../../scss/abstracts/_pagination.scss";

const PicnicPagination = ({ keyword }) => {
    const { getPicnicsList } = useContext(PicnicContext);
    const { pages } = useContext(PicnicContext);

    const handlePageClick = (data) => {
        let currentPage = data.selected + 1;
        localStorage.setItem("currentPage", currentPage);
        getPicnicsList(currentPage, keyword);
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

export default PicnicPagination;
