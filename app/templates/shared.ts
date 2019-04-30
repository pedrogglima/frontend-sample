import * as Handlebars from '../../node_modules/handlebars/dist/handlebars.js';

export const main = Handlebars.compile(`
  <div class="container single-page">
    <nav class="navbar navbar-light bg-light mb-3">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">
            Frontend
          </a>
        </div>
        <ul class="nav list-inline">
          <li class="list-inline-item pr-2 border-right"><a href="#users">Usuários</a></li> 
          <li class="list-inline-item"><a href="#/">Sair</a></li>
        </ul>
      </div>
    </nav>
    <div class="app-alerts"></div>
    <div class="app-main"></div>
  </div>
`);

export const notFound = Handlebars.compile(`
  <div class="container-fluid page-not-found">
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
