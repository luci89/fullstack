import axios from 'axios'
const baseUrl = 'https://v74vdw-3001.csb.app/api'

const getAll = () => {
    const request = axios.get(`${baseUrl}/persons`, {
        withCredentials: false
    })
    return request.then(response => response.data)
}

const createPerson = (newPerson) => {
    const request = axios.post(`${baseUrl}/persons`, newPerson)
    return request.then(response => response.data)
}

const deletePerson = (personId) => {
    const request = axios.delete(`${baseUrl}/persons/${personId}`)
    return request.then(response => response.data)
}

const updatePerson = (updatedPerson) => {
    const request = axios.put(`${baseUrl}/${updatedPerson.id}`, updatedPerson)
    return request.then(response => response.data)
}

export default { getAll, createPerson, deletePerson, updatePerson }