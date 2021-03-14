import { httpService } from './http.service';
const AUTH_URL = 'auth/';

export const userService = {
    login,
    signUp
  };

  async function login(user) {
      try {
        const loggedInUser = await httpService.post(AUTH_URL + 'login', user);
        return loggedInUser;
      } catch(err) {
        console.log('User cannot login: ',err);
      }
  }

  async function signUp(user) {
      try {
        const savedUser = await httpService.post(AUTH_URL + 'signup', user);
        return savedUser;
      } catch(err) {
        console.log('User cannot signUp: ',err);
      }
  }