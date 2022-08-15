import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes,
} from "firebase/storage";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { AccountContext } from "../../contexts/AccountContext";
import { storage } from "../../firebase";
import "../../scss/abstracts/_form.scss";

const AccountUpdate = ({ theAccount }) => {
    const id = theAccount.id;

    const [image, setImage] = useState("");
    const [imageSuccess, setImageSuccess] = useState("");
    const [fullName, setFullName] = useState("");
    const [date_of_birth, setDate_of_birth] = useState("");
    const [gender, setGender] = useState("");
    const [roles, setRoles] = useState("");
    const [address, setAddress] = useState("");
    const [identification, setIdentification] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const { viewAccount } = useContext(AccountContext);
    useEffect(() => {
        viewAccount(id).then((result) => {
            setImage(result.image);
            setFullName(result.fullName);
            setDate_of_birth(result.date_of_birth);
            setGender(result.gender);
            setRoles([result.roles[0].roleName]);
            setAddress(result.address);
            setIdentification(result.identification);
            setPhone(result.phone);
            setEmail(result.email);
        });
    }, []);

    const { updateAccount } = useContext(AccountContext);
    const updatedAccount = {
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
        console.log(updatedAccount);
        updateAccount(id, updatedAccount);
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
            <Form onSubmit={handleSubmit} className="form" id="accountUpdate">
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
                                if (date) {
                                    const resultDate =
                                        moment(date).format("DD/MM/YYYY");
                                    setDate_of_birth(resultDate);
                                }
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
                                setRoles([e.target.value]);
                            }}
                            value={roles}
                        >
                            <option hidden>Phân quyền</option>
                            <option value={["ROLE_ADMIN"]}>
                                Quản trị viên
                            </option>
                            <option value={["ROLE_EMPLOYEE"]}>Nhân viên</option>
                            <option value={["ROLE_MANAGER_LOGISTIC"]}>
                                Quản lý trung tâm
                            </option>
                            <option value={["ROLE_MANAGER_HR"]}>
                                Quản lý nhân sự
                            </option>
                            <option value={["ROLE_MANAGER_CHILDREN"]}>
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
            </Form>
        </>
    );
};

export default AccountUpdate;
