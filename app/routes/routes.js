import { userRoutes } from './userRoutes';
import { plantRoutes } from './plantRoutes';
import { userPlantRoutes } from './userPlantRoutes';

export const routes = (app, express, passport) => {

    const router = express.Router();

    app.use(userRoutes(router, express, passport));
    app.use(plantRoutes(router, express, passport));
    app.use(userPlantRoutes(router, express, passport));

    return router;
}