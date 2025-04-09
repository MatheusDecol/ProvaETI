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
        if(forca < 0 || defesa < 0 || forca > 10 || defesa > 10){
            throw new error("A força e defesa devem ter valores de 0 a 10");
        }

        if(forca == 0 && defesa == 0){
            throw new error("Um item não pode ter foça e defesas iguais a zero");
        }

        if (tipo === "Arma" && defesa !== 0) {
            throw new Error("Itens do tipo Arma devem ter defesa igual a 0.");
        }

        if (tipo === "Armadura" && forca !== 0) {
            throw new Error("Itens do tipo Armadura devem ter força igual a 0.");
        }

        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.forca = forca;
        this.defesa= defesa;
    }
    
    
}

let personagens = [];

function carregarPersonagens() {
    const dados = localStorage.getItem("personagens");
    if (dados) {
        const lista = JSON.parse(dados);
        personagens = lista.map(p => {
          const personagem = new Personagem(
            p.id, p.nome, p.nomeAventureiro, p.classe, p.level, p.forca, p.defesa
          );
          if (p.itens) {
            p.itens.forEach(i => {
              personagem.adicionarItem(new ItemMagico(i.id, i.nome, i.tipo, i.forca, i.defesa));
            });
          }
          return personagem;
        });
      }
}

function salvarPersonagens() {
    localStorage.setItem("personagens", JSON.stringify(personagens));
}

function adicionarPersonagem() {
    const nome = document.getElementById("nome").value.trim();
    const nomeAventureiro = document.getElementById("nomeAventureiro").value.trim();
    const classe = document.getElementById("classe").value;
    const level = parseInt(document.getElementById("level").value);
    const forca = parseInt(document.getElementById("forca").value);
    const defesa = parseInt(document.getElementById("defesa").value);
  
    if (!nome || !nomeAventureiro || !classe || isNaN(level) || isNaN(forca) || isNaN(defesa)) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    if (forca + defesa !== 10) {
        alert("A soma de força e defesa deve ser exatamente 10.");
        return;
    }
    
    const id = Date.now();
    const novoPersonagem = new Personagem(id, nome, nomeAventureiro, classe, level, forca, defesa);
    
    personagens.push(novoPersonagem);
    salvarPersonagens();
    alert("Personagem cadastrado com sucesso!");
    
    document.getElementById("nome").value = "";
    document.getElementById("nomeAventureiro").value = "";
    document.getElementById("classe").value = "";
    document.getElementById("level").value = "";
    document.getElementById("forca").value = "";
    document.getElementById("defesa").value = "";

    renderizarPersonagens();
}

function renderizarPersonagens(){
    const container = document.getElementById("listaPersonagens");
    container.innerHTML = "";

    if (personagens.length === 0) {
        container.innerHTML = "<p>Nenhum personagem cadastrado.</p>";
        return;
      }

    personagens.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "personagem";
    div.innerHTML = `
        <h3>${p.nomeAventureiro} (${p.classe})</h3>
        <p><strong>Level:</strong> ${p.level}</p>
        <p><strong>Força Total:</strong> ${p.getForcaTotal()}</p>
        <p><strong>Defesa Total:</strong> ${p.getDefesaTotal()}</p>
        <p><strong>Itens:</strong></p>
        <ul>
        ${
            p.itens.length > 0
            ? p.itens
                .map(
                    item =>
                    `<li>${item.nome} (${item.tipo}) 
                        <button onclick="removerItemDoPersonagem(${p.id}, ${item.id})">Remover Item</button>
                    </li>`
                )
                .join("")
            : "<li>Sem itens</li>"
        }
        </ul>
        <button onclick="removerPersonagem(${p.id})">Remover Personagem</button>
    `;

    container.appendChild(div);
    });
}

function adicionarItemMagico(){
    const nome = document.getElementById("nomeItem").value.trim();
    const tipo = document.getElementById("tipoItem").value;
    const forca = parseInt(document.getElementById("forcaItem").value);
    const defesa = parseInt(document.getElementById("defesaItem").value);
    const personagemId = parseInt(document.getElementById("personagemItem").value);

    if (!nome || !tipo || isNaN(forca) || isNaN(defesa) || isNaN(personagemId)) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    try {
        const item = new ItemMagico(Date.now(), nome, tipo, forca, defesa);
        const personagem = personagens.find(p => p.id === personagemId);
    
    if (!personagem) {
        alert("Personagem não encontrado.");
        return;
    }
    
    personagem.adicionarItem(item);
    salvarPersonagens();
    alert("Item adicionado ao personagem com sucesso!");
    
    document.getElementById("nomeItem").value = "";
    document.getElementById("tipoItem").value = "";
    document.getElementById("forcaItem").value = "";
    document.getElementById("defesaItem").value = "";
    document.getElementById("personagemItem").value = "";
    
    renderizarPersonagens(); 

    } catch (erro) {
        alert("Erro ao adicionar item: " + erro.message);
    }
    
}

function preencherSelectPersonagens() {
    const select = document.getElementById("personagemItem");
    select.innerHTML = `<option value="">Selecionar Personagem</option>`;

    personagens.forEach(p => {
        const option = document.createElement("option");
        option.value = p.id;
        option.textContent = `${p.nomeAventureiro} (Classe: ${p.classe})`;
        select.appendChild(option);
    });
}
  

carregarPersonagens();
preencherSelectPersonagens();
renderizarPersonagens();