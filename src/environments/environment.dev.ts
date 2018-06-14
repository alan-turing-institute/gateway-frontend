import { Environment } from './environment.interface';

export const environment: Environment = {
    target: 'dev',
    // apiRoot: 'http://0.0.0.0:8080/',
    apiRoot: 'http://localhost:5000/',
    authRoot: 'http://localhost:6000/',
    // apiRoot: 'https://science-gateway-middleware-dev.azurewebsites.net/api/',
    production: false
}
