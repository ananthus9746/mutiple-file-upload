import React from "react";
import style from "./UploadFile.module.css";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import carImage from "../../assets/images/car-rent 1.png";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

function FileUpload() {
  const props = {
    name: "file",
    multiple: true,
    action: "http://localhost:3001/upload",
    onChange: async (info) => {
      try {
        const { status } = info.file;
        console.log("status::",status)
        if (status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (status === "done") {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      } catch (error) {
        console.error("An error occurred during file upload:", error);
        // Handle the error, e.g., show an error message to the user
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  
  return (
    <div>
      <div className={style.upload_container}>
        <div className={style.file_container}>
          <p className={style.file}>Files</p>
          <div className={style.satatus}>
            <p>Status</p>
            <IoIosArrowDown size={12} />
          </div>
        </div>
        <div className={style.no_file}>
          <FaCheckCircle color=" rgb(48, 210, 20)" />
          No Files Uploaded
        </div>

        <div className={style.upload_div}>
          <div className={style.upload}>
            {/* <p className={style.upload_head}>Upload Car details to get Started</p> */}
            <br />
            {/* <img src={carImage} alt="" /> */}
            {/* <p>Select a file or drag and drop here</p> */}
            {/* <p className={style.upload_file_type}>JPG, PNG or PDF, file size no more than 10MB</p> */}

            <Dragger
              {...props}
              style={{ backgroundColor: "transparent", padding: "60px" }}
            >
              <p className={style.upload_head}>
                Upload Car details to get Started
              </p>

              <p className="ant-upload-drag-icon">
                <img src={carImage} alt="" className={style.carImage} />
              </p>
              <p>Select a file or drag and drop here</p>

              <p className={style.upload_file_type}>
                JPG, PNG or PDF, file size no more than 10MB
              </p>
            </Dragger>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
