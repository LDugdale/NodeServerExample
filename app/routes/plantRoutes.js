import * as plantController from '../controller/plantController';

export const plantRoutes = (router, express, passport) => {

    router.post( '/plants', plantController.addPlants);
    router.post( '/plants/search', passport.authenticate('jwt', {session: false}), plantController.searchPlants);

    return router;
}