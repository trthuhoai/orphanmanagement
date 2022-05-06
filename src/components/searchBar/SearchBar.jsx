import React, { useState } from "react";
import "./searchBar.scss";

export const SearchBar = ({ placeholder, data, getValueId }) => {
    const [searchWord, setSearchWord] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        let matches = [];
        if (searchWord === "") {
            setSuggestions([]);
        } else {
            matches = data.filter((value) =>
                value.fullName.toLowerCase().includes(searchWord.toLowerCase())
            );
            setSuggestions(matches);
        }
        setSearchWord(searchWord);
    };

    const handleChoose = (searchWord) => {
        setSearchWord(searchWord);
        setSuggestions([]);
        getValueId(data.find((value) => value.fullName === searchWord).id);
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
                            setSuggestions([]);
                        }, 500);
                    }}
                />
                <i className="bi bi-search icon icon__search"></i>
            </div>
            {suggestions && (
                <div className="search__result">
                    {suggestions.map((value, key) => (
                        <p
                            className="search__item"
                            key={key}
                            onClick={() => handleChoose(value.fullName)}
                        >
                            {value.fullName}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};
