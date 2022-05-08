import { Link, NavLink } from "react-router-dom";
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
                <ul>
                    <h2 className="title">Trung tâm</h2>
                    <NavLink
                        to="/account"
                        style={linkStyle}
                        className={({ isActive }) =>
                            isActive ? "link-active" : "link"
                        }
                    >
                        Tài khoản
                    </NavLink>
                    <NavLink
                        to="/children"
                        style={linkStyle}
                        className={({ isActive }) =>
                            isActive ? "link-active" : "link"
                        }
                    >
                        Trẻ em
                    </NavLink>
                    <NavLink
                        to="/staff"
                        style={linkStyle}
                        className={({ isActive }) =>
                            isActive ? "link-active" : "link"
                        }
                    >
                        Nhân viên
                    </NavLink>
                    <NavLink
                        to="/furniture"
                        style={linkStyle}
                        className={({ isActive }) =>
                            isActive ? "link-active" : "link"
                        }
                    >
                        Trang thiết bị
                    </NavLink>
                    <NavLink
                        to="/storage"
                        style={linkStyle}
                        className={({ isActive }) =>
                            isActive ? "link-active" : "link"
                        }
                    >
                        Lưu trữ
                    </NavLink>
                    <h2 className="title">Hoạt động</h2>
                    <NavLink
                        to="/charity"
                        style={linkStyle}
                        className={({ isActive }) =>
                            isActive ? "link-active" : "link"
                        }
                    >
                        Từ thiện
                    </NavLink>
                    <NavLink
                        to="/picnic"
                        style={linkStyle}
                        className={({ isActive }) =>
                            isActive ? "link-active" : "link"
                        }
                    >
                        Dã ngoại
                    </NavLink>
                    <NavLink
                        to="/introducer"
                        style={linkStyle}
                        className={({ isActive }) =>
                            isActive ? "link-active" : "link"
                        }
                    >
                        Giới thiệu trẻ
                    </NavLink>
                    <NavLink
                        to="/nurturer"
                        style={linkStyle}
                        className={({ isActive }) =>
                            isActive ? "link-active" : "link"
                        }
                    >
                        Nhận nuôi
                    </NavLink>
                    <NavLink
                        to="/feedback"
                        style={linkStyle}
                        className={({ isActive }) =>
                            isActive ? "link-active" : "link"
                        }
                    >
                        Phản hồi
                    </NavLink>
                    <NavLink
                        to="/statistic"
                        style={linkStyle}
                        className={({ isActive }) =>
                            isActive ? "link-active" : "link"
                        }
                    >
                        Thống kê
                    </NavLink>
                    <NavLink
                        to="/notification"
                        style={linkStyle}
                        className={({ isActive }) =>
                            isActive ? "link-active" : "link"
                        }
                    >
                        Thông báo
                    </NavLink>
                </ul>
            </div>
            <div className="bottom">
                <ul></ul>
            </div>
        </div>
    );
};

export default Sidebar;
