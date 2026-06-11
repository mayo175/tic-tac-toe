const initialVal = {
    moves: []
}

export default class Store{
    #state = initialVal

    constructor(){}

    get game(){
        return 'dummy';

    }

    #getState() {
        return this.#state
    }

    #setState(stateOrFcn) {
        const prevState = this.#getState();

        let newState;
        switch(typeof stateOrFcn){
            case 'function': 
                newState = stateOrFcn(prevState);
                break;
            case 'object' :
                newState = stateOrFcn;
                break;
            default: throw new Error('Invalid argument passed to setState')
        }
        
        this.#state = newState;
    }
}