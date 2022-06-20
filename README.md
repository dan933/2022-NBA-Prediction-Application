# 2022-NBA-Prediction-Application
NBA Prediction Application Fullstack Application API NodeJS Database Sql Server FE React
Usage: node app.js

## Deployment Instructions
### Architecture
Architecture Reference:
 1. FE: Front End 
    - Built in react with material ui
    - Written primarily in JavaScript
    - Compiles to HTML, CSS, JavaScript, Images
 2. API: Application Programming Interface 
    - Built in dotnet with entity framework
    - Written in C#
 3. DB: Database
    - MySQL database
    - Setup file uses T-SQL

### Main Deployment Process
Deployment is primarily via automated processes.

To deploy changes, push changes to Main branch of github repository: [NBA-App Repository](https://github.com/dan933/2022-NBA-Prediction-Application)
Upon changes to the main branch, github actions will trigger the processes defined in [Back End Deployment YAML](https://github.com/dan933/2022-NBA-Prediction-Application/blob/main/API-azure-pipelines.yml) and [Front End Deployment YAML](https://github.com/dan933/2022-NBA-Prediction-Application/blob/main/FE-azure-pipelines.yml).

This runs the Azure pipelines within the [Azure Devops Organisation](https://dev.azure.com/101347494/Nba%20Project%20-%20Team%20West) for the project:
![Pipelines](https://github.com/dan933/2022-NBA-Prediction-Application/blob/release-docs/docs/pipelines.png?raw=true)

This creates the files to be deployed.

The Azure Release pipelines are then automatically triggered:
![Releases](https://github.com/dan933/2022-NBA-Prediction-Application/blob/release-docs/docs/releases.png?raw=true)

This deploys the created files to the staging environment automatically.


The Staging Front-End server is:
[https://nba-app-staging.azurewebsites.net/](https://nba-app-staging.azurewebsites.net/)

The Staging API server is:
[https://nba-api-one-staging.azurewebsites.net/](https://nba-api-one-staging.azurewebsites.net/)

Administration for these servers is via [Eve Joyce](mailto:103681990@student.swin.edu.au)


The automatic release pipeline then waits for approval from assigned parties to deploy to the production environment:
![Approval](https://github.com/dan933/2022-NBA-Prediction-Application/blob/release-docs/docs/approval.png?raw=true)

This allows for testing to occur in an environment similar to production before altering the production environment.


The Production Front-End server is:
[https://nba-app.azurewebsites.net/](https://nba-app.azurewebsites.net/)

The Production API server is:
[https://nba-api-one.azurewebsites.net/](https://nba-api-one.azurewebsites.net/)

Administration for these servers is via [Daniel Albert](mailto:101347494@student.swin.edu.au)


Note that the above automatic pipelines occur for two components of the build:
 1. FE: Front End
 2. API: Application Programming Interface


To deploy changes to 3. DB: Database, manually run the altered setup script on the "NBA" database on the appropriate SQL Server:

Staging: nba-instance-staging.database.windows.net

Administration for this server is via [Eve Joyce](mailto:103681990@student.swin.edu.au)

Production: nba-instance.database.windows.net TODO:Check with Dan

Administration for this server is via [Daniel Albert](mailto:101347494@student.swin.edu.au)


Access to these environments must be authorised in the networking section of the server's settings in the Azure portal, e.g.:
![SQL Connection Firewall](https://github.com/dan933/2022-NBA-Prediction-Application/blob/release-docs/docs/SQL-connection-firewall.png?raw=true)

### Manual Deployment (FE/API)
Required Software:
 - Dotnet Version 6.0
 - npm package manager


To manually create deployment artifacts, **environment variables** must first be set.

Front-End:

Set environment variables within the appropriate .env file:

nba-front-end/.env.staging, nba-front-end/.env.production

API:

set connection strings in nba-api-dotnet/program.cs (lines 131-149) and nba-api-dotnet/dbContext.cs (lines 25-42)

Connection strings should be setup within nba-api-dotnet/appsettings.json


Next, run appropriate **commands to create deployment artifacts**

Front-End:

With npm installed, from a command line within the nba-front-end folder 

run:
`npm install`
Then for staging:
`npm run build:staging`
Or for production:
`npm run build`

This will produce a deployment bundle in /nba-front-end/build which can then be uploaded to a web-hosting service.

API:

With dotnet 6 installed, from a command line within the nba-api-dotnet folder 

run:
`dotnet build --configuration Release`
`dotnet publish`

This will produce a deployment bundle in /nba-api-dotnet/bin/Release which can then be run on a web app hosting service.
