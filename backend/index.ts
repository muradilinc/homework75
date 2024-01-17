import express from 'express';
import chipherRouter from "./routes/chipher";
const app = express();
const port = 8000;

app.use(express.json());

app.use('/chipher', chipherRouter);

app.listen(port, () => {
  console.log('we online port: ' + port);
});