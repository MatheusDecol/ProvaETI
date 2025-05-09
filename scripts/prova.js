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
            const temAmuleto =this.itens.some(i =>i.tipo == "Amuleto");
            if(temAmuleto){
                throw new Error("O Personagem ja tem amuleto");
                
            };
        }
        this.itens.push(item);
    }
    
    removerItemPorId(itemId){
        this.itens = this.itens.filter(item => item.id !== itemId);
    }
    
    buscarAmuleto(){
        return this.itens.find(item => item.id == "Amuleto");
    }
}

class ItemMagico{
    constructor (id, nome, tipo, forca, defesa) {
        if(forca < 0 || defesa < 0 || forca > 10 || defesa > 10){
            throw new Error("A força e defesa devem ter valores de 0 a 10");
        }

        if(forca == 0 && defesa == 0){
            throw new Error("Um item não pode ter foça e defesas iguais a zero");
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

// ===================================================================================================================== \\

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


// ===================================================================================================================== \\

function salvarPersonagens() {
    localStorage.setItem("personagens", JSON.stringify(personagens));
}

// ===================================================================================================================== \\

function adicionarPersonagem() {
    const nome = document.getElementById("nome").value.trim();
    const nomeAventureiro = document.getElementById("nomeAventureiro").value.trim();
    const classe = document.getElementById("classe").value;
    const level = parseInt(document.getElementById("level").value);
    const forca = parseInt(document.getElementById("forca").value);
    const defesa = parseInt(document.getElementById("defesa").value);
  
    if (!nome || !nomeAventureiro || !classe || isNaN(level) || isNaN(forca) || isNaN(defesa)) {
        mostrarPopup("Preencha todos os campos corretamente!");
        return;
    }

    if (forca + defesa !== 10) {
        mostrarPopup("A soma de força e defesa deve ser exatamente 10");
        return;
    }
    
    const id = Date.now();
    const novoPersonagem = new Personagem(id, nome, nomeAventureiro, classe, level, forca, defesa);
    
    personagens.push(novoPersonagem);
    salvarPersonagens();
    mostrarPopup("Personagem cadastrado com sucesso!");
    
    document.getElementById("nome").value = "";
    document.getElementById("nomeAventureiro").value = "";
    document.getElementById("classe").value = "";
    document.getElementById("level").value = "";
    document.getElementById("forca").value = "";
    document.getElementById("defesa").value = "";

    renderizarPersonagens();
    preencherSelectPersonagens();
}

// ===================================================================================================================== \\

function removerPersonagem(id){
    if(confirm("Deseja remover o Personagem")){
        personagens = personagens.filter(p=> p.id !== id);
        salvarPersonagens();
        preencherSelectPersonagens();
        renderizarPersonagens();
        mostrarPopup("Personagem removido com sucesso!");
    }
}

// ===================================================================================================================== \\

function buscarPersonagemPorId(){
    const  id = parseInt(document.getElementById("buscarId").value);
    const resultado = document.getElementById("resultadoBusca");
    resultado.innerHTML = "";
    
    if(isNaN(id)){
        resultado.innerHTML = "<p>ID Inválido</p>";
        return;
    }

    const personagem = personagens.find(p => p.id === id);

    if(!personagem){
        mostrarPopup("Personagem não encontrado");
    }

    resultado.innerHTML = `
    <h3>${personagem.nomeAventureiro} (${personagem.classe})</h3>
    <p><strong>Nome:</strong> ${personagem.nome}</p>
    <p><strong>Level:</strong> ${personagem.level}</p>
    <p><strong>Força Total:</strong> ${personagem.getForcaTotal()}</p>
    <p><strong>Defesa Total:</strong> ${personagem.getDefesaTotal()}</p>
    <p><strong>Itens:</strong></p>
    <ul>
      ${
        personagem.itens.length > 0
          ? personagem.itens
              .map(item => `<li>${item.nome} (${item.tipo})</li>`)
              .join("")
          : "<li>Sem itens</li>"
      }
    </ul>
  `;
}

// ===================================================================================================================== \\

function atualizarNomeAventureiro(){
    const id = parseInt(document.getElementById("atualizarId").value);
    const novoNome = document.getElementById("novoNomeAventureiro").value.trim();
    const resultado = document.getElementById("resultadoAtualizacao");
    resultado.innerHTML = "";

    if (isNaN(id) || !novoNome) {
        mostrarPopup("ID inválido ou nome vazio");
        return;
    }
    
      const personagem = personagens.find(p => p.id === id);
    
    if (!personagem) {
        mostrarPopup("Personagem não encontrado");
        return;
    }

    personagem.nomeAventureiro = novoNome;
    salvarPersonagens();
    renderizarPersonagens();

    mostrarPopup("Nome do aventureiro atualizado com sucesso!");
    document.getElementById("atualizarId").value = "";
    document.getElementById("novoNomeAventureiro").value = "";
}

// ===================================================================================================================== \\

function renderizarPersonagens(){
    const container = document.getElementById("listaPersonagens");
    container.innerHTML = "";

    if (personagens.length === 0) {
        mostrarPopup("Nenhum personagem cadastrado");
        return;
      }

    personagens.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "personagem";
    div.innerHTML = `
        <h3>${p.nomeAventureiro} (${p.classe})</h3>
        <p><strong>ID:</strong> ${p.id}</p>
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
                    `<li><strong>ID:</strong> ${item.id} - ${item.nome} (${item.tipo}) 
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

// ===================================================================================================================== \\

function removerItemDoPersonagem(personagemId, itemId) {
    const personagem = personagens.find(p => p.id === personagemId);
  if (personagem) {
    personagem.removerItemPorId(itemId);
    salvarPersonagens();
    preencherSelectPersonagens();
    renderizarPersonagens();
    mostrarPopup("Item removido com sucesso!");
  }
}

// ===================================================================================================================== \\

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

// ===================================================================================================================== \\

function adicionarItemMagico(){
    const nome = document.getElementById("nomeItem").value.trim();
    const tipo = document.getElementById("tipoItem").value;
    const forca = parseInt(document.getElementById("forcaItem").value);
    const defesa = parseInt(document.getElementById("defesaItem").value);
    const personagemId = parseInt(document.getElementById("personagemItem").value);

    if (!nome || !tipo || isNaN(forca) || isNaN(defesa) || isNaN(personagemId)) {
        mostrarPopup("Preencha todos os campos corretamente!");
        return;
    }

    try {
        const item = new ItemMagico(Date.now(), nome, tipo, forca, defesa);
        const personagem = personagens.find(p => p.id === personagemId);
    
    if (!personagem) {
        mostrarPopup("Personagem não encontrado");
        return;
    }
    
    personagem.adicionarItem(item);
    salvarPersonagens();
    mostrarPopup("Item adicionado ao personagem com sucesso!");
    
    document.getElementById("nomeItem").value = "";
    document.getElementById("tipoItem").value = "";
    document.getElementById("forcaItem").value = "";
    document.getElementById("defesaItem").value = "";
    document.getElementById("personagemItem").value = "";
    
    renderizarPersonagens(); 

    } catch (erro) {
        mostrarPopup("Erro ao adicionar item: " + erro.message);
    }
    
}

// ===================================================================================================================== \\

function listarTodosItensMagicos(){
    const container = document.getElementById("resultadoItens");
    let todosItens = [];

    personagens.forEach(p => {
    p.itens.forEach(item => {
        todosItens.push({
        personagem: p.nomeAventureiro,
        ...item
        });
    });
    });

    if (todosItens.length === 0) {
        container.innerHTML = "<p>Nenhum item mágico cadastrado.</p>";
        return;
    }

    container.innerHTML = `
    <h3 class= "h3-itens">Todos os Itens Mágicos</h3>
    <ul>
      ${todosItens.map(item => `
        <li><strong>${item.nome}</strong> (${item.tipo}) - <em>ID: ${item.id}</em> | Força: ${item.forca}, Defesa: ${item.defesa}, Aventureiro: ${item.personagem}</li>
      `).join("")}
    </ul>
  `;

}

// ===================================================================================================================== \\

function buscarItemPorId(){
    const id = parseInt(document.getElementById("itemIdBusca").value);
    const resultado = document.getElementById("resultadoItemBusca");
  
    if (isNaN(id)) {
        resultado.innerHTML = "<p>ID inválido.</p>";
        return;
    }

    for (let p of personagens) {
        const item = p.itens.find(i => i.id === id);
        if (item) {
            resultado.innerHTML = `
            <h3>Item Encontrado</h3>
            <p><strong>Nome:</strong> ${item.nome}</p>
            <p><strong>Tipo:</strong> ${item.tipo}</p>
            <p><strong>Força:</strong> ${item.forca}</p>
            <p><strong>Defesa:</strong> ${item.defesa}</p>
            <p><strong>Personagem:</strong> ${p.nomeAventureiro}</p>
          `;
          return;
        }
      }
    
      resultado.innerHTML = "<p>Item não encontrado.</p>";
}

// ===================================================================================================================== \\

function buscarAmuletoDoPersonagem() {
    const id = parseInt(document.getElementById("idAmuleto").value);
    const resultado = document.getElementById("resultadoAmuleto");

    const personagem = personagens.find(p => p.id === id);
    if (!personagem) {
        resultado.innerHTML = "<p>Personagem não encontrado.</p>";
        return;
    }

    const amuleto = personagem.itens.find(i => i.tipo === "Amuleto");

    if (amuleto) {
        resultado.innerHTML = `
        <h3>Amuleto encontrado</h3>
        <p><strong>${amuleto.nome}</strong> - Força: ${amuleto.forca}, Defesa: ${amuleto.defesa}</p>
        `;
    } 
    else {
        resultado.innerHTML = "<p>Este personagem não possui amuleto.</p>";
    }
}

// ===================================================================================================================== \\

function mostrarPopup(conteudoHTML) {
    const overlay = document.getElementById("popup-overlay");
    const conteudo = document.getElementById("popup-content");
    conteudo.innerHTML = conteudoHTML;
    overlay.classList.remove("hidden");

    document.addEventListener("keydown", fecharComTecla);
}

// ===================================================================================================================== \\

function fecharPopup() {
    document.getElementById("popup-overlay").classList.add("hidden");

    document.removeEventListener("keydown", fecharComTecla);
}

// ===================================================================================================================== \\

function fecharComTecla(event) {
    fecharPopup();
}

// ===================================================================================================================== \\

  

carregarPersonagens();
preencherSelectPersonagens();
renderizarPersonagens();