import express from 'express';
import bodyParser from "body-parser";
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});