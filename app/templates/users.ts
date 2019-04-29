import * as Handlebars from '../../node_modules/handlebars/dist/handlebars.js';

// handle paginatons for simple cases (few pages, etc.)
Handlebars.registerHelper('paginator', (from, to, url, block) => {
    let accum = '';
    let pageNumber = '';

    for(let i = from; i <= to; ++i) {
        pageNumber = block.fn(i).trim();
        accum += ['<li class="page-item"><a class="page-link" href="', url,
                    pageNumber, '">', pageNumber, '</a></li>'].join('');
    }
    return accum;
});

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

export const list = Handlebars.compile(`
  <div class="container">
    <div class="row mt-5">
      <div class="col-sm-1 col-md-1 col-lg-1"></div>
      <div class="col-sm-9 col-md-9 col-lg-9">
        <h1>Lista de Usuários</h1>
        <div class="container">
          {{#if users}}
            {{#each users}}
              <div class="row" id="row-{{id}}">
                <hr class="w-100"/>
                <ul class="user-info">
                  <li>{{first_name}}</li>
                  <li>{{last_name}}</li>
                  <li><button class="btn btn-link delete" data-user="{{id}}">delete</button>
                  </li>
                </ul>
              </div>
            {{/each}}

            <ul class="pagination">
              {{#paginator 1 total_pages url}}
                {{this}}
              {{/paginator}}
            </ul>

          {{else}}
            <div class="row">
              <hr />
              <h4>Usuários não encontrados.</h4>
            </div>
          {{/if}}
        </div>
      </div>
      <div class="col-sm-2 col-md-2 col-lg-2"></div>
    </div>
  </div>
`);

export const edit = Handlebars.compile(`
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
              <input type="hidden" id="user_id" name="userId" value="{{user.id}}">
              <div class="form-group">
                <label for="nome">Nome</label>
                <input type="text" id="user_nome" class="form-control" value="{{user.first_name}}">
              </div>
              <div class="form-group">
                <label for="sobrenome">Sobrenome</label>
                <input type="text" id="user_sobrenome" class="form-control" value="{{user.last_name}}">
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
