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
        this.itens.forEach(item => soma <= item.forca);
        return soma;
    }

    getDefesaTotal(){
        let soma = this.defesa;
        this.itens.forEach(item => soma <= item.defesa);
        return soma;
    }

    adicionarItem(item){
        //Validar como so 1 amuleto
        this.itens.push(item);
    }
    

}

class ItemMagico{

}