import * as userController from '../controller/userController';

export const userRoutes = (router, express, passport) => {

    router.post( '/user', userController.createUser);
    router.post('/user/login', userController.login); 

    return router;
}