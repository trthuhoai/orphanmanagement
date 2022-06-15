
import { Navigate } from "react-router-dom";
import NewsList from "../../pages/news/News";
import NewsContextProvider from "../../contexts/NewsContext";
import "./list.scss";

const ListNews = () => {
    return (
       
        <NewsContextProvider>
            <NewsList />
        </NewsContextProvider>
               
    );
};

export default ListNews;
