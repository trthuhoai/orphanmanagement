import React, { useContext, useState } from "react";
import { AccountContext } from "../../contexts/AccountContext";
import "./search.scss";

const SearchList = ({ placeholder, getSearchList, getKeyword }) => {
    const [searchWord, setSearchWord] = useState("");

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        // if (searchWord === "") {
        //     getSearchList(searchWord);
        // }
        setSearchWord(searchWord);
        getKeyword(searchWord);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        getSearchList(1, searchWord);
    };

    return (
        <div className="search">
            <div className="search__input">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchWord}
                    onChange={handleFilter}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            getSearchList(1, searchWord);
                        }
                    }}
                />
                <i
                    className="bi bi-search icon icon__search"
                    onClick={handleSearch}
                ></i>
            </div>
        </div>
    );
};

export default SearchList;
