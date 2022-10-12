const express  = require('express');
const multer = require('multer');

const app = express();

const fileStorageEngine = multer.diskStorage({
  destination:(req, file, cb) =>{
    cb(null, "./images")
  }, 
  filename : (req, file, cb)=>{
    cb(null, Date.now() +"--"+ file.originalname)
  }
});

const upload = multer({storage: fileStorageEngine});

app.post("/single", upload.single("image"), (req, res) =>{
  console.log(req.file);
  res.send("single file uploaded successfully");
});

app.post("/multiple", upload.array("images",2), (req, res) => {
  console.log(req.file);
  res.send("multiple file uploaded successfully");

})


app.listen(8000, ()=>{
    console.log('listening on http://localhost:8000');
})