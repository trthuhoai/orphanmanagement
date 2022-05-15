import { useContext } from "react";
import { Button } from "react-bootstrap";
import { LoadingList } from "../../components/loading/LoadingSkeleton";
import { StorageContext } from "../../contexts/StorageContext";
import "../../scss/abstracts/_modal.scss";
import "../../scss/abstracts/_table.scss";
import SearchList from "../search/SearchList";
import Storage from "./Storage";
import StoragePagination from "./StoragePagination";

const StorageList = () => {
    const { storages } = useContext(StorageContext);
    const { searchStorage } = useContext(StorageContext);

    return (
        <>
            <div className="table">
                <div className="table__top">
                    <h2>Lưu trữ</h2>
                    <SearchList
                        placeholder={"Tìm kiếm nhân viên "}
                        searchValue={searchStorage}
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
                            <th scope="col">Email</th>
                            <th scope="col">Phân quyền</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    {storages.length !== 0 && (
                        <tbody>
                            {storages.map((storage) => (
                                <tr key={storage.id}>
                                    <Storage storage={storage} />
                                </tr>
                            ))}
                        </tbody>
                    )}
                    {storages.length === 0 && <LoadingList></LoadingList>}
                </table>
            </div>
            <StoragePagination />
        </>
    );
};

export default StorageList;
