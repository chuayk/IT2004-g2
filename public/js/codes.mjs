export class Code{
    constructor(code, amount, type){
        this.code = code;
        this.amount = amount;
        this.type = type;
    }
    get_code() {
        return this.code;
    }
    get_amount() {
        return this.amount;
    }
    get_type() {
        return this.type;
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