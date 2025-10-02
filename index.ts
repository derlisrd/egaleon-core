import express from 'express'
import cors from 'cors'

import api from './src/routes/index.js';
const app = express()

app.use(cors())
app.use(express.json());


app.use(api)


const PORT = process.env.PORT || 4040
app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
  });
  



