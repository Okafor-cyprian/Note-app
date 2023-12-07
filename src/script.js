// Get the form and note list elements
const noteForm = document.getElementById('note-form');
const noteList = document.getElementById('note-list');

// Load notes from localStorage
const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
savedNotes.forEach(note => {
    createNoteItem(note);
});
    
// Add event listener for form submission
noteForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

// Get the input value
  const noteInput = document.getElementById('note-input');
  const noteText = noteInput.value.trim();
      
// Check if the input is not empty
  if (noteText !== '') {
// Create a new note object
    const note = {
    id: Date.now(),
    text: noteText
  };
        
// Create a new list item element
  createNoteItem(note);
        
// Save the note to localStorage
  savedNotes.push(note);
  localStorage.setItem('notes', JSON.stringify(savedNotes));
        
// Clear the input field
  noteInput.value = '';
    }
});
    
// Function to create a note item
function createNoteItem(note) {
// Create a new list item element
  const listItem = document.createElement('li');
  listItem.className = 'note-list-item';
  listItem.dataset.noteId = note.id;
      
// Create a span element for the note text
  const noteTextSpan = document.createElement('span');
  noteTextSpan.textContent = note.text;
      
// Create a button element for deleting the note
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function() {
// Remove the note from the list
    listItem.remove();
        
// Remove the note from savedNotes array
    const noteIndex = savedNotes.findIndex(n => n.id === note.id);
    if (noteIndex > -1) {
      savedNotes.splice(noteIndex, 1);
      localStorage.setItem('notes', JSON.stringify(savedNotes));
    }
  });
      
// Append the note text and delete button to the list item
    listItem.appendChild(noteTextSpan);
    listItem.appendChild(deleteButton);
      
// Append the list item to the note list
  noteList.appendChild(listItem);
}

