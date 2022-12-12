import { Note } from './classes/Note.js';
import { ColecctionNotes } from './classes/ColecctionNotes.js';
window.onload = function () {
    var coleccion = new ColecctionNotes();
    let inputButton = document.getElementById("inputButton");
    coleccion.getNotes();
    start(coleccion);
    inputButton.addEventListener("click", function () {
        let inputText = document.getElementById("inputText")
        let nota = new Note(inputText.value);
        inputText.value = "";
        coleccion.addNotes(nota);
        document.getElementById("notes").innerHTML = "";
        start(coleccion);
    });
}
function start(coleccion) {
    coleccion.showNotes();
    checkedAll(coleccion);
    deleteAll(coleccion);
    priorityAll(coleccion);
    totalNotes(coleccion);
    deleteComplete(coleccion);
}

function deleteAll(coleccion) {
    let notes = document.getElementsByClassName('note__delete--button');
    for (let i=0; i<notes.length; i++) {
        notes[i].addEventListener('click', function () {
            let id = this.id;
            coleccion.delete(id);
            this.parentNode.parentNode.parentNode.remove();
            totalNotes(coleccion);
        });
    }
}
function priorityAll(coleccion) {
    let priority = document.querySelectorAll('.note__priority--button');
    for (let i=0; i<priority.length; i++) {
        priority[i].addEventListener('click', function () {
            let id = this.id;
            for (let j=0; j<priority.length; j++) {
                priority[j].className = 'note__priority--button';
            }
            this.className = 'note__priority--button--' + this.value.toLowerCase();
            coleccion.changePriority(id, this.value);
            document.getElementById("notes").innerHTML = "";
            start(coleccion);
        });
    }
}
function totalNotes(coleccion) {
    let pendientes = document.getElementById("pendientes");
    let totales = document.getElementById("totales");
    totales.innerHTML = coleccion.notes.length;
    let contador = 0;
    let checked = document.querySelectorAll('.note__checked');
    for (let i=0; i<checked.length; i++) {
        if (checked[i].className == 'note__checked note__checked--checked') {
            contador++;
        }
    }
    pendientes.innerHTML = contador;
}
function checkedAll(coleccion) {
    $('.note__checked').click(function () {
        $(this).toggleClass('note__checked--checked');
        $(this).next().toggleClass('note__title--checked');
        totalNotes(coleccion);
    });
}

function deleteComplete(coleccion) {
    let deleteComplete = document.getElementById('completadas');
    deleteComplete.addEventListener('click', function () {
        let checked = document.querySelectorAll('.note__checked');
        for (let i=0; i<checked.length; i++) {
            if (checked[i].className == 'note__checked note__checked--checked') {
                let id = checked[i].id;
                coleccion.delete(id);
                checked[i].parentNode.parentNode.parentNode.remove();
                totalNotes(coleccion);
            }
        }
    });
}