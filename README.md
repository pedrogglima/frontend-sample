# Frontend

Simple Authentication & CRUD webpage for frontend job's interview. The project was manly build with HTML, [Bootstrap](https://getbootstrap.com/) and [Typescript](https://www.typescriptlang.org/), and bundle with the help of [Webpack](https://webpack.js.org/). The project makes use of the API offered by REQ|RES to render fake data on the webpage. You can find more information about the API on their [page](https://reqres.in/).

### Installation

For the installation process is required to install the following programs:

```
Node.js >= 8.10
Npm >= 3.5.2
(Opcional) Version Control System: git
```

After install the requirements:

```
# On your terminal

git clone git://github.com/pedrogglima/frontend-sample

# Or in the github page on the option "Clone or Download"

# After downloading the repository, install the project's dependencies.
# Go to inside the directory frontend-sample and run on terminal

npm install

# After install, build the production output

npm run postbuild

# then start the server

npm run start:exp

# If on your terminal it shows the message "Ready", then the server is up running
# and you can access the app on localhost:8080

# P.s - I had trouble with Firefox CORS (Cross Origin Request Security) policy while
# running the app local due to requests made by the app to the API.
# One option is disable this policy on Firefox;
# A second option would be run the app on Chrome.

```

## Licenses and Copyright

Copyright (C) 2019 Pedro Gabriel Lima.
