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
import { IntroducerContext } from "../../contexts/IntroducerContext";
import { storage } from "../../firebase";
import "../../scss/abstracts/_form.scss";

const IntroducerUpdate = ({ theIntroducer }) => {
    const id = theIntroducer.id;

    const [image, setImage] = useState("");

    const [imageSuccess, setImageSuccess] = useState("");
    const [fullName, setFullName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [identification, setIdentification] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const { viewIntroducer } = useContext(IntroducerContext);
    useEffect(() => {
        viewIntroducer(id).then((result) => {
            setImage(result.image);
            setFullName(result.fullName);
            setDateOfBirth(result.dateOfBirth);
            setGender(result.gender);
            setAddress(result.address);
            setIdentification(result.identification);
            setPhone(result.phone);
            setEmail(result.email);
        });
    }, []);

    const { updateIntroducer } = useContext(IntroducerContext);
    const updatedIntroducer = {
        image,
        fullName,
        dateOfBirth,
        gender,
        address,
        identification,
        phone,
        email,
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(updatedIntroducer);
        updateIntroducer(id, updatedIntroducer);
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
        const storageRef = ref(storage, `introducers/${generateString(100)}`);
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
                    id="introducerImage"
                    alt=""
                    src={
                        (file && URL.createObjectURL(file)) ||
                        image ||
                        "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
                    }
                />
                <Row>
                    <Form.Label
                        htmlFor="introducerImageFile"
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
                        id="introducerImageFile"
                        onChange={onFileChange}
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
                className="form"
                id="introducerUpdate"
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
                                    dateOfBirth.substring(6, 11),
                                    dateOfBirth.substring(3, 5) - 1,
                                    dateOfBirth.substring(0, 2)
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
                                    setDateOfBirth(resultDate);
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

export default IntroducerUpdate;
