import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes,
} from "firebase/storage";
import moment from "moment";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { storage } from "../../firebase";
import "../../scss/abstracts/_form.scss";

const FormInfo = () => {
    const currentUser = JSON.parse(localStorage.getItem("current-user"));
    const token = JSON.parse(localStorage.getItem("token"));

    const [imageSuccess, setImageSuccess] = useState();
    const [image, setImage] = useState(currentUser.image);
    const [fullName, setFullName] = useState(currentUser.fullName);
    const [date_of_birth, setDate_of_birth] = useState(
        currentUser.date_of_birth
    );
    const [gender, setGender] = useState(currentUser.gender);
    const [roles, setRoles] = useState(currentUser.roles);
    const [address, setAddress] = useState(currentUser.address);
    const [identification, setIdentification] = useState(
        currentUser.identification
    );
    const [phone, setPhone] = useState(currentUser.phone);
    const [email, setEmail] = useState(currentUser.email);

    async function updateProfile(updatedProfile) {
        let raw = JSON.stringify(updatedProfile);
        let requestOptions = {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: raw,
            redirect: "follow",
        };

        await fetch(
            "https://orphanmanagement.herokuapp.com/api/v1/profile/account",
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.code === 200) {
                    alert("Cập nhật thông tin thành công");
                    localStorage.setItem(
                        "current-user",
                        JSON.stringify(result.data)
                    );
                }
            })
            .catch((error) => console.log("error", error));
    }
    const updatedProfile = {
        image,
        fullName,
        date_of_birth,
        gender,
        roles,
        address,
        identification,
        phone,
        email,
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(updatedProfile);
        updateProfile(updatedProfile);
    };

    // IMAGE UPDATE
    // generate random string for filename
    function generateString(length) {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = " ";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }
    const [file, setFile] = useState("");
    const onFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };
    async function handleUpdateImage() {
        if (!file) return;
        if (image && image.includes("firebasestorage")) {
            const pathFromURL = ref(storage, image)._location.path_;
            const desertRef = ref(storage, pathFromURL);
            await deleteObject(desertRef)
                .then(() => {
                    console.log("File deleted successfully");
                })
                .catch((error) => {
                    console.log("Uh-oh, an error occurred!", error);
                });
        }
        const storageRef = ref(storage, `accounts/${generateString(100)}`);
        await uploadBytes(storageRef, file).then(() => {
            getDownloadURL(storageRef)
                .then((url) => {
                    console.log(url);
                    setImage(url);
                    setImageSuccess("Tải ảnh lên thành công");
                })
                .catch((err) => console.log(err));
        });
    }

    return (
        <>
            <h3 className="profile__title">Cập nhật thông tin tài khoản</h3>
            <Form.Group className="mb-3 form-group">
                <img
                    className="image"
                    id="accountImage"
                    alt=""
                    src={
                        (file && URL.createObjectURL(file)) ||
                        image ||
                        "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
                    }
                />
                <Row>
                    <Form.Label
                        htmlFor="accountImageFile"
                        className="form-label btn__image btn btn--secondary"
                    >
                        <i className="bi bi-image icon icon__image"></i>
                        Chọn ảnh
                    </Form.Label>
                    <Form.Control
                        className="form-control form-control__file"
                        type="file"
                        accept="image/*"
                        name="image"
                        id="accountImageFile"
                        onChange={onFileChange}
                        required
                    />
                    <Button
                        className="form-label btn__image btn btn--secondary"
                        onClick={handleUpdateImage}
                    >
                        <i className="bi bi-file-earmark-arrow-up-fill"></i> Lưu
                        ảnh
                    </Button>
                </Row>
                {imageSuccess && (
                    <p className="image__success">{imageSuccess}</p>
                )}
            </Form.Group>
            <Form
                onSubmit={handleSubmit}
                className="form mb-3"
                id="profileUpdate"
            >
                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Họ và tên"
                        name="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} className="form-group">
                        <DatePicker
                            className="form-control"
                            placeholderText="Ngày sinh"
                            selected={
                                new Date(
                                    date_of_birth.substring(6, 11),
                                    date_of_birth.substring(3, 5) - 1,
                                    date_of_birth.substring(0, 2)
                                )
                            }
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date) => {
                                const resultDate =
                                    moment(date).format("DD/MM/YYYY");
                                setDate_of_birth(resultDate);
                            }}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} className="form-group">
                        <Form.Select
                            className="form-select form-select__gender"
                            name="gender"
                            onChange={(e) => {
                                console.log(e.target.value);
                                setGender(
                                    e.target.value === "true" ? true : false
                                );
                            }}
                            value={gender}
                        >
                            <option hidden>Giới tính</option>
                            <option value={true}>Nam</option>
                            <option value={false}>Nữ</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} className="form-group">
                        <Form.Select
                            className="form-select"
                            name="roles"
                            onChange={(e) => {
                                console.log(e.target.value);
                                setRoles(JSON.parse(e.target.value));
                            }}
                            value={JSON.stringify(roles)}
                        >
                            <option hidden>Phân quyền</option>
                            <option
                                value={JSON.stringify([
                                    {
                                        roleId: 1,
                                        roleName: "ROLE_ADMIN",
                                        description: "Quản trị viên",
                                    },
                                ])}
                            >
                                Quản trị viên
                            </option>
                            <option
                                value={
                                    JSON.stringify([{
                                        roleId: 2,
                                        roleName: "ROLE_EMPLOYEE",
                                        description: "Nhân viên",
                                    }])
                                }
                            >
                                Nhân viên
                            </option>
                            <option
                                value={
                                    JSON.stringify([{
                                        roleId: 3,
                                        roleName: "ROLE_MANAGER_LOGISTIC",
                                        description:
                                            "Quản lý hoạt động trung tâm",
                                    }])
                                }
                            >
                                Quản lý trung tâm
                            </option>
                            <option
                                value={
                                    JSON.stringify([{
                                        roleId: 4,
                                        roleName: "ROLE_MANAGER_HR",
                                        description: "Quản lý nhân sự",
                                    }])
                                }
                            >
                                Quản lý nhân sự
                            </option>
                            <option
                                value={
                                    JSON.stringify([{
                                        roleId: 5,
                                        roleName: "ROLE_MANAGER_CHILDREN",
                                        description: "Quản lý trẻ em",
                                    }])
                                }
                            >
                                Quản lý trẻ em
                            </option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Địa chỉ"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} className="form-group">
                        <Form.Control
                            className="form-control"
                            type="text"
                            placeholder="CMND/CCCD"
                            name="identification"
                            value={identification}
                            onChange={(e) => setIdentification(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} className="form-group">
                        <Form.Control
                            className="form-control"
                            type="text"
                            placeholder="Số điện thoại"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button
                    form="profileUpdate"
                    variant="success"
                    type="submit"
                    className="btn btn--primary btn__submit"
                >
                    Cập nhật thông tin
                </Button>
            </Form>
        </>
    );
};

export default FormInfo;
