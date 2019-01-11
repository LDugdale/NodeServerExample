import * as userPlantController from '../controller/userPlantController';

export const userPlantRoutes = (router, express, passport) => {

    router.post( '/userplant', passport.authenticate('jwt', {session: false}), userPlantController.addUserPlant);
    router.get( '/userplant', passport.authenticate('jwt', {session: false}), userPlantController.getUserPlants);
    router.get( '/userplant/plant', passport.authenticate('jwt', {session: false}), userPlantController.getUserPlant);
    router.post( '/userplant/plant/image', passport.authenticate('jwt', {session: false}), userPlantController.uploadUserPlantImage);


    return router;
}