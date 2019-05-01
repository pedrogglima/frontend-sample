import * as User from '../model/user.ts';
import * as UserHelpers from '../helpers/users.ts';
import * as SharedHelpers from '../helpers/shared.ts';
import * as Render from '../lib/render.ts';
//import * as Fixtures from '../test/fixtures.ts';
import { hasSession, getSession, setSession, deleteSession } from '../lib/session.ts';

// page login
export const login = async () => {
  try {
    if (!await hasSession()) {
      UserHelpers.session();
    } else {
      Render.redirect('users');
    }
  } catch (err) {
    throw err;
  }
};

// logout
export const logout = async () => {
  try {
    if (await hasSession()) {
      SharedHelpers.startLoading();
      await User.logout(await getSession());
      SharedHelpers.stopLoading();

      await deleteSession();

      Render.redirect('login');
    }
  } catch (err) {
    throw err;
  }
};

// page index
export const index = async (page = '1') => {
  try {
    if (!await hasSession()) {
      Render.redirect('login');
    } else {
      SharedHelpers.startLoading();
      const users = await User.find_by_page(page, await getSession());
      SharedHelpers.stopLoading();

      //const users = Fixtures.users();
      UserHelpers.listUsers(users);
    }
  } catch (err) {
    throw err;
  }
};

// page edit
export const edit = async (id) => {
  try {
    if (!await hasSession()) {
      Render.redirect('login');
    } else {
      SharedHelpers.startLoading();
      const user = await User.find_by_id(id, await getSession());
      SharedHelpers.stopLoading();

      //const user = Fixtures.user();
      UserHelpers.editUser(user);
    }
  } catch (err) {
    throw err;
  }
};
