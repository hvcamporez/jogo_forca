// ===== Dados =====
const listaDeFrutas = [
  'pera','banana','laranja','abacaxi','manga','uva','abacate','jaca','caju',
  'melancia','carambola','kiwi','goiaba','cereja','morango','maracuja','pessego',
  'pequi','pitanga','tangerina','tamarindo','jambo','jabuticaba','groselha',
  'figo','framboesa','caqui','cacau','amora'
];

// ===== Variáveis do jogo =====
let palavraEscolhida = "";
let palavraOculta = "";
let erros = 0;
let statusJogo = "andamento";

// ===== Inicialização =====
iniciarJogo();

function iniciarJogo() {
  palavraEscolhida = listaDeFrutas[
    Math.floor(Math.random() * listaDeFrutas.length)
  ];

  const primeiraLetra = palavraEscolhida[0];
  palavraOculta = primeiraLetra + "_".repeat(palavraEscolhida.length - 1);

  erros = 0;
  statusJogo = "andamento";

  document.getElementById("tamanho").textContent = palavraEscolhida.length;
  atualizarTela();
}

// ===== Função principal =====
function jogar() {
  if (statusJogo !== "andamento") return;

  const input = document.getElementById("letra");
  const letra = input.value.toLowerCase();
  input.value = "";

  if (!validarLetraDigitada(letra)) {
    mostrarMensagem("Digite apenas UMA letra válida!", "orange");
    return;
  }

  if (verificarLetraPresenteNaPalavra(palavraEscolhida, letra)) {
    palavraOculta = atualizarPalavraOculta(palavraOculta, letra, palavraEscolhida);

    if (verificarJogoGanho(palavraOculta, palavraEscolhida)) {
      statusJogo = "venceu";
      exibirMensagemFimDeJogo();
    } else {
      mostrarMensagem("Letra correta!", "lightgreen");
    }

  } else {
    erros++;
    const chances = jogadasRestantes(erros);

    if (chances > 0) {
      mostrarMensagem(`Letra errada! Você ainda tem ${chances} chance(s).`, "red");
    } else {
      statusJogo = "perdeu";
      exibirMensagemFimDeJogo();
    }
  }

  atualizarTela();
}

// ===== Funções lógicas =====
function atualizarPalavraOculta(palavraOculta, letraDigitada, palavraEscolhida) {
  let array = palavraOculta.split("");

  for (let i = 0; i < palavraEscolhida.length; i++) {
    if (palavraEscolhida[i] === letraDigitada) {
      array[i] = letraDigitada;
    }
  }

  return array.join("");
}

function validarLetraDigitada(letra) {
  return letra.length === 1 && letra.match(/[a-z]/);
}

function verificarJogoGanho(palavraOculta, palavraEscolhida) {
  return palavraOculta === palavraEscolhida;
}

function verificarLetraPresenteNaPalavra(palavraEscolhida, letraDigitada) {
  return palavraEscolhida.includes(letraDigitada);
}

function jogadasRestantes(erros) {
  return 4 - erros;
}

function exibirMensagemFimDeJogo() {
  if (statusJogo === "venceu") {
    mostrarMensagem("🎉 VOCÊ VENCEU!!", "lightgreen");
  } else {
    mostrarMensagem(`💀 VOCÊ PERDEU!! A palavra era: ${palavraEscolhida}`, "red");
  }

  document.getElementById("btnReiniciar").classList.remove("hidden");
}

// ===== UI =====
function atualizarTela() {
  document.getElementById("palavraOculta").textContent = palavraOculta;
  document.getElementById("chances").textContent =
    `Chances restantes: ${jogadasRestantes(erros)}`;
}

function mostrarMensagem(texto, cor) {
  const msg = document.getElementById("mensagem");
  msg.textContent = texto;
  msg.style.color = cor;
}

function reiniciar() {
  document.getElementById("btnReiniciar").classList.add("hidden");
  document.getElementById("mensagem").textContent = "";
  iniciarJogo();
}
