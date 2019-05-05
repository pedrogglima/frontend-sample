import { fetchJSON, fetchTXT } from '../lib/utils.ts';

interface UserArguments {
  userId?: number;
  userLogin?: string;
  userPassword?: string;
  userFirstName?: string;
  userLastName?: string;
  userUrlAvatar?: string;
  userToken?: string;
}

interface UsersArguments {
  userPage: number;
  userPerPage: number;
  userTotal: number;
  userTotalPages: number;
  userList: User[];
}

class Users {
  public page: number;
  public perPage: number;
  public total: number;
  public totalPages: number;
  public list: User[];

  public constructor(obj: UsersArguments) {
    this.page = obj.userPage;
    this.perPage = obj.userPerPage;
    this.total = obj.userTotal;
    this.totalPages = obj.userTotalPages;
    this.list = obj.userList;
  }
}

export class User {
  public id: number;
  public login: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public urlAvatar: string;
  public token: string;

  public constructor(obj: UserArguments) {
    this.id = (obj && obj.userId) || 999;
    this.login = (obj && obj.userLogin) || '';
    this.password = (obj && obj.userPassword) || '';
    this.firstName = (obj && obj.userFirstName) || '';
    this.lastName = (obj && obj.userLastName) || '';
    this.urlAvatar = (obj && obj.userUrlAvatar) || '';
    this.token = (obj && obj.userToken) || '';
  }

  public static async login(email, password): Promise<User> {
    try {
      const url = 'https://reqres.in/api/login?delay=2';
      const resqBody = JSON.stringify({
        email: email,
        password: password,
      });

      const resp = await fetchJSON(url, {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
        body: resqBody,
      });

      return new User({
        userLogin: email,
        userPassword: password,
        userToken: resp.token,
      });
    } catch (err) {
      throw err;
    }
  }

  public static async logout(token): Promise<void> {
    try {
      const url = 'https://reqres.in/api/logout?delay=2';
      await fetchJSON(url, {
        method: 'POST',
        headers: new Headers({
          Authorization: 'Bearer ' + token,
        }),
      });
    } catch (err) {
      throw err;
    }
  }

  public static async findByPage(pageNumber: string = '1', token): Promise<Users> {
    try {
      const url = `https://reqres.in/api/users?page=${pageNumber}&delay=2`;
      const resp = await fetchJSON(url, {
        method: 'GET',
        headers: new Headers({
          Authorization: 'Bearer ' + token,
        }),
      });

      const userList = [];
      for (let i = 0; i < resp.data.length; i++) {
        const user = resp.data[i];
        userList.push(
          new User({
            userId: user.id,
            userFirstName: user.first_name,
            userLastName: user.last_name,
            userUrlAvatar: user.avatar,
          })
        );
      }

      return new Users({
        userPage: resp.page,
        userPerPage: resp.per_page,
        userTotal: resp.total,
        userTotalPages: resp.total_pages,
        userList: userList,
      });
    } catch (err) {
      throw err;
    }
  }

  public static async findById(id, token): Promise<User> {
    try {
      const url = `https://reqres.in/api/users/${id}?delay=2`;
      const resp = await fetchJSON(url, {
        method: 'GET',
        headers: new Headers({
          Authorization: 'Bearer ' + token,
        }),
      });

      return new User({
        userId: resp.data.id,
        userFirstName: resp.data.first_name,
        userLastName: resp.data.last_name,
        userUrlAvatar: resp.data.avatar,
      });
    } catch (err) {
      throw err;
    }
  }

  public static async update(id, nome, sobrenome, token): Promise<void> {
    try {
      const url = `https://reqres.in/api/users/${id}?delay=2`;
      const resqBody = JSON.stringify({
        first_name: nome,
        last_name: sobrenome,
      });
      await fetchJSON(url, {
        method: 'PUT',
        headers: new Headers({
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
        body: resqBody,
      });
    } catch (err) {
      throw err;
    }
  }

  public static async deleteById(id, token): Promise<void> {
    try {
      const url = `https://reqres.in/api/users/${id}?delay=2`;
      await fetchTXT(url, {
        method: 'DELETE',
        headers: new Headers({
          Authorization: 'Bearer ' + token,
        }),
      });
    } catch (err) {
      throw err;
    }
  }

  public getToken(): string {
    return this.token;
  }
}
