export class History
{
    constructor(
        public name : string, 
        public stock : string, 
        public quantity : number, 
        public price:number,
        public turn:number,
        public type : string) {}
}