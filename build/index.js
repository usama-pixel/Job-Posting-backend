import express from 'express';
import { AuthRoutes } from './routes/auth.js';
import { jobRoutes } from './routes/job.js';
import Cors from 'cors';
import bodyParser from 'body-parser';
import { BaseError } from './utils/ApiError.js';
const app = express();
app.use(Cors()); // may have to check if any cors error occurs
app.use(bodyParser.json());
const port = 3001;
app.use(AuthRoutes);
app.use(jobRoutes);
app.use((err, req, res, next) => {
    let httpCode = 500;
    if (err instanceof BaseError) {
        httpCode = err.httpCode;
    }
    else {
        console.log('not working');
    }
    res.status(httpCode);
    res.json({ msg: err.name, err });
});
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
//# sourceMappingURL=index.js.map