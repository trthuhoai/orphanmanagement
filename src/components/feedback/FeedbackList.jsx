import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { LoadingList } from "../../components/loading/LoadingSkeleton";
import { FeedbackContext } from "../../contexts/FeedbackContext";
import "../../scss/abstracts/_modal.scss";
import "../../scss/abstracts/_table.scss";
import SearchList from "../search/SearchList";
import Feedback from "./Feedback";
import FeedbackPagination from "./FeedbackPagination";

const FeedbackList = () => {
    const { feedbacks } = useContext(FeedbackContext);
    const { getFeedbacksList } = useContext(FeedbackContext);

    const [keyword, setKeyword] = useState("");
    const getKeyword = (keyword) => {
        setKeyword(keyword);
    };

    return (
        <>
            <div className="table">
                <div className="table__top">
                    <h2>Phản hồi</h2>
                    <SearchList
                        placeholder={"Tìm kiếm phản hồi "}
                        getSearchList={getFeedbacksList}
                        getKeyword={getKeyword}
                    ></SearchList>
                    <Button
                        className="btn btn--primary"
                        style={{ visibility: "hidden" }}
                    ></Button>
                </div>
                <table className="table__body">
                    <thead>
                        <tr>
                            <th scope="col">Họ và tên</th>
                            <th scope="col">Tiêu đề</th>
                            <th scope="col">Ngày gửi</th>
                            <th scope="col">Phản hồi</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    {feedbacks.length !== 0 && (
                        <tbody>
                            {feedbacks.map((feedback) => (
                                <tr key={feedback.id}>
                                    <Feedback feedback={feedback} />
                                </tr>
                            ))}
                        </tbody>
                    )}
                    {feedbacks.length === 0 && (
                        <LoadingList columns={5}></LoadingList>
                    )}
                </table>
            </div>
            <FeedbackPagination keyword={keyword} />
        </>
    );
};

export default FeedbackList;
