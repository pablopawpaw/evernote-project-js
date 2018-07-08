class Adapter {

  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/notes/'
  }

  getNotes() {
    return fetch(this.baseUrl)
      .then(res=> res.json())
  }

  getNote(id) {
    return fetch(this.baseUrl+id)
      .then(res=> res.json())
  }

  deleteNote(id) {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(id)
    }
    return fetch(this.baseUrl+id, options)
      .then(res => res.json())
  }

  updateNote(note) {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    }
    return fetch(this.baseUrl+note.id, options)
      .then(res => res.json())
  }

  createNote(note) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    }
    return fetch(this.baseUrl, options)
      .then(res => res.json())
  }

}
