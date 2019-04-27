import * as Handlebars from '../node_modules/handlebars/dist/handlebars.js';

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

export const welcome = Handlebars.compile(`
  <div class="container">
    <div class="row mt-5">
      <div class="col-sm-3 col-md-3 col-lg-4"></div>
      <div class="col-sm-6 col-md-6 col-lg-4">
        <div class="card">
          <div class="card-header">
            Área de acesso
          </div>
          <div class="card-body">

          <form>
            <div class="form-group">
              <label for="login">Login</label>
              <input type="text" class="form-control" placeholder="Digite seu login">
            </div>
            <div class="form-group">
              <label for="senha">Senha</label>
              <input type="password" class="form-control" placeholder="Digite sua senha">
            </div>
            <div class="form-check mb-3">
              <input type="checkbox" class="form-check-input">
              <label class="form-check-label" for="lembreme">Lembre-me</label>
            </div>
            <button type="submit" class="btn btn-success btn-md btn-block">Submit</button>
          </form>

          </div>
        </div>
      </div>
      <div class="col-sm-3 col-md-3 col-lg-4"></div>
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
