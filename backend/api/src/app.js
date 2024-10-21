import express from "express";
import cors from 'cors'
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const port = 5000;


// simple get
app.get('/', async (_, res) => {   
    res.json("{data: {data: test}}");
});


// checks server port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
