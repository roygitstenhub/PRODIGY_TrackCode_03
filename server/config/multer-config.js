import multer from "multer";

// Set up multer with memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


export default upload