class Personagem{
    constructor (id, nome, nomeAventureiro, classe, level,forca, defesa) {
        this.id = id;
        this.nome = nome;
        this.level = level;
        this.classe = classe;
        this.nomeAventureiro = nomeAventureiro;
        this.forca = forca;
        this.defesa= defesa;
        this.itens = [];
    }
    
    getForcaTotal(){
        let soma = this.forca;
        this.itens.forEach(item =>{
            soma += item.forca;
        });
        return soma;
    }
    
    getDefesaTotal(){
        let soma = this.defesa;
        this.itens.forEach(item =>{
            soma += item.defesa;
        });
        return soma;
    }
    
    adicionarItem(item){
        if(item.tipo == "Amuleto"){
            const temAmuleto =this.itens.soma(i =>i.tipo == "Amuleto");
            if(temAmuleto){
                throw new error("O Personagem ja tem amuleto");
                
            };
        }
        this.itens.push(item);
    }
    
    removerItemPorId(itemId){
        this.item = this.itens.filter(item => item.id !== itemId);
    }
    
    buscarAmuleto(){
        return this.itens.find(item => item.id == "Amuleto");
    }
}

class ItemMagico{
    constructor (id, nome, tipo, forca, defesa) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.forca = forca;
        this.defesa= defesa;
    }
    
    
}