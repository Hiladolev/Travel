import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "./images",
  // destination(req: any, file: any, callback: any) {
  //   console.log("req", req, file);
  //   callback(null, "images");
  // },
  filename: async (req: any, file: any, callback: any) => {
    console.log("file", file);
    const vacationId = req.params.id;
    const originalFileName = file.originalname.split(".")[0];
    const extname = path.extname(file.originalname);
    const fileName = `${vacationId}_${originalFileName}${extname}`;
    console.log("filename", fileName);
    callback(null, fileName);
  },
});

export default storage;
