import express from 'express';
import { AuthRoutes } from './routes/auth.js';
import Cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
app.use(Cors()); // may have to check if any cors error occurs
app.use(bodyParser.json());
const port = 3001;
app.use(AuthRoutes);
app.use((err, req, res, next) => {
    res.json({ msg: 'An error occured', err });
});
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
//# sourceMappingURL=index.js.map