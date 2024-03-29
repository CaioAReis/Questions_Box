import axios from "axios";

const api = axios.create({
  //  CASA
  // baseURL: "http://192.168.0.113:3333/v1-0/br",

  // baseURL: "http://192.168.1.102:3333/v1-0/br",

  //  CHÁCARA
  baseURL: "http://192.168.1.113:3333/v1-0/br",

  // headers: {}
});

export const API = {
  //  QUESTIONS: /questions
    // Listar perguntas por tag
    //  GET: /questionbytag/:tagId
    questionsByTag: async (tagId, pagination) => {
      return await api.get(`/questions/questionbytag/${tagId}/${pagination}`).then(res => res.data);
    },

    // OK
    questionsByUser: async (userId) => {
      return await api.get(`/questions/user/${userId}`).then(res => res.data);
    },

    // Buscar uma pergunta específica
    //  GET: /:questionId
    getQuestion: async (questionId) => {
      return await api.get(`/questions/buscar/${questionId}`).then(res => res.data);
    },

    questions: async (pagination) => {
      return await api.get(`/questions/${pagination}`).then(res => res.data);
    },

    // Criar uma pergunta
    //  POST: /
    createQuestion: async (question, token) => {
      return await api.post(`/questions`, question, { headers: { "authentication": "Bearer " + token }}).then(res => res.data);
    },

    //  Responder uma pergunta - Criar resposta
    //  POST: /answer/:questionId
    createAnswer: async (questionId, body, token) => {
      return await api.post(`/questions/answer/${questionId}`, body, {headers: { "authentication": "Bearer " + token }}).then(res => res.data);
    },

    bestAnswer: async (questionId, answerIndex, body, token) => {
      return await api.put(`/questions/bestanswer/${questionId}/${answerIndex}`, body, {headers: { "authentication": "Bearer " + token }}).then(res => res.data);
    },

    // EDITAR QUESTION
    editQuestion: async (questionId, body, token) => {
      console.warn({ token: token });
      return await api.put(`/questions/${questionId}`, body, {headers: { "authentication": "Bearer " + token }}).then(res => res.data);
    },

    deleteQuestion: async (questionId, token) => {
      return await api.delete(`/questions/${questionId}`, { headers: { "authentication": "Bearer " + token } }).then(res => res.data);
    },

    //  EDITAR RESPOSTA
    //  PUT: /answer/:questionId/:answerId'
    editAnswer: async (questionId, answerId, body, token) => {
      return await api.put(`/questions/answer/${questionId}/${answerId}`, body, {headers: { "authentication": "Bearer " + token }}).then(res => res.data);
    },

    //  APAGAR RESPOSTA
    //  PUT: /delete/:id/:idResponse
    deleteAnswer: async (questionId, answerId, token) => {
      return await api.delete(`/questions/delete/${questionId}/${answerId}`, { headers: { "authentication": "Bearer " + token } }).then(res => res.data);
    },

  //  USERS: /users
    //  Login
    //  POST: /login
    signIN: async (body) => {
      return await api.post("/users/signin", body).then(res => res.data);
    },

    // Detalhes do usuário
    //  GET: /:id
    getUser: async (userId) => {
      return await api.get(`/users/${userId}`).then(res => res.data);
    },

    //  Cadastrar usuário
    //  POST: /
    signUP: async (body) => {
      return await api.post("/users/signup", body).then(res => res.data);
    },

    //  Editar usuário
    //  PUT: /:id
    editUser: async (userId, body, token) => {
      return await api.put(`/users/${userId}`, { body: body }, { headers: { "authentication": "Bearer " + token }}).then(res => res.data);
    },

    //  Revogar usuário
    //  DELETE: /:id
    deleteUser: async (userId) => {
      return await api.delete(`/users/${userId}`).then(res => res.data);
    },

  //  TAGS: /tags
    //  Listar Tags
    //  GET: /list
    tags: async (pagination) => {
      return await api.get(`/tags/${pagination}`).then(res => res.data);
    },

    //  Listar Tags POPULARES (apenas as 8 primeiras)
    //  GET: /list/popupar
    firstTags: async () => {
      return await api.get("/tags").then(res => res.data);
    },

    //  Cadastrar uma TAG
    //  POST: /
    createTag: async (body, token) => {
      return await api.post("/tags", body, { headers: { "authentication": "Bearer " + token }}).then(res => res.data);
    },

};
