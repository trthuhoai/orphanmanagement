import { Link, NavLink } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
    const currentUser = JSON.parse(localStorage.getItem("current-user"));
    let employee=0;
    const linkStyle = {
        color: "#fff",
        textDecoration: "none",
    };

    if(currentUser.roles[0].roleName==="ROLE_ADMIN")
{
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
                        to="/employee"
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
                        to="/announcement"
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
}
else if(currentUser.roles[0].roleName==="ROLE_MANAGER_LOGISTIC")
{
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
                <h2 className="title">Thiết bị</h2>
                <NavLink
                    to="/manager/furniture" exact
                    style={linkStyle}
                    className={({ isActive }) =>
                        isActive ? "link-active" : "link"
                    }
                >
                    Thông tin
                </NavLink>
                <NavLink
                    to="/furniture/request"
                    style={linkStyle}
                    className={({ isActive }) =>
                        isActive ? "link-active" : "link"
                    }
                >
                    Yêu cầu
                </NavLink>
                <h2 className="title">Hoạt động</h2>
                <NavLink
                    to="/manager/charity"
                    style={linkStyle}
                    className={({ isActive }) =>
                        isActive ? "link-active" : "link"
                    }
                >
                    Từ thiện
                </NavLink>
                <NavLink
                    to="/manager/picnic"
                    style={linkStyle}
                    className={({ isActive }) =>
                        isActive ? "link-active" : "link"
                    }
                >
                    Dã ngoại
                </NavLink>
            </ul>
        </div>
        <div className="bottom">
            <ul></ul>
        </div>
    </div>
    );
}
else if(currentUser.roles[0].roleName==="ROLE_MANAGER_HR")
{
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
                    to="/employee"
                    style={linkStyle}
                    className={({ isActive }) =>
                        isActive ? "link-active" : "link"
                    }
                >
                    Nhân viên
                </NavLink>
                <h2 className="title">Hoạt động</h2>
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
                    to="/announcement"
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

}
else if(currentUser.roles[0].roleName==="ROLE_MANAGER_CHILDREN")
{
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
                    to="/children"
                    style={linkStyle}
                    className={({ isActive }) =>
                        isActive ? "link-active" : "link"
                    }
                >
                    Trẻ em
                </NavLink>
                <h2 className="title">Hoạt động</h2>
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
            </ul>
        </div>
        <div className="bottom">
            <ul></ul>
        </div>
    </div>
    );

}
else {
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
                <h2 className="title">Thiết bị</h2>
                <NavLink
                    to="/employee/furniture/request"
                    style={linkStyle}
                    className={({ isActive }) =>
                        isActive ? "link-active" : "link"
                    }
                >
                    Yêu cầu
                </NavLink>
                <h2 className="title">Hoạt động</h2>
                <NavLink
                    to="/manager/charity"
                    style={linkStyle}
                    className={({ isActive }) =>
                        isActive ? "link-active" : "link"
                    }
                >
                    Từ thiện
                </NavLink>
                <NavLink
                    to="/manager/picnic"
                    style={linkStyle}
                    className={({ isActive }) =>
                        isActive ? "link-active" : "link"
                    }
                >
                    Dã ngoại
                </NavLink>
            </ul>
        </div>
        <div className="bottom">
            <ul></ul>
        </div>
    </div>
    );
};
}

export default Sidebar;
