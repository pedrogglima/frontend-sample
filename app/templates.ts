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

export const login = Handlebars.compile(`
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
              <button type="submit" class="btn btn-success btn-md btn-block">Entrar</button>
            </form>

          </div>
        </div>
      </div>
      <div class="col-sm-3 col-md-3 col-lg-4"></div>
    </div>
  </div>
`);

export const listUsers = Handlebars.compile(`
  <div class="container">
    <div class="row mt-5">
      <div class="col-sm-1 col-md-1 col-lg-1"></div>
      <div class="col-sm-9 col-md-9 col-lg-9">
        <h1>Lista de Usuários</h1>
        <div class="container">
          {{#if users.length}}
            {{#each users}}
              <hr />
              <div class="row">
                <ul class="user-info">
                  <li>{{first_name}}</li>
                  <li>{{last_name}}</li>
                  <li><button class="btn btn-link delete" data-user-id="{{id}}">
                        delete
                      </button>
                  </li>
                </ul>
              </div>

            {{/each}}
          {{else}}
            <div class="row">
              <hr />
              <h4>Não há usuários cadastrados.</h4>
            </div>
          {{/if}}
        </div>
      </div>
      <div class="col-sm-2 col-md-2 col-lg-2"></div>
    </div>
  </div>
`);

export const editUser = Handlebars.compile(`
  <div class="container">
    <div class="row mt-5">
      <div class="col-sm-2 col-md-2 col-lg-3"></div>
      <div class="col-sm-8 col-md-8 col-lg-6">
        <div class="card">
          <div class="card-header">
            Editar Usuário
          </div>
          <div class="card-body">

            <form>
              <input type="hidden" id="userId" name="userId" value="{{id}}">
              <div class="form-group">
                <label for="nome">Nome</label>
                <input type="text" class="form-control" value="{{first_name}}">
              </div>
              <div class="form-group">
                <label for="sobrenome">Sobrenome</label>
                <input type="text" class="form-control" value="{{last_name}}">
              </div>
              <button type="submit" class="btn btn-success btn-md btn-block">Salvar</button>
            </form>

          </div>
        </div>
      </div>
      <div class="col-sm-2 col-md-2 col-lg-2"></div>
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
