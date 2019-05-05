import * as Users from '../templates/users.ts';
import * as Shared from '../templates/shared.ts';

export const redirectTo = path => {
  return (window.location.hash = '#' + path);
};

export const render = (template, method, params) => {
  switch (template) {
    case 'users':
      if (method === 'login') {
        return Users.login();
      } else if (method == 'list') {
        // (missing) validate arguments from params
        const users = (params.users.list);
        const totalPages = params.users.totalPages;
        const url = params.url;

        return Users.list({ users, totalPages, url });
      } else if (method == 'edit') {
        // (missing) validate arguments from params
        const user = params.user;
        return Users.edit({ user });
      } else {
        // (missing) throw error
        console.log('argument method do not exist');
      }
      break;

    case 'shared':
      if (method === 'main') {
        // (missing) validate arguments from params
        const userAuth = params.userAuth;
        return Shared.main({ userAuth });
      } else if (method == 'alert') {
        // (missing) validate arguments from params
        const type = params.type;
        const message = params.message;
        return Shared.alert({ type, message });
      } else if (method == '404') {
        return Shared.notFound();
      } else if (method == 'loader') {
        return Shared.loading();
      } else {
        // (missing) throw error
        console.log('argument method do not exist');
      }
      break;

    default:
      // (missing) throw error
      console.log('argument template do not found');
  }
};
