import React, { useState } from "react";
import "./search.scss";

const SearchList = ({ placeholder, searchValue }) => {
    const [searchWord, setSearchWord] = useState("");

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        // if (searchWord === "") {
        //     searchValue(searchWord);
        // }
        setSearchWord(searchWord);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        searchValue(searchWord);
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
                            searchValue(searchWord);
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
