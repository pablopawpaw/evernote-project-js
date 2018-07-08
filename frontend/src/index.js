document.addEventListener("DOMContentLoaded", function() {

  const adapter = new Adapter
  const sidebar = document.getElementById('sidebar')
  const noteList = document.getElementById('note-list')
  const mainBody = document.getElementById('main')
  const createBtn = document.getElementById('create-note-btn')

  adapter.getNotes()
    .then(data => {
      data.forEach((note)=>{
        let newNote = new Note(note)
        noteList.innerHTML += newNote.el()
      })
    })

  noteList.addEventListener('click', (e) => {
    if(e.target.nodeName==='LI'){
      const note_id = e.target.parentElement.id
      adapter.getNote(note_id)
        .then(data => {
          newNote = new Note(data)
          mainBody.innerHTML = newNote.notePreview()
        })
    }
  })

  mainBody.addEventListener('click', (e) => {
    if(e.target.name === 'delete-button') {
      let note_id = e.target.id
      adapter.deleteNote(note_id)
        .then(data => {
          window.alert(data.message)
          mainBody.innerHTML = ""
        })
        .then(() => adapter.getNotes())
        .then(data => {
          noteList.innerHTML = ""
          data.forEach((note)=>{
            let newNote = new Note(note)
            noteList.innerHTML += newNote.el()
          })
      })
    }
    else if(e.target.name === 'edit-button') {
      let note_id = e.target.id
      console.log('inside')
      mainBody.innerHTML = ""
      adapter.getNote(note_id)
        .then((data)=>{
          let note = new Note(data)
          const editForm = note.renderEditNoteForm()
          mainBody.innerHTML = editForm
          return data
        })
    }
    else if(e.target.value === 'Update Note') {
      const editForm = document.querySelector('form')
      editForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const updatedNoteId = e.target.id
        const updatedNoteTitle = e.target.children[0].value
        const updatedNoteBody = e.target.children[1].value
        let noteObj = {id: updatedNoteId, title: updatedNoteTitle, body: updatedNoteBody}
        adapter.updateNote(noteObj)
          .then(data=> {
              let updatedNote = new Note(data)
              mainBody.innerHTML = updatedNote.notePreview()
          })
          .then(() => adapter.getNotes())
          .then(data => {
            noteList.innerHTML = ""
            data.forEach((note)=>{
              let newNote = new Note(note)
              noteList.innerHTML += newNote.el()
            })
        })
      })
    }
  })

  createBtn.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    const newNoteForm = Note.newForm()
    mainBody.innerHTML = newNoteForm
    const formElement = document.getElementById('new-note-form')
    formElement.addEventListener('submit', (e) => {
      e.preventDefault()
      // get latest id number and add new Note with id and title and body
      let last_id = Note.getAll().slice(-1)[0].id
      last_id++
      const user = Note.getAll()[0].user
      const title = e.target.children[1].value
      const body = e.target.children[5].value
      let newNote = new Note({id: last_id, user: user, title: title, body: body})
      adapter.createNote(newNote)
      mainBody.innerHTML = newNote.notePreview()
    })
  })

});
