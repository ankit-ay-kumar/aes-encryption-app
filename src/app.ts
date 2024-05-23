import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
