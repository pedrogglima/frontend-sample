import * as Handlebars from '../../node_modules/handlebars/dist/handlebars.js';

export const main = Handlebars.compile(`
  <div>
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
                <li class="list-inline-item pr-2 border-right"><a href="#users?delay=2">Usuários</a></li>
                <li class="list-inline-item"><a href="#logout">Sair</a></li>
              </ul>
            {{/if}}
          </div>
        </nav>
      </div>
    </header>

    <div class="container">
      <div class="app-overlay"></div>
      <div class="app-loading"></div>
      <div class="app-alerts"></div>
      <div class="app-main mt-5"></div>
    </div>
  </div>
`);

export const notFound = Handlebars.compile(`
  <div class="not-found-container">
    <div>
      <h1>ERROR 404</h1>
      <span class="not-found-message">
        A página que você procura não foi encontrada, <a href="#/">voltar.</a>
      </span>
      </p>
    </div>
  </div>
`);

export const loading = Handlebars.compile(`
  <div class="loading-bar">
    <div class="spinner-border loading-bar-border-size" role="status">
      <span class="sr-only">Loading...</span>
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
