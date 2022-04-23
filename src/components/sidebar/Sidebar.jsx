import { Link } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
    const currentUser = JSON.parse(localStorage.getItem("current-user"));

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
                {currentUser.roles.includes("ROLE_ADMIN") ? (
                    <ul>
                        <h2 className="title">Tài khoản</h2>
                        <Link to="/users" style={linkStyle}>
                            <li className="item">Thành viên</li>
                        </Link>
                    </ul>
                ) : currentUser.roles.includes("ROLE_MANAGER") ? (
                    <>
                        <ul>
                            <h2 className="title">Trung tâm</h2>
                            <Link to="/manager/children" style={linkStyle}>
                                <li className="item">Trẻ em</li>
                            </Link>
                            <Link to="/manager/staff" style={linkStyle}>
                                <li className="item">Nhân viên</li>
                            </Link>
                            <Link to="/manager/furniture" style={linkStyle}>
                                <li className="item">Trang thiết bị</li>
                            </Link>
                        </ul>
                        <ul>
                            <h2 className="title">Hoạt động</h2>
                            <Link to="/manager/charity" style={linkStyle}>
                                <li className="item">Từ thiện</li>
                            </Link>
                            <Link to="/manager/picnic" style={linkStyle}>
                                <li className="item">Dã ngoại</li>
                            </Link>
                            <Link to="/manager/adoption" style={linkStyle}>
                                <li className="item">Nhận nuôi</li>
                            </Link>
                            <Link to="/manager/introduction" style={linkStyle}>
                                <li className="item">Giới thiệu trẻ</li>
                            </Link>
                            <Link to="/manager/feedback" style={linkStyle}>
                                <li className="item">Phản hồi</li>
                            </Link>
                            <Link to="/manager/statistics" style={linkStyle}>
                                <li className="item">Thống kê</li>
                            </Link>
                            <Link to="/manager/notifications" style={linkStyle}>
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
