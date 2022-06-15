import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import moment from "moment";
import { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { PicnicContext } from "../../contexts/PicnicContext";
import { storage } from "../../firebase";
import "../../scss/abstracts/_form.scss";

const PicnicCreate = () => {
    const { addPicnic } = useContext(PicnicContext);
    const [newPicnic, setNewPicnic] = useState({
        image: "",
        namePicnic: "",
        title: "",
        dateStart: "",
        dateEnd: "",
        address: "",
        content: "",
        personInChargeId: [0],
    });

    const [imageSuccess, setImageSuccess] = useState("");
    const [pickerDateStart, setPickerDateStart] = useState("");
    const [pickerDateEnd, setPickerDateEnd] = useState("");

    const onInputChange = (e) => {
        setNewPicnic({
            ...newPicnic,
            [e.target.name]: e.target.value,
        });
        console.log(newPicnic);
    };
    const {
        image,
        namePicnic,
        title,
        dateStart,
        dateEnd,
        address,
        content,
        personInChargeId = [0],
    } = newPicnic;
    const handleSubmit = (e) => {
        e.preventDefault();
        addPicnic(
            image,
            namePicnic,
            title,
            dateStart,
            dateEnd,
            address,
            content,
            personInChargeId
        );
    };

    // IMAGE UPLOAD
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
    async function handleUploadImage() {
        if (!file) return;
        const storageRef = ref(storage, `picnics/${generateString(100)}`);
        await uploadBytes(storageRef, file).then(() => {
            getDownloadURL(storageRef)
                .then((url) => {
                    setNewPicnic({
                        ...newPicnic,
                        image: url,
                    });
                    console.log(url);
                    setImageSuccess("Tải ảnh lên thành công");
                })
                .catch((err) => console.log("err", err));
        });
    }

    return (
        <>
            <Form.Group className="mb-3 form-group">
                <img
                    className="image"
                    id="picnicImage"
                    alt=""
                    src={
                        (file && URL.createObjectURL(file)) ||
                        "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
                    }
                />
                <Row>
                    <Form.Label
                        htmlFor="picnicImageFile"
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
                        id="picnicImageFile"
                        onChange={onFileChange}
                    />
                    <Button
                        className="form-label btn__image btn btn--secondary"
                        onClick={handleUploadImage}
                    >
                        <i className="bi bi-file-earmark-arrow-up-fill"></i> Lưu
                        ảnh
                    </Button>
                </Row>
                {imageSuccess && (
                    <p className="image__success">{imageSuccess}</p>
                )}
            </Form.Group>
            <Form onSubmit={handleSubmit} className="form" id="picnicCreate">
                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Tên sự kiện"
                        name="namePicnic"
                        value={namePicnic}
                        onChange={(e) => onInputChange(e)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Chủ đề"
                        name="title"
                        value={title}
                        onChange={(e) => onInputChange(e)}
                        required
                    />
                </Form.Group>

                <Form.Group className="form-group mb-3">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Địa điểm"
                        name="address"
                        value={address}
                        onChange={(e) => onInputChange(e)}
                        required
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} className="form-group">
                        <DatePicker
                            className="form-control"
                            placeholderText="Thời gian bắt đầu"
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                            dateFormat="dd/MM/yyyy HH:mm"
                            timeInputLabel="Thời gian:"
                            showTimeInput
                            selected={pickerDateStart}
                            onChange={(date) => {
                                const resultDate =
                                    moment(date).format("DD/MM/YYYY HH:mm");
                                setNewPicnic({
                                    ...newPicnic,
                                    dateStart: resultDate,
                                });
                                setPickerDateStart(date);
                            }}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="form-group">
                        <DatePicker
                            className="form-control"
                            placeholderText="Thời gian kết thúc"
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                            dateFormat="dd/MM/yyyy HH:mm"
                            timeInputLabel="Thời gian:"
                            showTimeInput
                            selected={pickerDateEnd}
                            onChange={(date) => {
                                const resultDate =
                                    moment(date).format("DD/MM/YYYY HH:mm");
                                setNewPicnic({
                                    ...newPicnic,
                                    dateEnd: resultDate,
                                });
                                setPickerDateEnd(date);
                            }}
                            required
                        />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        as="textarea"
                        placeholder="Nội dung sự kiện"
                        name="content"
                        value={content}
                        onChange={(e) => onInputChange(e)}
                        style={{ height: "150px" }}
                        required
                    />
                </Form.Group>
            </Form>
        </>
    );
};

export default PicnicCreate;
