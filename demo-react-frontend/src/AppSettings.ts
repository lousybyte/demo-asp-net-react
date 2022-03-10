export const server = 'https://localhost:44361';

export const webAPIUrl = `${server}/api`;

export const authSettings = {
  domain: '',
  client_id: '',
  redirect_uri: window.location.origin + '/signin-callback',
  scope: '',
  audience: '',
};
