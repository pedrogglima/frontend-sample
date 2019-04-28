import * as Users from '../templates/users.ts';
import * as Shared from '../templates/shared.ts';


export const template = (template, method, params) => {

  switch (template) {
    case 'users':
      if (method === 'login') {
        return Users.login();

      } else if (method == 'list') {
        // (missing) validate arguments from params
        const users = params.users;
        const url = params.url;
        return Users.list({users, url});

      } else if (method == 'edit'){
        // (missing) validate arguments from params
        const user = params.user.data;
        return Users.edit({user});

      } else {
        // (missing) throw error
        console.log('argument method do not exist');
      }
      break;

    case 'shared':
      if (method === 'main') {
        return Shared.main();

      } else if (method == 'alert') {
        // (missing) validate arguments from params
        const type = params.type;
        const message = params.message;
        return Shared.alert({type, message});

      } else if (method == '404'){
        return Shared.notFound();

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
