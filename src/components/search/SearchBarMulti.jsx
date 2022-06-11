import React, { useState } from "react";
import "./search.scss";

export const SearchBarMulti = ({ placeholder, data, getValueId, option }) => {
    const [searchWord, setSearchWord] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        let matches = [];
        if (searchWord === "") {
            setSuggestions([]);
        } else {
            matches = data.filter((value) =>
                value[option].toLowerCase().includes(searchWord.toLowerCase())
            );
            setSuggestions(matches);
        }
        setSearchWord(searchWord);
    };

    const handleChoose = (searchWord) => {
        setSearchWord(searchWord);
        setSuggestions([]);
        getValueId(data.find((value) => value[option] === searchWord)[option]);
        setSearchWord("")
    };

    return (
        <div className="search">
            <div className="search__input" style={{ border: 0 }}>
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
                {!searchWord && (
                    <i className="bi bi-search icon icon__search"></i>
                )}
                {searchWord && (
                    <i
                        className="bi bi-x-lg icon icon__clear"
                        onClick={() => setSearchWord("")}
                    ></i>
                )}
            </div>
            {suggestions && (
                <div className="search__suggestion">
                    {suggestions.map((value, key) => (
                        <p
                            className="search__item"
                            key={key}
                            onClick={() => handleChoose(value[option])}
                        >
                            {value[option]}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};
