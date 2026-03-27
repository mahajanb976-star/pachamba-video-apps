const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let users = [
  {username:"admin", password:"1234", role:"admin"},
  {username:"user", password:"1111", role:"user"}
];

let videos = [];

const storage = multer.diskStorage({
  destination:'uploads/',
  filename:(req,file,cb)=>{
    cb(null, Date.now()+file.originalname);
  }
});
const upload = multer({storage});

app.post('/login',(req,res)=>{
  const {username,password} = req.body;
  const user = users.find(u=>u.username===username && u.password===password);
  res.json({success:!!user, role:user?.role});
});

app.post('/upload', upload.single('video'), (req,res)=>{
  videos.push(req.file.filename);
  res.json({success:true});
});

app.get('/videos',(req,res)=>{
  res.json(videos);
});

app.use('/video', express.static('uploads'));

app.listen(3000);
