import * as Handlebars from '../node_modules/handlebars/dist/handlebars.js';

export const main = Handlebars.compile(`
  <div class="container">
    <h1>App - sample</h1>
    <div class="app-alerts"></div>
    <div class="app-main"></div>
  </div>
`);

export const welcome = Handlebars.compile(`
  <div class="jumbotron">
    <h1>Bem vindo!</h1>
      <p>App desenvolvido para entrevistas front-end!</p>
      <small>by Pedro Gabriel Lima</small>
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
