import { AppDataSource } from "./models/data-source";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import kriteriaRouter from "./routes/KriteriaRoute";
import aksebilitasRouter from "./routes/AksebilitasiRoute";
import tempat_wisata from "./routes/TmpWisataRoute";
import user from './routes/UserRoute'
import login from './routes/LoginRoute'
import gambarDoc from './routes/GambarRoute'
// import rekomendasi from './routes/RekomendasiRoute'

AppDataSource.initialize().then(async () => {
  const app = express();
  const port = 3300;

  app.use(bodyParser.json());
  app.use(cors())

  app.use('/', kriteriaRouter)
  app.use('/', aksebilitasRouter)
  app.use('/', tempat_wisata)
  app.use('/', user)
  app.use('/', login)
  app.use('/', gambarDoc)
  // app.use('/', rekomendasi)

  app.listen(port, () => console.log(`http://localhost:${port}`));
})
.catch((error) => console.log(error));
