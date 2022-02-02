import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const create = ( object ) => {
    const request = axios.post(baseUrl, object)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const remove = ( id ) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(() => {
        console.log('Delete successful')
    })
}

const update = (id, object) => {
    const request = axios.put(`${baseUrl}/${id}`, object)
    return request.then(response => response.data)
}

export default { create, getAll, remove, update }