// Importar classes Bola e Time

import { Bola } from './bola.js';
import { Time } from './time.js';

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = 800;
const height = 600;

// Define tamanho fixo
canvas.width = width;
canvas.height = height;

// Cria os times com posições fixas e configura quantidade inicial
const timeVermelho = new Time(0, 30, 100, "red");
const timeAzul = new Time(width - 30, 30, 100, "blue");

// Define quantidade inicial de bolas
timeVermelho.bolasQuantidade = 10;
timeAzul.bolasQuantidade = 10;

const bolas = [];
let jogoAtivo = false;

/*Gerar um nnúmero inteiro aleatório entre min e max.*/
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*Atualizar o placar no canto superior esquerdo da tela */
function atualizarPlacar() {
  document.getElementById("score").textContent = `Vermelho: ${timeVermelho.gols} - Azul: ${timeAzul.gols}`;
}

/* Verifica se algum time fez 10 gols e encerra o jogo */
function verificarVencedor() {
  if (timeVermelho.gols >= 10) {
    jogoAtivo = false;
    alert("Time vermelho venceu");
  } else if (timeAzul.gols >= 10) {
    jogoAtivo = false;
    alert("Time azul venceu");
  }
}

/* Iniciar o jogo */
function iniciarJogo() {
  jogoAtivo = true;

  // Cria as bolas do time vermelho
  for (let i = 0; i < timeVermelho.bolasQuantidade; i++) {
    const tamanho = random(10, 20);
    const velX = (Math.random() < 0.5 ? -1 : 1) * timeVermelho.bolasVelocidade;
    const velY = (Math.random() < 0.5 ? -1 : 1) * random(1, 7);
    bolas.push(
      new Bola(
        random(tamanho, width - tamanho),
        random(tamanho, height - tamanho),
        velX,
        velY,
        "red",
        tamanho
      )
    );
  }

  // Cria as bolas do time azul
  for (let i = 0; i < timeAzul.bolasQuantidade; i++) {
    const tamanho = random(10, 20);
    const velX = (Math.random() < 0.5 ? -1 : 1) * timeAzul.bolasVelocidade;
    const velY = (Math.random() < 0.5 ? -1 : 1) * random(1, 7);
    bolas.push(
      new Bola(
        random(tamanho, width - tamanho),
        random(tamanho, height - tamanho),
        velX,
        velY,
        "blue",
        tamanho
      )
    );
  }
  atualizarPlacar();
}

/**Loop principal*/
function loop() {
  ctx.fillStyle = "rgba(167, 248, 167, 0.25)";
  ctx.fillRect(0, 0, width, height);

  timeVermelho.desenhar(ctx);
  timeAzul.desenhar(ctx);

  if (jogoAtivo) {
    // Clona o array para evitar problemas ao remover bolas durante o loop
    for (const bola of [...bolas]) {
      bola.desenhar(ctx);
      bola.atualizar(width, height);
      bola.detectarColisao(timeVermelho, timeAzul, (time) => {
        time.gols++;
        atualizarPlacar();
        verificarVencedor();
      }, bolas);
    }
  }

  requestAnimationFrame(loop);
}

// Eventos para atualizar configurações dos times
document.getElementById("vermelho-atualizar").onclick = () => {
  timeVermelho.h = Math.max(0, parseInt(document.getElementById("vermelho-tamanho-trave").value) || 0);
  timeVermelho.bolasQuantidade = Math.max(0, parseInt(document.getElementById("vermelho-quantidade-bolas").value) || 0);
  timeVermelho.bolasVelocidade = Math.max(0, parseInt(document.getElementById("vermelho-velocidade-bolas").value) || 0);
  timeVermelho.atualizarY();
};

document.getElementById("azul-atualizar").onclick = () => {
  timeAzul.h = Math.max(0, parseInt(document.getElementById("azul-tamanho-trave").value) || 0);
  timeAzul.bolasQuantidade = Math.max(0, parseInt(document.getElementById("azul-quantidade-bolas").value) || 0);
  timeAzul.bolasVelocidade = Math.max(0, parseInt(document.getElementById("azul-velocidade-bolas").value) || 0);
  timeAzul.atualizarY();
};

// Botão iniciar
document.getElementById("botao-iniciar").onclick = () => {
  if (!jogoAtivo) {
    iniciarJogo();
  }
};

// Botão resetar
document.getElementById("botao-resetar").onclick = () => {
  // Reseta configurações dos times para valores padrão
  timeVermelho.h = 100;
  timeVermelho.bolasQuantidade = 10;
  timeVermelho.bolasVelocidade = 5;
  timeVermelho.gols = 0;
  timeVermelho.atualizarY();

  timeAzul.h = 100;
  timeAzul.bolasQuantidade = 10;
  timeAzul.bolasVelocidade = 5;
  timeAzul.gols = 0;
  timeAzul.atualizarY();

  // Atualiza os inputs do formulário
  document.getElementById("vermelho-tamanho-trave").value = 100;
  document.getElementById("vermelho-quantidade-bolas").value = 10;
  document.getElementById("vermelho-velocidade-bolas").value = 5;

  document.getElementById("azul-tamanho-trave").value = 100;
  document.getElementById("azul-quantidade-bolas").value = 10;
  document.getElementById("azul-velocidade-bolas").value = 5;

  atualizarPlacar();
  bolas.length = 0;
  jogoAtivo = false;
  ctx.clearRect(0, 0, width, height);
  timeVermelho.desenhar(ctx);
  timeAzul.desenhar(ctx);
};

// Inicia o loop de animação
loop();
