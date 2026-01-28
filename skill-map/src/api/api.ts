import axios, { AxiosError, type AxiosResponse} from "axios";
import { use } from "react";
import { useNavigate } from "react-router-dom";


axios.defaults.baseURL = "http://localhost:8090/api/";

axios.interceptors.request.use(
  (config) => {
    const token = getAuthHeaders();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log(config.headers.Authorization);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function getAuthHeaders() {
    const token = localStorage.getItem("accessToken");
    return token;
}

export function setToken(token: string){
    localStorage.setItem("accessToken", token);
}
export async function authorize(username: string, password: string) {
    const data = new FormData();
    data.append("username", username);
    data.append("password", password);
    data.append("scope", "roadmap.write roadmap.read me");

    return axios.post("auth/login", data)
        .then((response: AxiosResponse)=>{return response})
        .catch((error: AxiosError)=>{return error.response});

}

export async function register(email: string, password: string, firstname: string, lastname: string) {
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("firstname", firstname);
    data.append("lastname", lastname);

    return axios.post("auth/reg", data)
        .then((response: AxiosResponse)=>{return response})
        .catch((error: AxiosError)=>{return error.response});

}

export async function getGraph(topic_name: string){
    return axios.get("/skill-graph", {params: { topic: topic_name}})
        .then((response: AxiosResponse)=>{return response})
        .catch((error: AxiosError)=>{return error.response});
}

export async function getNodeDetails(node_id: string){
    return axios.get(`/skill-graph/${node_id}`)
        .then((response: AxiosResponse)=>{return response})
        .catch((error: AxiosError)=>{return error.response});
}

export async function createRoadmap(query: string){
    return axios.post("/my-roadmap/create", {"message": query})
        .then((response: AxiosResponse)=>{return response})
        .catch((error: AxiosError)=>{return error.response});
}

export async function getRoadmap(){
    return axios.get("/my-roadmap")
        .then((response: AxiosResponse)=>{return response})
        .catch((error: AxiosError)=>{
            return error.response});
}

export async function compliteModuleInRoadmap(code: string){
    return axios.post(`/my-roadmap/${code}/complite`)
        .then((response: AxiosResponse)=>{return response})
        .catch((error: AxiosError)=>{return error.response});
}

export async function getKnowSkills(){
    return axios.get(`/user/progress`)
        .then((response: AxiosResponse)=>{return response})
        .catch((error: AxiosError)=>{return error.response});
}

export async function getCurrentUser(){
    return axios.get("/user/me")
        .then((response: AxiosResponse)=>{return response})
        .catch((error: AxiosError)=>{return error.response});
}