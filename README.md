
# Angular Material Tour of Heroes
Adaptation of the popular angular demo app [Tour of Heroes](https://angular.io/tutorial) to [Angular Material](https://material.angular.io/) and [Google Cloud Endpoints](https://cloud.google.com/endpoints/).

I love Google technologies and tech stack. Google docs and tutorials are great, specially the archi-popular Angular tutorial which includes the demo app [Tour of Heroes](https://angular.io/tutorial). However, I find myself spending hours to no end creating new projects from the scratch, as I have to integrate multiple pieces that not always play nicely together. Those pieces usually involve:
- Front End framework of choice (Angular + Angular Material)
- Backend storage (Google App Engine + Endpoints)
- Authentication (Firebase, which supports social sharing and email workflows for email verification and password recovery)

## [feedback](https://docs.google.com/forms/d/e/1FAIpQLSfTMycGQFr6HJWNiGQRU3d9vLyEt2OX8n_gdo_kvYr7IEqZnQ/viewform) | [demo](https://gae-boilerplate-203602.appspot.com)
Please help me improve AMToH by answering a few questions in this [survey](https://docs.google.com/forms/d/e/1FAIpQLSfTMycGQFr6HJWNiGQRU3d9vLyEt2OX8n_gdo_kvYr7IEqZnQ/viewform)

See the [demo](https://gae-boilerplate-203602.appspot.com).

![Screenshot](https://raw.githubusercontent.com/Miki-AG/md-tour-of-heroes/master/static/img/screenshot2.png)

This project utilizes:
- Angular 6
- Angular Material 6
- Backend in Google App Engine using REST Endpoints
- Firebase for authentication
- Gulp scripts to automate deployment in GAE

## Requirements
- Google Cloud SDK 200.0.0
- Node v8.9.4
- Npm 5.6.0
- Gulp 4.0.0-alpha.3
- Make sure to rename all files under src/environments (i.e. sample.environment.ts -> environment.ts). The reason for this is that .gitignore will exclude those files in order to avoid exposing sensitive attributes in the repo.

## Development server (no GAE)

- Run `ng serve` for a simple dev server. (it will use `ng build --configuration devmem`)
- API data calls will be intercepted and data will be served from a mock backend (app/services/hero-dev-backend.ts)

## Build and run GAE local

- Run `ng build --configuration devgae` to rebuild the /dist directory.
- Run `gulp run` to launch the app and GAE.
- Data will be pulled from the local GAE Datastore.

## Deploy on Google App Engine
- Build for prod
    `ng build --configuration production` [aot](https://angular.io/guide/aot-compiler) compilation + browser cache busting, etc...
- Make sure your Google account is setup locally
    `gcloud auth list`
- Make sure gcloud points to your project
    - List all projects in your account:
    `gcloud projects list`
    - You can check current project with:
    `gcloud config get-value project`
    - Set current project:
    `gcloud config set project <project-id>`
    - Use project ID, it must exists in your console (https://console.cloud.google.com), if it does not exists, create it beforehand.
- To deploy the app
    `gcloud app deploy`

## Environments


## Google Analytics
Google Analytics works out of the box. Just simply add your GA Tracking ID to your production environment file.



