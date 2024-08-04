class Items{
    static Itemslist=[];
    static add(item){  
        Items.Itemslist.push(item);  
        Items.#printItems(); 
    }   
    static #printItems() {
        console.log(Items.Itemslist);
    }   

    /**
     * return a list that contains all the items that match a row and col 
     * O(n) :/ It could definitley be more efficient. 
     */  
    static itemsAt(row, col){
        let l = []; 
        for(let item of this.Itemslist){
            if(item.row == row && item.col == col){
                l.push(item);
            }
        }  
        console.log(l); 
        return l; 
    } 


}  


class Spike{
    constructor(row, col){ 
        this.name = 'spike'; 
        this.damageAmount = 3;   
        this.imagePath = 'images/spike.png'  
        this.row=row; 
        this.col=col;
    }   
}  



