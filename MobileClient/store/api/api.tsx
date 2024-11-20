// android emulator --> localhost web server
export const PREFIX = 'http://10.0.2.2:5044/api';

export const API = {
  auth: {
    login: `${PREFIX}/auth/login`,
    registration: `${PREFIX}/auth/register`,
  },
};
