import dotenv from 'dotenv';
import { app } from './app.js';

dotenv.config({ path: './.env'})

app.listen(8000, () => {
    console.log("server listening on PORT:", 8000);
})