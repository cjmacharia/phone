import express from 'express';
import bodyParser from 'body-parser';
import phoneRoutes from './routes'
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
phoneRoutes(app)

app.listen(3000, () =>
    console.log('app listening on port 3000!'),
);
export default app;