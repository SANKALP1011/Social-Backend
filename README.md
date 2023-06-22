# Social Backend

This repository contains a Node.js API that integrates multiple identity providers, such as GitHub, Twitter, Facebook, and Google, using OAuth authentication process with the help of Passport.js OAuth strategies.

## Tech Stack

The project utilizes the following technologies:

- Node.js
- MongoDB
- Express.js
- Passport.js

## Prerequisites

- Node.js 
- MongoDB
- Docker
- Passport OAuth

## Container

 Docker ( I am using docker for the containerisation of my application )
  - Build
    
    ```
    docker build -t socialbackend .
    ```
  - Run the container
    ```
     docker run -p 3002:3002 socialbackend
    ```

## Folder Structure
 - Controller
   ```
   - facebook.controller.js
   - github.controller.js
   - google.controller.js
   - twitter.controller.js
   - passport.controller.js
   - protected.controller.js
   - statisticalAnalysis.controller.js
  
 - Routes
```
   - facebookAuth.router.js
   - googleAuth.router.js
   - twitterAuth.router.js
   - protectedRoutes.router.js
   - unProtectedRoutes.router.js
   - statisticalAnalysis.router.js
   - githubAuth.router.js
```   
  - Middleware
    ```
    - loggedIn.middleware.js (current , I am not using this middleware anywhere)
    ```
## Endpoints
 - Statistical Analysis
    ```
    AnalysisRouter.get("/getAnalysisData", performStatisticalAnalysis);
    ```
 - Google Oauth endpoint
   ```
   GoogleRouter.get("/google", googleControllert.googleAuth);
   GoogleRouter.get("/google/callback", googleControllert.googleAuthCallback);
   GoogleRouter.get("/google/logout", googleControllert.logout);
    ```
 - Twitter Oauth endpoint
   ```
   TwitterRouter.get("/twitter", TwitterController.twitterAuth);
   TwitterRouter.get("/twitter/callback", TwitterController.twitterAuthCallback);
   ```
 - Github Oauth endpoint
   ```
   GithubRouter.get("/github", GithubController.githubAuth);
   GithubRouter.get("/github/callback", GithubController.githubAuthCallback);
   ```
 - Facebook Oauth endpoint
   ```
   FaceBookRouter.get("/facebook", FacebookController.facebookAuth);
   FaceBookRouter.get(
    "/facebook/callback",
   FacebookController.facebookAuthCallback
    );
   ```
 - Other such as protected and unprotected routes

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/SANKALP1011/Social-Backend.git

2. Replace the mongodb uri string with your own uri string , provided by your mongodb cluster.
3. Passport.js oAuth startergies uses client id , client secret and callBack url for the authentication so replace those values with your own access keys provided by the diffrent identity providers. I am using four identity providers which are google , twitter , github and Facebook.

```
module.exports = {
  googleKey: {
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: "http://localhost:3002/auth/google/callback",
  },
  twitterKey: {
    consumerKey: TWITTER_CLIENT_ID,
    consumerSecret: TWIITTER_CLIENT_SECRET,
    callbackURL: "http://localhost:3002/auth/twitter/callback",
  },
  faceBookKey: {
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3002/auth/facebook/callback",
  },
  githubKey: {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3002/auth/github/callback",
  },
};
```
Replace the key here with your key.

4. Run the application on your machine with the help of
   
   ```
   nodemon app.js
   ```
5. Build the docker container with the help of following command
   ```
     docker build -t socialBackend .
   ```
6. Run the docker image with the help of the following command ( server port is 3002 )

   ```
    docker run -p 3002:3002 socialbackend
    ```
7. Get the docker image at the following url [ https://hub.docker.com/repository/docker/sankalp1011/socialbackend/general ]( Docker )

