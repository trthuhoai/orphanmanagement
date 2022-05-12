import React, { useState } from "react";
import "./search.scss";

const SearchList = ({ placeholder, data, getValue }) => {
    const [searchWord, setSearchWord] = useState("");
    const [results, setResults] = useState([]);

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        let matches = [];
        if (searchWord === "") {
            setResults([]);
        } else {
            matches = data.filter((value) =>
                value.fullName.toLowerCase().includes(searchWord.toLowerCase())
            );
            setResults(matches);
        }
        setSearchWord(searchWord);
    };

    return (
        <div className="search">
            <div className="search__input">
                <input
                    type="text"
                    placeholder={placeholder}
                    onChange={handleFilter}
                    value={searchWord}
                    onBlur={() => {
                        setTimeout(() => {
                            setResults([]);
                        }, 500);
                    }}
                />
                <i
                    className="bi bi-search icon icon__search"
                    onClick={() => console.log(results)}
                ></i>
            </div>
        </div>
    );
};

export default SearchList;
