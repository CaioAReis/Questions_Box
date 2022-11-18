import axios from "axios";

const api = axios.create({
    baseURL: "BASE_DA_URL/br",
    headers: {  }
});

//      /questions
//      /response
//      /users
//      /tags

export const API = {

    //  QUESTIONS: /questions
        // Listar perguntas pelas tag
        //  GET: /questionbytag/:tagId

        // Buscar uma pergunta específica
        //  GET: /:questionId

        // Criar uma pergunta
        //  POST: /

        //  Responder uma perguntaResponder uma pergunta
        //  POST: /response/:questionId

        //  REAÇÂO
        //  PUT: /like/:questionId

        //  EDITAR RESPOSTA
        //  PUT: /response/edit/:questionId

    //  USERS: /users
        //  Login
        //  POST: /login

        // Detalhes do usuário
        //  GET: /:id

        //  Listar usuários
        //  GET: /

        //  Cadastrar usuário
        //  POST: /

        //  Editar usuário
        //  PUT: /:id

        //  Revogar usuário
        //  DELETE: /:id

    //  TAGS: /tags
        //  Listar Tags
        //  GET: /list

        //  Listar Tags POPULARES (apenas as 8 primeiras)
        //  GET: /list/popupar

        //  Cadastrar uma TAG
        //  POST: /

        //  Apagar TAG
        //  DELETE: /delete/:id
        

    tagList: async () => {},
    editUser: async () => {},
    createTag: async () => {},
    sendResponse: async () => {},
    questionList: async () => {},
    createQuestion: async () => {},
    questionsByTag: async () => {},
    questionsByUser: async () => {},
    questionDetails: async () => {},
    recentsQuestions: async () => {},

    productList: async () => {
        return await api.get("/product/list").then(response => response.data);
    },

    createUser: async (email, senha) => {
        return await api.post("/users/login", { email, senha }).then(response => response.data);
    }
};