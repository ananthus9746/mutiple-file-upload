import React, { useState } from 'react';
import { Upload, Button, message, Progress } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

function FileUpload() {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [totalTime, setTotalTime] = useState(null);

  const props = {
    beforeUpload: (file) => {
      setFiles([...files, file]);
      return false; // Do not upload automatically
    },
    onChange: (info) => {
      if (info.file.status === 'uploading') {
        const percent = Math.round((info.file.percent || 0) * 100);
        setUploadProgress(percent);
      }
    },
  };

  const onUpload = async () => {
    if (files.length === 0) {
      message.error('No files selected');
      return;
    }

    const formData = new FormData();

    // Append all files to the formData with the correct field name
    files.forEach((file, index) => {
      formData.append('files', file); // Use 'files' as the field name
    });

    const startTime = new Date();

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(percent);
        },
      });

      const endTime = new Date();
      const totalMilliseconds = endTime - startTime;
      const totalSeconds = totalMilliseconds / 1000;

      setTotalTime(totalSeconds);

      message.success('Files uploaded successfully!');
    } catch (error) {
      console.error('Error uploading files:', error.message);
      message.error('Error uploading files. Please try again.');
    } finally {
      // Reset the files and progress after upload
      setFiles([]);
      setUploadProgress(0);
    }
  };

  return (
    <div className="App">
      <h1>File Upload with Progress</h1>
      <Upload {...props} showUploadList={false} multiple>
        <Button icon={<UploadOutlined />}>Select Files</Button>
      </Upload>
      {files.length > 0 && (
        <div>
          <p>Selected Files:</p>
          <ul>
            {l.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      {uploadProgress > 0 && <Progress percent={uploadProgress} status="active" />}
      <Button type="primary" onClick={onUpload}>
        Upload
      </Button>
      {totalTime && <p>Total Time: {totalTime} seconds</p>}
    </div>
  );
}

export default FileUpload;
