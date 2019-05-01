import * as User from '../model/user.ts';
import * as UserHelpers from '../helpers/users.ts';
import * as Render from '../lib/render.ts';
import * as Fixtures from '../test/fixtures.ts';
import { hasSession, getSession, setSession, deleteSession } from '../lib/utils.ts';

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
      await User.logout(await getSession());
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
      const users = await User.find_by_page(page, await getSession());
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
      const user = await User.find_by_id(id, await getSession());
      //const user = Fixtures.user();
      UserHelpers.editUser(user);
    }
  } catch (err) {
    throw err;
  }
};
