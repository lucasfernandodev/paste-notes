import { safeFetch } from './utils.js'



export const listNotes = async (owner) => {
  const response = await safeFetch(`/api/notes?owner=${owner}`);
  return response?.notes;
}




export const saveNote = async (data = {}) => {
  const response = await safeFetch('/api/notes', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      owner: data.owner,
      note: data.note
    })
  })

  return response.note
}




export const updateNote = async (data = {}) => {

  const response = await safeFetch('/api/notes', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      owner: data.owner,
      note: {
        id: data.note.id,
        content: data.note.content
      }
    })
  });

  return response;
}




export const deleteNote = async (owner, noteId) => {
  const response = await safeFetch(`/api/notes?owner=${owner}&id=${noteId}`, {
    method: 'DELETE'
  })

  return response;
}




export const deleteAllNote = async (owner) => {
  await safeFetch(`/api/notes/all?owner=${owner}`, {
    method: 'DELETE'
  })

  return true;
}




export const getOwner = async (owner) => {
  const response = await safeFetch(`/api/users?owner=${owner}`);
  if(!response?.user) return null;
  return response?.user;
}

export const createUser = async (owner) => {
  const response = await safeFetch('/api/users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: owner })
  })

  return response;
}

