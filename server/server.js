const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

// Set up Multer to handle file uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Define the upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    console.log("upload:")
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const filePath = '/uploads/' + req.file.filename;
  res.json({ message: 'File uploaded successfully', filePath });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
