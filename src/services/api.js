import axios from "axios";

const api = axios.create({
    baseURL: "BASE_DA_URL/br",
    headers: {}
});

export const API = {

    //  QUESTIONS: /questions
        // Listar perguntas por tag
        //  GET: /questionbytag/:tagId
        questionsByTag: async (tagId) => {
            return await api.get(`/questions/questionbytag/${tagId}`).then(res => res.data);
        },

        questionsByUser: async (userId) => {
            return await api.get(`/questions/user/${userId}`).then(res => res.data);
        },

        // Buscar uma pergunta específica
        //  GET: /:questionId
        getQuestion: async (questionId) => {
            return await api.get(`/questions/${questionId}`).then(res => res.data);
        },

        questions: async () => {
            return await api.get(`/questions`).then(res => res.data);
        },

        // Criar uma pergunta
        //  POST: /
        createQuestion: async (body) => {
            return await api.post(`/questions`, body).then(res => res.data);
        },

        //  Responder uma pergunta
        //  POST: /response/:questionId
        createAnswer: async (questionId, body) => {
            return await api.post(`/questions/${questionId}/answer`, body).then(res => res.data);
        },

        //  REAÇÃO
        //  PUT: /like/:questionId
        likeDeslike: async (questionId) => {
            return await api.put(`/questions/${questionId}/like`).then(res => res.data);
        },

        //  EDITAR RESPOSTA
        //  PUT: /response/edit/:questionId
        editAnswer: async (questionId, body) => {
            return await api.put(`/questions/${questionId}/answer`, body).then(res => res.data);
        },

    //  USERS: /users
        //  Login
        //  POST: /login
        signIN: async (body) => {
            return await api.post("/users/login", body).then(res => res.data);
        },

        // Detalhes do usuário
        //  GET: /:id
        getUser: async (userId) => {
            return await api.get(`/users/${userId}`).then(res => res.data);
        },

        //  Cadastrar usuário
        //  POST: /
        signUP: async (body) => {
            return await api.post("/users", body).then(res => res.data);
        },

        //  Editar usuário
        //  PUT: /:id
        editUser: async (userId, body) => {
            return await api.put(`/users/${userId}`, body).then(res => res.data);
        },

        //  Revogar usuário
        //  DELETE: /:id
        deleteUser: async (userId) => {
            return await api.delete(`/users/${userId}`).then(res => res.data);
        },

    //  TAGS: /tags
        //  Listar Tags
        //  GET: /list
        tags: async () => {
            return await api.get("/tags").then(res => res.data);
        },

        //  Listar Tags POPULARES (apenas as 8 primeiras)
        //  GET: /list/popupar
        popuparTags: async () => {
            return await api.get("/tags/popular").then(res => res.data);
        },

        //  Cadastrar uma TAG
        //  POST: /
        createTag: async (body) => {
            return await api.post("/tags", body).then(res => res.data);
        },

        //  Apagar TAG
        //  DELETE: /delete/:id
        deleteTag: async (tagId) => {
            return await api.delete(`/tags/${tagId}`).then(res => res.data);
        },
};