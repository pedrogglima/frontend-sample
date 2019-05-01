import * as Handlebars from '../../node_modules/handlebars/dist/handlebars.js';

export const main = Handlebars.compile(`
  <div class="single-page">
    <header class="bg-light border border-top-0 mb-3">
      <div class="container border border-top-0 border-bottom-0">
        <nav class="navbar navbar-light bg-light">
          <div class="container">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">
                Frontend
              </a>
            </div>
            {{#if userAuth}}
              <ul class="nav list-inline">
                <li class="list-inline-item pr-2 border-right"><a href="#users">Usuários</a></li>
                <li class="list-inline-item"><a href="#logoff">Sair</a></li>
              </ul>
            {{/if}}
          </div>
        </nav>
      </div>
    </header>

    <div class="container">
      <div class="app-alerts"></div>
      <div class="app-main mt-5"></div>
    </div>
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
