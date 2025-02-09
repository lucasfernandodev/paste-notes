export const listNotes = async (owner) => {

  if (!owner) {
    console.error('Error! Vocẽ precisa informar o owner para poder recuperar lista de notas')
  }

  try {
    const response = await fetch(`/api/notes?owner=${owner}`);
    const data = await response.json();

    if (response.status !== 200) {
      console.error('Não foi possivel recuperar a lista de notas');
      console.error(response.message);
      return [];
    }

    return data.notes;
  } catch (error) {
    console.error('Não foi possivel recuperar a lista de notas');
    console.error(error)
    return []
  }
}

export const saveNote = async (data = {}) => {
  if (!data?.owner) {
    throw new Error('Error! Você não definiu o campo owner');
  }

  if (!data?.note) {
    throw new Error('Error! Você não definiu o campo note');
  }

  if (!data?.note?.id) {
    throw new Error('Error! Voê não definiu o campo id dentro de note')
  }

  if (!data?.note?.content) {
    throw new Error('Error! Você não definiu o campo content')
  }

  try {
    const response = await fetch('/api/notes', {
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

    const responseData = await response.json();

    if (response.status !== 201) {
      console.error('Error! Não foi possivel criar uma nota')
      console.error(data?.message)
    }

    return responseData.note

  } catch (error) {
    console.error('Error! Não foi possivel criar uma nota')
    console.error(error)
  }
}

export const updateNote = async (data = {}) => {
  if (!data?.owner) {
    throw new Error('Error! Você não definiu o campo owner');
  }

  if (!data?.note) {
    throw new Error('Error! Você não definiu o campo note');
  }

  if (!data?.note?.id) {
    throw new Error('Error! Voê não definiu o campo id dentro de note')
  }

  if (!data?.note?.content) {
    throw new Error('Error! Você não definiu o campo content')
  }

  try {
    const response = await fetch('/api/notes', {
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

    const responseData = await response.json();

    if (response.status !== 200) {
      console.error('Não foi possivel atualizar a nota');
      console.error(responseData.message)
      return;
    }

    return responseData
  } catch (error) {
    console.error('Não foi possivel atualizar a nota');
    console.error(error)
  }
}

export const deleteNote = async (owner, noteId) => {
  if (!owner) {
    throw new Error('Error! Você não definiu o campo owner');
  }

  if (!noteId) {
    throw new Error('Error! Você não definiu o campo noteId');
  }

  try {
    const response = await fetch(`/api/notes?owner=${owner}&id=${noteId}`, {
      method: 'DELETE'
    })

    if(response.status !== 204){
      const data = await response.json();
      console.error('Não foi possivel deletar a nota');
      console.error(data?.message)
    }
  } catch (error) {
    console.error('Não foi possivel deletar a nota');
    console.error(error)
  }
}

export const deleteAllNote = async (owner) => {

  if (!owner) {
    throw new Error('Error! Você não definiu o campo owner');
  }


 
  try {
    const response = await fetch(`/api/notes/all?owner=${owner}`, {
      method: 'DELETE'
    })

    if(response.status !== 204){
      const data = await response.json();
      console.error('Não foi possivel deletar todas as notas');
      console.error(data?.message)
    }
    return true
  } catch (error) {
    console.error('Não foi possivel deletar todas as notas');
    console.error(error)
  }
}


export const getOwner = async (owner) => {
  try {
    const response = await fetch(`/api/users?owner=${owner}`);
    const data = await response.json();
    if(!data.user) {
      console.error('Não foi possivel recuperar informações do owner')
      console.error(data?.message)
      return null
    };
    
    return data.user;
  } catch (error) {
    console.error('Não foi possivel recuperar informações do owner')
    console.error(error)
    return null;
  }
}

