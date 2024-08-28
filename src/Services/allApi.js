import base_url from './base_url'
import commonApi from './commonApi'

export const register = async (data) => {
    return await commonApi("POST", `${base_url}/register`, data, '')
}

export const login = async (data) => {
    return await commonApi("POST", `${base_url}/login`, data, '')
}

export const updateProfile = async (data, header) => {
    return await commonApi('PATCH', `${base_url}/update-profile`, data, header)
}



//projects
export const addProject = async (data, header) => {
    return await commonApi("POST", `${base_url}/add-project`, data, header)
}

export const getUserProjects = async (header) => {
    return await commonApi('GET', `${base_url}/get-projects`, '', header)
}

export const getAllProjects = async () => {
    return await commonApi('GET', `${base_url}/all-projects`, '', '')
}
export const deleteProject = async (id, header) => {
    return await commonApi('DELETE', `${base_url}/delete-project/${id}`, {}, header)
}
export const updateProject = async (id, data, header) => {
    return await commonApi('PUT', `${base_url}/project-update/${id}`, data, header)
}