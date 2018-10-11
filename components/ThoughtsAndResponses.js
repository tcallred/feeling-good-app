// Create unique id function
let idGen = () => {
    let id = 0;

    return () => {
        id += 1;
        return id;
    }
};

let getId = idGen();

export default class ThoughtsAndResponses {

    static myInstance = null;

    _list = [];


    /**
     * @returns {ThoughtsAndResponses}
     */
    static getInstance() {
        if (ThoughtsAndResponses.myInstance == null) {
            ThoughtsAndResponses.myInstance = new ThoughtsAndResponses();
        }

        return this.myInstance;
    }

    addEntry(datetime, text) {
        this._list.push({id: getId(), datetime: datetime, thought: text, response: ''});
    }

    removeEntry(id) {
        this._list = this._list.filter(el => {
            return el.id !== id
        });
    }

    setResponse(id, resp) {
        this._list.find(el => {
            return el.id === id
        }).response = resp;
    }

    getThoughtText(id){
        return this._list.find(el =>{
            return el.id === id
        }).thought;
    }

    getResponseText(id){
        return this._list.find(el =>{
            return el.id === id
        }).response;
    }

    getList(){
        return this._list;
    }
}