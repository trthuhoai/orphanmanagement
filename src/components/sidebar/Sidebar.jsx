import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
    const [userInfo, setUserInfo] = useState({ roles: [] });

    useEffect(() => {
        getUserInfo();
    }, []);

    async function getUserInfo() {
        const token = JSON.parse(localStorage.getItem("token"));
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };
        const result = await fetch(
            "https://orphanmanagement.herokuapp.com/api/v1/auth/account",
            requestOptions
        );
        const getResult = await result.json();
        setUserInfo(getResult.data);
    }
    const linkStyle = {
        color: "#fff",
        textDecoration: "none",
    };
    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/" style={linkStyle}>
                    <span className="logo">
                        <span className="logo__name">CYF</span>
                        <span>Center</span>
                    </span>
                </Link>
            </div>
            <div className="center">
                {userInfo.roles.includes("ROLE_ADMIN") ? (
                    <ul>
                        <h2 className="title">Tài khoản</h2>
                        <Link to="/users" style={linkStyle}>
                            <li className="item">Thành viên</li>
                        </Link>
                    </ul>
                ) : userInfo.roles.includes("ROLE_MANAGER") ? (
                    <>
                        <ul>
                            <h2 className="title">Trung tâm</h2>
                            <Link to="/children" style={linkStyle}>
                                <li className="item">Trẻ em</li>
                            </Link>
                            <Link to="/staff" style={linkStyle}>
                                <li className="item">Nhân viên</li>
                            </Link>
                            <Link to="/furniture" style={linkStyle}>
                                <li className="item">Trang thiết bị</li>
                            </Link>
                        </ul>
                        <ul>
                            <h2 className="title">Hoạt động</h2>
                            <Link to="/charity" style={linkStyle}>
                                <li className="item">Từ thiện</li>
                            </Link>
                            <Link to="/picnic" style={linkStyle}>
                                <li className="item">Dã ngoại</li>
                            </Link>
                            <Link to="/adoption" style={linkStyle}>
                                <li className="item">Nhận nuôi</li>
                            </Link>
                            <Link to="/introduction" style={linkStyle}>
                                <li className="item">Giới thiệu trẻ</li>
                            </Link>
                            <Link to="/feedback" style={linkStyle}>
                                <li className="item">Phản hồi</li>
                            </Link>
                            <Link
                                to="/statistics"
                                style={linkStyle}
                            >
                                <li className="item">Thống kê</li>
                            </Link>
                            <Link
                                to="/notifications"
                                style={linkStyle}
                            >
                                <li className="item">Thông báo</li>
                            </Link>
                        </ul>
                    </>
                ) : (
                    ""
                )}
            </div>
            <div className="bottom"></div>
        </div>
    );
};

export default Sidebar;
