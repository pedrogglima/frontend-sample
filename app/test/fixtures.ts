
// Helps with offline input
// replica user's/response's input

export const users = () => {
  return {
    users: [
         {
           id: 1,
           first_name: 'ex1',
           last_name:  'ex1'
         },
         {
           id: 2,
           first_name: 'ex2',
           last_name:  'ex2'
         },
         {
           id: 3,
           first_name: 'ex3',
           last_name:  'ex3'
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
      first_name: 'ex1',
      last_name:  'ex1'
    }
  }
};

export const login = () => {
  return {
    "email": "teste@teste.com",
    "password": "teste"
  }
};
