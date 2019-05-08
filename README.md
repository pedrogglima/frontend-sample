Frontend
========

Simple Authentication & CRUD webpage for frontend job's interview. The project was manly build with HTML, [Bootstrap](https://getbootstrap.com/) and [Typescript](https://www.typescriptlang.org/), and bundle with the help of [Webpack](https://webpack.js.org/). The project makes use of the API https://reqres.in/ to render fake data on the webpage. You can find more information about the API on their page.

## How to use

You can run the project throughout the installation process or access the link where the project has been free hosted: [Frontend](https://rocky-castle-82785.herokuapp.com/) - it may take some time (~30 seconds) to load the page in the first time because of the Host's policy for free service. It's important to highlight that the project is dependent on the API to render pages that demand data, so those pages won't work if the API is offline. You can check whether the API is offline on their [page](https://reqres.in/).

### Installation process

For the installation process is required to be install the following programs:
```
Node.js >= 8.10
Npm >= 3.5.2
(Opcional) Version Control System: git
```

After install the requirements:

```
# Download the project on your terminal

git clone git://github.com/pedrogglima/frontend-sample

# Or in the github page on the option "Clone or Download"

# After download, you need to install the project's dependencies.
# Go to inside the directory frontend-sample and run on terminal:

npm install

# After install, build the production output with

npm run postbuild

# then start the server with

npm run start:exp

# If on your console it shows the message "Ready", then the server is up running
# and you can access the app on localhost:8080

# P.s - I had trouble with Firefox CORS (Cross Origin Request Security) policy while
# running the app local due to requests made by the app to the API.
# One option is disable this policy on Firefox;
# A second option would be run the app on Chrome.

```
## Licenses and Copyright

Copyright (C) 2019 Pedro Gabriel Lima.  
