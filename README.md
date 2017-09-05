# Science-gateway-inputs

## Overview

Science gateway inputs is an Angular application for generating user interfaces for arbitrary research codes.

## Local deployment

```
npm install
npm run start
```

## Azure deployment

```shell
APP_NAME=Science-Gateway-Inputs  # share the same app name for the url and resource group

az login
az webapp deployment user set --user-name <username> --password <password>
az group create --name $APP_NAME --location westeurope

az appservice plan create --name $APP_NAME --resource-group $APP_NAME --sku S1  # use S1 sku or higher is required for use of deployment "slots"
az webapp create --name $APP_NAME --resource-group $APP_NAME --plan $APP_NAME
az webapp config appsettings set --name $APP_NAME --resource-group $APP_NAME --settings PROJECT=./dist  # only copy "dist" files from the azure repository copy to azure wwwroot

# we rely on automated deployment from travis
```