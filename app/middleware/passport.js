
import CONFIG from '../config/config';
import { to } from '../services/controllerService';
import { authUser } from '../services/userService';

const passportJWT = require('passport-jwt');
const ExtractJwt = require('passport-jwt').ExtractJwt;

const JWTStrategy = passportJWT.Strategy;
const LocalStrategy = require('passport-local').Strategy;


export const strategies = (passport) => {

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {

    let error, user;

    [error, user] = await to(authUser(email, password));

    if (error){
      return done(error.message);
    }

    return done(null, user);
    
  }));
  
  passport.use(new JWTStrategy ({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: CONFIG.jwt_encryption,
    },
    (jwtPayload, done) => {

      if (jwtPayload.expires > Date.now()) {
        return done('jwt expired');
      }
  
      return done(null, jwtPayload);
    }
  ));

  return passport;
}