import * as Handlebars from '../../node_modules/handlebars/dist/handlebars.js';

export const main = Handlebars.compile(`
  <div class="container">
    <nav class="navbar navbar-light bg-light mb-3">
      <a class="navbar-brand" href="#">
        Frontend
      </a>
    </nav>
    <div class="app-alerts"></div>
    <div class="app-main"></div>
  </div>
`);

export const notFound = Handlebars.compile(`
  <div class="container-fluid">
    <div class="row">
      <h1>Error 404 - Page Not Found</h1>
    </div>
  </div>
`);

export const alert = Handlebars.compile(`
  <div class="alert alert-{{type}} alert-dismissible" role="alert">
    <button class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    {{message}}
  </div>
`);
