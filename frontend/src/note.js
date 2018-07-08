const Note = (function(){

  const all = []

  return class {

    constructor({id, user, title, body}) {
      this.id = id
      this.user = user
      this.title = title
      this.body = body
      all.push(this)
    }

    static getAll() {
      return [...all]
    }

    el() {
      return `<div id=${this.id}><li>${this.title}</li></div>`
    }

    notePreview() {
      return `<div id=${this.id}><h2>${this.title}</h2><p>${this.body}</p><button id=${this.id} id=${this.id} name="edit-button">Edit Note</button><button id=${this.id} name="delete-button">Delete Note</button></div>`
    }

    renderEditNoteForm() {
      return `<form id=${this.id} name="edit-form">
        <input type="text" name="formTitle" value="${this.title}">
        <textarea name="formBody" rows="8" cols="80">${this.body}</textarea>
        <input type="submit" value="Update Note">
      </form>`
    }

    static newForm() {
      return `<form id="new-note-form" name="new-form">
        <label for="formTitle">Title</label>
        <input type="text" name="formTitle" value=""><br><br>
        <label for="formBody">Body</label>
        <textarea name="formBody" rows="8" cols="80"></textarea>
        <input type="submit" value="Create Note">
      </form>`
    }
  }

})()
