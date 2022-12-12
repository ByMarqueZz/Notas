class ColecctionNotes {
    constructor() {
        this.notes = [];
    }
    addNotes(note) {
        note.id = this.notes.length;
        this.notes.push(note);
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }
    getNotes() {
        this.notes = JSON.parse(localStorage.getItem('notes'));
    }
    delete(id) {
        this.notes = this.notes.filter(function (note) {
            return note.id != id;
        });
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }
    showNotes() {
        if (this.notes == null) {
            this.notes = [];
        }
        for (let i=0; i<this.notes.length; i++) {
            document.getElementById("notes").innerHTML += `
                <div class='note' id='${this.notes[i].id}'>
                    <div class='note__firts'>
                        <div class='note__checked' id='${this.notes[i].id}'></div>
                        <div class='note__title'>
                            <h2>${this.notes[i].title}</h2>
                        </div>
                        <div class='note__delete'>
                            <button class='note__delete--button' id='${this.notes[i].id}'><img src='./img/delete.png'></button>
                        </div>
                    </div>
                    <div class='note__second'>
                        <div class='note__priority'>
                            <p>Prioridad: </p>
                            <button class='note__priority--button${this.notes[i].priority == 'low' ? '--'+this.notes[i].priority : ''}' id='${this.notes[i].id}' value='low'><img src='./img/flecha_abajo.png' class='flechas'>Low</button>
                            <button class='note__priority--button${this.notes[i].priority == 'normal' ? '--'+this.notes[i].priority : ''}' id='${this.notes[i].id}' value='normal'>Normal</button>
                            <button class='note__priority--button${this.notes[i].priority == 'high' ? '--'+this.notes[i].priority : ''}' id='${this.notes[i].id}' value='high'><img src='./img/flecha_arriba.png' class='flechas'>High</button>
                        </div>
                        <div class='note__date'>
                            <p>${this.notes[i].date}</p>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    changePriority(id, newPriority) {
        this.notes[id].priority = newPriority;
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }
}
export { ColecctionNotes };