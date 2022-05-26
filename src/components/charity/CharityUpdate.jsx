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
import { CharityContext } from "../../contexts/CharityContext";
import { storage } from "../../firebase";
import "../../scss/abstracts/_form.scss";

const CharityUpdate = ({ theCharity }) => {
    const id = theCharity.id;

    const [image, setImage] = useState("");
    const [imageSuccess, setImageSuccess] = useState("");
    const [charityName, setCharityName] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const { viewCharity } = useContext(CharityContext);
    useEffect(() => {
        viewCharity(id).then((result) => {
            setImage(result.image);
            setCharityName(result.charityName);
            setTitle(result.title);
            setDateStart(result.dateOfEvent);
            setDateEnd(result.dateOfEvent);
            setContent(result.content);
        });
    }, []);

    const { updateCharity } = useContext(CharityContext);
    const updatedCharity = {
        charityName,
        content,
        dateEnd,
        dateStart,
        image,
        title,
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(updatedCharity);
        updateCharity(id, updatedCharity);
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
        const storageRef = ref(storage, `charitys/${generateString(100)}`);
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
                    id="charityImage"
                    alt=""
                    src={
                        (file && URL.createObjectURL(file)) ||
                        image ||
                        "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
                    }
                />
                <Row>
                    <Form.Label
                        htmlFor="charityImageFile"
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
                        id="charityImageFile"
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
            <Form onSubmit={handleSubmit} className="form" id="charityUpdate">
                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Tên sự kiện"
                        name="charityName"
                        value={charityName}
                        onChange={(e) => setCharityName(e.target.value)}
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
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3 form-group">
                    <DatePicker
                        className="form-control"
                        placeholderText="Thời gian tổ chức"
                        selected={
                            new Date(
                                dateStart.substring(6, 11),
                                dateStart.substring(3, 5) - 1,
                                dateStart.substring(0, 2)
                            )
                        }
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => {
                            const resultDate =
                                moment(date).format("DD/MM/YYYY");
                            setDateStart(resultDate);
                        }}
                        required
                    />
                </Form.Group>

                <Form.Group as={Col} className="form-group">
                    <Form.Control
                        className="form-control"
                        as="textarea"
                        placeholder="Nội dung sự kiện"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{ height: "150px" }}
                        required
                    />
                </Form.Group>
            </Form>
        </>
    );
};

export default CharityUpdate;
