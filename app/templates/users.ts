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
    <div class="row">
      <div class="col-sm-1 col-md-2 col-lg-3"></div>
      <div class="col-sm-10 col-md-8 col-lg-6">
        <div class="card">
          <div class="card-header">
            Área de acesso
          </div>
          <div class="card-body">

            <form>
              <div class="form-group">
                <label for="login">Login</label>
                <input type="text" id="user_login" class="form-control" placeholder="Digite seu login">
              </div>
              <div class="form-group">
                <label for="senha">Senha</label>
                <input type="password" id="user_password" class="form-control" placeholder="Digite sua senha">
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
      <div class="col-sm-1 col-md-2 col-lg-3"></div>
    </div>
  </div>
`);

export const list = Handlebars.compile(`
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12">
        <h2>Lista de Usuários</h2>
        <div class="container">
          {{#if users}}
            {{#each users}}
              <div class="row" id="row-{{id}}">
                <hr class="w-100"/>
                <div class="col">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item pb-1 pt-2 border-0"><b>{{last_name}}</b></li>
                    <li class="list-group-item py-1 border-0"><b><small>{{first_name}}</small></b></li>
                  </ul>
                </div>
                <div class="btn-group">
                  <button class="btn btn-link p0 border-right edit" data-user="{{id}}">editar</button>
                  <button class="btn btn-link p0 delete" data-user="{{id}}">deletar</button>
                </div>
              </div>
            {{/each}}
              <div class="row">
                <hr class="w-100"/>
                <div class="col-sm-5 col-md-5 col-lg-5"></div>
                <div class="col-sm-7 col-md-7 col-lg-7">
                  <ul class="pagination">
                    {{#paginator 1 total_pages url}}
                      {{this}}
                    {{/paginator}}
                  </ul>
                </div>
              </div>
          {{else}}
            <div class="row">
              <hr class="w-100" />
              <h4>Usuários não encontrados.</h4>
            </div>
          {{/if}}
        </div>
      </div>
    </div>
  </div>
`);

export const edit = Handlebars.compile(`
  <div class="container">
    <div class="row">
      <div class="col-sm-1 col-md-2 col-lg-3"></div>
      <div class="col-sm-10 col-md-8 col-lg-6">
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
      <div class="col-sm-1 col-md-2 col-lg-3"></div>
    </div>
  </div>
`);
