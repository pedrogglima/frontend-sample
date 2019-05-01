
// Helps with offline input
// replica user's/response's input

export const users = () => {
  return {
    users: [
         {
           id: 1,
           first_name: 'Lucas Miguel',
           last_name:  'Gomes'
         },
         {
           id: 2,
           first_name: 'Rogério da Silva',
           last_name:  'Jesus'
         },
         {
           id: 3,
           first_name: 'Amauri Oliveira',
           last_name:  'Fonseca'
         }
    ],
    total_pages: "4",
    url: "#users?page="
  }
};

export const user = () => {
  return {
    user: {
      id: 1,
      first_name: 'Lucas Miguel',
      last_name:  'Gomes'
    }
  }
};

export const login = () => {
  return {
    "email": "teste@teste.com",
    "password": "teste"
  }
};

export const token = () => {
  return {
    "token": "QpwL5tke4Pnpja7X"
  }
};
