
export class Code{
    constructor(code, amount, type){
        this.code = code;
        this.amount = amount;
        this.type = type;
    }
    /**@returns {string} */
    get code() {
        return this.code;
    }
    set code(code){
        this.code = code;
    }
    get_amount() {
        return this.amount;
    }
    get_type() {
        return this.type;
    } 
    create_end(duration) {
        var today = Date()
        this.end = today.setDate(today.getDate()+duration)
    }
}
export class Rewards{
    constructor(id,amount,type,duration){
        this.id = id;
        this.amount = amount;
        this.type = type;
        this.duration = duration;
    }
    get_id(){
        return this.id;
    }
    get_amount(){
        return this.amount;
    }
    get_type(){
        return this.type;
    }
    get_duration(){
        return this.duration;
    }
}