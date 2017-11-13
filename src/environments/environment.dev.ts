import { Environment } from './environment.interface';

export const environment: Environment = {
    target: 'dev',
    // apiRoot: 'http://localhost:5000/api/',
    apiRoot: 'https://science-gateway-middleware-dev.azurewebsites.net/api/',
    production: false
}
