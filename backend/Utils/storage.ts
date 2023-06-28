import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req: any, file: any, callback: any) {
    callback(null, "images");
  },
  filename: async (req: any, file: any, callback: any) => {
    const vacationId = Date.now();
    const originalFileName = file.originalname.split(".")[0];
    const extname = path.extname(file.originalname);
    const fileName = `${vacationId}_${originalFileName}${extname}`;
    callback(null, fileName);
  },
});

export default storage;
