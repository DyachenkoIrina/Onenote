// let note = {
//   title: "",
//   text: "",
// };

const notes = [];

const TITLE_VALIDATION_LIMIT = 20;
const TEXT_VALIDATION_LIMIT = 150;
const ZERO = 0;

titleInputNode = document.querySelector(".js-title");
textInputNode = document.querySelector(".js-text");
addBtnNode = document.querySelector(".js-add_note_btn");
addBtnDisabledNode = document.querySelector(".js-add_note_btn_disabled");
notesNode = document.querySelector(".js-notes");
validationMessageNode = document.querySelector(".js-validationMessage");

addBtnNode.addEventListener("click", function () {
  const noteFromUser = getNoteFromUser();

  addNote(noteFromUser);

  renderNotes();

  clearInput();
});

function getNoteFromUser() {
  const title = titleInputNode.value;
  const text = textInputNode.value;
  const date = new Date().toLocaleDateString();

  return {
    title: title,
    text: text,
    date: date,
  };
}

function addNote({ title, text, date }) {
  notes.push({
    title: title,
    text: text,
    date: date,
  });
  return;
}

titleInputNode.addEventListener("input", function () {
  validation();
  buttonDisabled();
});

textInputNode.addEventListener("input", function () {
  validation();
  buttonDisabled();
});

function validation() {
  const titleLength = titleInputNode.value.length;
  const textLength = textInputNode.value.length;

  if (titleLength > TITLE_VALIDATION_LIMIT) {
    validationMessageNode.innerText = `Длина заговка не должна превышать ${TITLE_VALIDATION_LIMIT} символов`;
    validationMessageNode.id.remove("validationMessage_hidden");
    addBtnNode.add(`disabled`);
    return;
  }

  if (textLength > TEXT_VALIDATION_LIMIT) {
    validationMessageNode.innerText = `Длина заметки не должна превышать ${TEXT_VALIDATION_LIMIT} символов`;
    validationMessageNode.id.remove("validationMessage_hidden");

    return;
  }

  validationMessageNode.id.add("validationMessage_hidden");
}

const clearInput = (input) => {
  titleInputNode.value = "";
  textInputNode.value = "";
};

const buttonDisabled = () => {
  const titleLength = titleInputNode.value.length;
  const textLength = textInputNode.value.length;

  if (titleLength > ZERO && textLength > ZERO) {
    addBtnNode.removeAttribute("disabled");
  } else {
    addBtnNode.setAttribute("disabled", "disabled");
  }

  if (titleLength > TITLE_VALIDATION_LIMIT) {
    addBtnNode.setAttribute("disabled", "disabled");
  }

  if (textLength > TEXT_VALIDATION_LIMIT) {
    addBtnNode.setAttribute("disabled", "disabled");
  }
};

function getNotes() {
  return notes;
}

function renderNotes() {
  const notes = getNotes();

  let notesHTML = "";

  notes.forEach((note) => {
    notesHTML += `<div class="note">
        <p class="note_title">${note.title}</p>
        <p class="note_text">${note.text}</p>
        <p class="note_date">${note.date}</p>
      </div>`;
  });

  notesNode.innerHTML = notesHTML;
}

addBtnDisabledNode.addEventListener("input", buttonDisabled);
