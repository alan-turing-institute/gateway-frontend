# science-gateway-inputs

## Overview

Science gateway inputs is an Angular application for generating user interfaces for arbitrary research codes.

## Local deployment

```shell
npm install
npm run start
```

## Azure deployment

Commits to particular GitHub branches will trigger deployment to Azure via Travis.

To spin up an Azure Web App service, use the following (this is a once off operation):

```shell
APP_NAME=Science-Gateway-Inputs  # share the same app name for the url and resource group

az login
az webapp deployment user set --user-name <user-name> --password <password>
az group create --name $APP_NAME --location westeurope

az appservice plan create --name $APP_NAME --resource-group $APP_NAME --sku S1  # use S1 sku or higher is required for use of deployment "slots"
az webapp create --name $APP_NAME --resource-group $APP_NAME --plan $APP_NAME
az webapp config appsettings set --name $APP_NAME --resource-group $APP_NAME --settings PROJECT=./dist  # only copy "dist" files from the azure repository copy to azure wwwroot
```
The `master` branch will deploy to a development "slot" on Azure via the following branch-specific `.travis.yml` settings:

```yaml
deploy:
  - provider: azure_web_apps
    verbose: true
    skip_cleanup: true
 	on: master
    slot: science-gateway-inputs-dev
```

The `staging` branch will deploy to a staging "slot" on Azure via the following branch-specific `.travis.yml` settings:

```yaml
deploy:
  - provider: azure_web_apps
    verbose: true
    skip_cleanup: true
 	on: staging
    slot: science-gateway-inputs-staging
```

Hence, multiple URLs are available for testing:

* A production version: [science-gateway-inputs.azurewebsites.net](science-gateway-inputs.azurewebsites.net)
* A staging version: [science-gateway-inputs-staging.azurewebsites.net](science-gateway-inputs-staging.azurewebsites.net)
  * Note: Periodic branching of compatible stable commits from front/middle/backends into `vx.y.z` release branches
* A development version: [science-gateway-inputs-dev.azurewebsites.net](science-gateway-inputs-dev.azurewebsites.net)

Note: Travis uses `dpl` internally. Hence, a manual deployment to the development Azure slot could be triggered using

```shell
# example deployment to development "slot"
sudo gem install dpl
export AZURE_WA_PASSWORD=<password>
export AZURE_WA_USERNAME=<user-name>
export AZURE_WA_SITE=science-gateway-inputs
npm install
npm run build
# no need to commit "node_modules" to Azure (we only really want --skip_cleanup to commit "dist")
rm -rf node_modules  
dpl --provider=AzureWebApps --verbose --skip_cleanup --slot science-gateway-inputs-dev
```

