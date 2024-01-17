import express from 'express';
import chipherRouter from "./routes/chipher";
import cors from 'cors';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/chipher', chipherRouter);

app.listen(port, () => {
  console.log('we online port: ' + port);
});