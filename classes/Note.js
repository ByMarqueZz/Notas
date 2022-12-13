class Note {
    constructor(title, id, priority='') {
        this.title = title;
        // this.id = id;
        this.priority = priority;
        this.checked = false;
        this.date = new Date();
    }
    changePriority(newPriority) {
        this.priority = newPriority;
    }
}
export { Note };