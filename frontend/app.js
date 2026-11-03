
const API_URL = "/api/chamados";

// ELEMENTOS DA PÁGINA
const formulario = document.getElementById("formChamado");
const mensagem = document.getElementById("mensagem");
const containerChamados = document.getElementById("chamados");

// CADASTRAR CHAMADO
formulario.addEventListener("submit", async function(event) {
    event.preventDefault();

    const chamado = {
        titulo: document.getElementById("titulo").value.trim(),
        descricao: document.getElementById("descricao").value.trim(),
        solicitante: document.getElementById("solicitante").value.trim(),
        prioridade: document.getElementById("prioridade").value
    };

    try {
        mensagem.textContent = "Cadastrando chamado...";

        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(chamado)
        });

        if (!resposta.ok) {
            const erro = await resposta.text();
            throw new Error(erro);
        }

        const dados = await resposta.json();

        mensagem.textContent =
            `Chamado #${dados.id} cadastrado com sucesso!`;

        formulario.reset();

        await listarChamados();

    } catch (erro) {
        console.error("Erro ao cadastrar:", erro);
        mensagem.textContent =
            "Não foi possível cadastrar o chamado. Verifique o console.";
    }
});

// LISTAR CHAMADOS
async function listarChamados() {
    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Erro ao consultar chamados.");
        }

        const chamados = await resposta.json();

        containerChamados.innerHTML = "";

        chamados.forEach(chamado => {
            const card = document.createElement("div");
            card.className = "card-chamado";

            const titulo = document.createElement("h3");
            titulo.textContent = `#${chamado.id} - ${chamado.titulo}`;

            const descricao = document.createElement("p");
            descricao.textContent = chamado.descricao;

            const solicitante = document.createElement("p");
            solicitante.textContent =
                `Solicitante: ${chamado.solicitante}`;

            const prioridade = document.createElement("p");
            prioridade.textContent =
                `Prioridade: ${chamado.prioridade}`;

            const status = document.createElement("p");
            status.textContent = `Status: ${chamado.status}`;

            card.append(
                titulo,
                descricao,
                solicitante,
                prioridade,
                status
            );

            containerChamados.appendChild(card);
        });

    } catch (erro) {
        console.error("Erro ao listar chamados:", erro);
        containerChamados.textContent =
            "Não foi possível carregar os chamados.";
    }
}

// CARREGAR CHAMADOS AO ABRIR A PÁGINA
listarChamados();
