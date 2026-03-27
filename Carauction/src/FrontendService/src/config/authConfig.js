export const oidcConfig = {
  authority: 'http://localhost:5000',
  client_id: 'frontend',
  client_secret: 'secret',
  redirect_uri: 'http://localhost:3000/signin-callback',
  post_logout_redirect_uri: 'http://localhost:3000/',
  response_type: 'code',
  scope: 'openid profile auctionApp',
  automaticSilentRenew: true,
  loadUserInfo: true,
};
