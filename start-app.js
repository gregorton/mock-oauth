const { init } = require('api-quick');
const { OAuth2Server } = require('oauth2-mock-server');


console.log("HELLO!");

let server;

function dateEndpoint() {
    return {date: new Date().toUTCString()};
};

async function startOauth() {

  server = new OAuth2Server();
  
  // Generate a new RSA key and add it to the keystore
  await server.issuer.keys.generateRSA();
  
  // Start the server
  await server.start(8082, 'localhost');
  console.log('Issuer URL:', server.issuer.url); // -> http://localhost:8080
}

async function stopOapth(){
  await server.stop();
}

function startMockOauth(){
  var api = require('api-quick').init(8081);

  var endpoints = {};
  endpoints.date = dateEndpoint;
  endpoints.startoauth =startOauth;
  endpoints.stopoauth =startOauth;
  
  api.addEndpoints(endpoints);
}

startMockOauth();
