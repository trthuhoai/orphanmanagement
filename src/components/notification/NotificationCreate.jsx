import moment from "moment";
import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { NotificationContext } from "../../contexts/NotificationContext";
import { SearchBarMulti } from "../search/SearchBarMulti";

const rolesCheck = [
    {
        roleId: 1,
        roleName: "ROLE_ADMIN",
        description: "Quản trị viên",
    },
    {
        roleId: 2,
        roleName: "ROLE_EMPLOYEE",
        description: "Nhân viên",
    },
    {
        roleId: 3,
        roleName: "ROLE_MANAGER_LOGISTIC",
        description: "Quản lý hoạt động trung tâm",
    },
    {
        roleId: 4,
        roleName: "ROLEROLE_MANAGER_HR",
        description: "Quản lý nhân sự",
    },
    {
        roleId: 5,
        roleName: "ROLE_MANAGER_CHILDREN",
        description: "Quản lý trẻ em",
    },
];

const NotificationCreate = () => {
    const currentUser = JSON.parse(localStorage.getItem("current-user"));

    const { accounts } = useContext(NotificationContext);
    const { addNotification } = useContext(NotificationContext);

    const [newNotification, setNewNotification] = useState({
        body: "",
        createdId: currentUser.id,
        id: 0,
        dateSend: "",
        feedBackId: 0,
        isAllRole: false,
        isCompleted: false,
        isSendImmediately: true,
        recipients: [],
        roles: [],
        subject: "",
        type: "MAIL_NOTIFY",
    });

    const [pickerDate, setPickerDate] = useState("");

    const {
        body,
        createdId,
        id,
        dateSend,
        feedBackId,
        isCompleted,
        subject,
        type,
    } = newNotification;

    const onInputChange = (e) => {
        setNewNotification({
            ...newNotification,
            [e.target.name]: e.target.value,
        });
        console.log(newNotification);
    };

    const [roles, setRoles] = useState([]);
    const handleRoles = (e) => {
        if (e.target.checked) {
            setRecipients([]);
        }

        setRoles((prev) => {
            const isChecked = roles.includes(e.target.value);
            if (isChecked) {
                return roles.filter((role) => role !== e.target.value);
            } else {
                return [...prev, e.target.value];
            }
        });
    };

    const [recipients, setRecipients] = useState([]);
    const getEmailsId = (valueEmail) => {
        if (roles.length > 0) {
            setRecipients([]);
        } else {
            setRecipients((prev) => {
                if (recipients.find((recipient) => recipient === valueEmail))
                    return prev;
                return [...prev, valueEmail];
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newNotification);
        addNotification(
            body,
            createdId,
            id,
            dateSend,
            roles.length === 5, //isAllRoles
            feedBackId,
            isCompleted,
            !dateSend, //isSendImmediately
            recipients,
            roles,
            subject,
            type
        );
    };
    return (
        <>
            <div className="form__notification-top">
                <h2 style={{ color: "#0F1E54" }}>Tạo thông báo</h2>
                <div className="form-check__notification">
                    {rolesCheck.map((roleCheck) => (
                        <Form.Check
                            className="form-check"
                            name="roles"
                            id={roleCheck.roleId}
                            label={roleCheck.description}
                            value={roleCheck.roleName}
                            inline
                            key={roleCheck.roleId}
                            onChange={handleRoles}
                            checked={roles.includes(roleCheck.roleName)}
                        />
                    ))}
                </div>
            </div>
            <Form
                className="form form__notification  mb-3"
                id="notificationCreate"
                onSubmit={handleSubmit}
            >
                <Form.Group
                    className="form-group__notification"
                    style={{ border: 0 }}
                >
                    <SearchBarMulti
                        placeholder={"Nhập email người nhận"}
                        data={accounts}
                        getValueId={getEmailsId}
                        option={"email"}
                    />
                    <ul className="email__list">
                        {recipients.map((recipient, index) => (
                            <li className="email__item" key={index}>
                                {recipient}
                                <i
                                    className="bi bi-x icon icon__delete"
                                    onClick={() => {
                                        setRecipients(
                                            recipients.filter(
                                                (value) => value !== recipient
                                            )
                                        );
                                    }}
                                    style={{ lineHeight: 0 }}
                                ></i>
                            </li>
                        ))}
                    </ul>
                </Form.Group>
                <Form.Group className="form-group__notification">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Chủ đề"
                        name="subject"
                        value={subject}
                        onChange={(e) => onInputChange(e)}
                        style={{
                            border: 0,
                            borderTop: "1px solid #ccc",
                            borderRadius: "0",
                        }}
                        required
                    />
                </Form.Group>
                <ReactQuill
                    placeholder="Nội dung thông báo"
                    modules={NotificationCreate.modules}
                    formats={NotificationCreate.formats}
                    name="body"
                    value={body}
                    onChange={(e) => {
                        setNewNotification({ ...newNotification, body: e });
                        console.log(e);
                    }}
                ></ReactQuill>
            </Form>
            <div className="form__notification-bottom">
                <DatePicker
                    className="form-control__notification"
                    placeholderText="Hẹn giờ gửi"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    dateFormat="dd/MM/yyyy HH:mm"
                    timeInputLabel="Thời gian:"
                    showTimeInput
                    selected={pickerDate}
                    onChange={(date) => {
                        const resultDate = date
                            ? moment(date).format("DD/MM/YYYY HH:mm")
                            : "";
                        setNewNotification({
                            ...newNotification,
                            dateSend: resultDate,
                        });
                        setPickerDate(date);
                    }}
                    required
                />
                <Button
                    variant="success"
                    className="btn btn--primary btn__submit"
                    type="submit"
                    form="notificationCreate"
                >
                    {dateSend ? "Hẹn giờ gửi" : "Gửi ngay"}
                </Button>
            </div>
        </>
    );
};

NotificationCreate.modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { header: [3, 4, 5] }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["clean"],
    ],
};

NotificationCreate.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
];

export default NotificationCreate;
