import { fetchJSON, fetchTXT } from '../lib/request.ts';

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

interface UserArguments {
  userId?: number;
  userLogin?: string;
  userPassword?: string;
  userFirstName?: string;
  userLastName?: string;
  userUrlAvatar?: string;
  userToken?: string;
}

export class User {
  public static urlApi: string = 'https://reqres.in/api';
  public static delayApi: string = 'delay=2';

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

  public static async login(email, password) {
    try {
      const url = this.urlApi + '/login?' + this.delayApi;
      const resp = await fetchJSON(
        url,
        'POST',
        JSON.stringify({
          email: email,
          password: password,
        })
      );

      return new User({
        userLogin: email,
        userPassword: password,
        userToken: resp.token,
      });
    } catch (err) {
      throw err;
    }
  }

  public static async logout() {
    try {
      const url = this.urlApi + '/logout?' + this.delayApi;
      await fetchJSON(url, 'POST');
    } catch (err) {
      throw err;
    }
  }

  public static async findByPage(pageNumber = '1'): Promise<Users> {
    try {
      const url = this.urlApi + `/users?page=${pageNumber}&` + this.delayApi;
      const resp = await fetchJSON(url);

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

  public static async findById(id): Promise<User> {
    try {
      const url = this.urlApi + `/users/${id}?` + this.delayApi;
      const resp = await fetchJSON(url);

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

  public static async update(id, nome, sobrenome) {
    try {
      const url = this.urlApi + `/users/${id}?` + this.delayApi;
      await fetchJSON(
        url,
        'PUT',
        JSON.stringify({
          first_name: nome,
          last_name: sobrenome,
        })
      );
    } catch (err) {
      throw err;
    }
  }

  public static async deleteById(id) {
    try {
      const url = this.urlApi + `/users/${id}?` + this.delayApi;
      await fetchTXT(url);
    } catch (err) {
      throw err;
    }
  }
}
