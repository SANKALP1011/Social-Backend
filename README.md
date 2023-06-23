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
- Kubernetes

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
## Kubernetes Cluster Deploymemt
   1. Check for any deployment that already exists with the following command
      ```
      kubectl get deployment
      ```

   2. Check for any service that already exists and is running with the help of of following command
      ```
      kubectl get svc
      ```
   3. Deploy and apply the changes to kubernetes cluster by using the deployment.yaml file with the the following command
      ```
      kubectl apply -f deployment.yaml
      ```
   4. Apply and push your service.yaml file for your kubernetes cluster with following command
      ```
      kubectl apply -f service.yaml
      ```
   5. Check whether your kubernetes service and deployment is up and running by the following command
      ```
      kubectl get deployments    (to check deployment status)
      kubectl get svc            (to check service status)

    6. Run your kubernetes service with the help of following command
       ```
       minikube service social-backend-service
       ```

## Folder Structure
 - Controller
   ```
   - facebook.controller.js
   - github.controller.js
   - google.controller.js
   - twitter.controller.js
   - passportStartegies.controller.js
   - protected.controller.js
   - statisticalAnalysis.controller.js
   - unprotected.controller.js
   - initial.controller.js
  
 - Routes
```
   - facebookAuth.router.js
   - googleAuth.router.js
   - twitterAuth.router.js
   - protectedRoutes.router.js
   - unProtectedRoutes.router.js
   - statisticalAnalysis.router.js
   - githubAuth.router.js
   - unProtectedRoutes.router.js
```   
  - Middleware
    ```
    - loggedIn.middleware.js (current , I am not using this middleware anywhere)
    ```
## Endpoints
 - Statistical Analysis (PROVIDE STATISTICAL ANALYSIS)
    ```
    AnalysisRouter.get("/getAnalysisData", performStatisticalAnalysis);
    ```
 - Google Oauth endpoint (PROVIDE GOOGLE AUTH)
   ```
   GoogleRouter.get("/google", googleControllert.googleAuth);
   GoogleRouter.get("/google/callback", googleControllert.googleAuthCallback);
   GoogleRouter.get("/google/logout", googleControllert.logout);
    ```
 - Twitter Oauth endpoint (PROVIDE TWITTER AUTH)
   ```
   TwitterRouter.get("/twitter", TwitterController.twitterAuth);
   TwitterRouter.get("/twitter/callback", TwitterController.twitterAuthCallback);
   ```
 - Github Oauth endpoint (PROVIDE GITHUB AUTH)
   ```
   GithubRouter.get("/github", GithubController.githubAuth);
   GithubRouter.get("/github/callback", GithubController.githubAuthCallback);
   ```
 - Facebook Oauth endpoint (PROVIDE FACEBOOK AUTH)
   ```
   FaceBookRouter.get("/facebook", FacebookController.facebookAuth);
   FaceBookRouter.get(
    "/facebook/callback",
   FacebookController.facebookAuthCallback
    );
   ```
 - Other such as protected and unprotected routes

## Analysis Endpoint Response from diffrent identity providers
[
{
    "googleUsers": 3,
    "twitterUsers": 2,
    "facebookUsers": 1,
    "githubUsers": 1,
    "averageTwitterFollowers": 42,
    "averageGithubUsers": 1,
    "totalGithubRepositories": 33,
    "totalDistinctLocations": 2
}
]


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

