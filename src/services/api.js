import axios from "axios";

const api = axios.create({
    baseURL: "ALGUMA COISA",
    headers: {  }
});

export const API = {
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