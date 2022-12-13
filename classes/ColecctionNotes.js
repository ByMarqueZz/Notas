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
                            <p id='p${this.notes[i].id}'>Cargando...${this.calculateTime(this.notes[i].id)}</p>
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
    orderNotesForPriority() {
        document.getElementById("notes").innerHTML = "";
        this.notes.sort(function (a, b) {
            if (a.prioridad === 'high' && b.prioridad === 'normal') {
                return -1
            } else if (a.prioridad === 'high' && b.prioridad === 'low') {
                return -1
            } else if (a.prioridad === 'normal' && b.prioridad === 'low') {
                return -1
            } else if (a.prioridad === 'normal' && b.prioridad === 'high') {
                return 1
            } else if (a.prioridad === 'low' && b.prioridad === 'high') {
                return 1
            } else if (a.prioridad === 'low' && b.prioridad === 'normal') {
                return 1
            } else {
                return 0
            }
        });
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }
        
    calculateTime(id) {
        setInterval(() => {
            let date = new Date(this.notes[id].date);
            let now = new Date();
            let time = now - date;
            let days = Math.floor(time / (1000 * 60 * 60 * 24));
            let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((time % (1000 * 60)) / 1000);
            if (days > 0) {
                document.getElementById('p'+id).innerHTML = `Añadido hace ${days} días`;
            } else if (hours > 0) {
                document.getElementById('p'+id).innerHTML = `Añadido hace ${hours} horas`;
            } else if (minutes > 0) {
                document.getElementById('p'+id).innerHTML = `Añadido hace ${minutes} minutos`;
            } else if (seconds > 0) {
                document.getElementById('p'+id).innerHTML = `Añadido hace ${seconds} segundos`;
            }
        }, 1000);
        return "";
            
    }
}
export { ColecctionNotes };