/*Classe que representa uma bola no jogo*/
export class Bola {
  constructor(x, y, velX, velY, cor, tamanho) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.cor = cor;
    this.tamanho = tamanho;
  }

  /*Desenhar a bola */
  desenhar(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.cor;
    ctx.arc(this.x, this.y, this.tamanho, 0, 2 * Math.PI);
    ctx.fill();
  }

  /*Atualizar a posição da bola */
  atualizar(width, height) {
    // Inverte a direção horizontal ao colidir com as bordas laterais
    if (this.x + this.tamanho >= width) this.velX = -Math.abs(this.velX);
    if (this.x - this.tamanho <= 0) this.velX = Math.abs(this.velX);

    // Inverte a direção vertical ao colidir com as bordas superior e inferior
    if (this.y + this.tamanho >= height) this.velY = -Math.abs(this.velY);
    if (this.y - this.tamanho <= 0) this.velY = Math.abs(this.velY);

    // Atualizar a posição da bola
    this.x += this.velX;
    this.y += this.velY;
  }

  /*Detectar colisão da bola com as traves dos times e atualiza o placar.
   *Remover a bola do jogo após marcar gol*/
  detectarColisao(timeVermelho, timeAzul, callbackGol, bolasArray) {
    // Verifica colisão com a trave do time vermelho
    if (
      this.x - this.tamanho < timeVermelho.x + timeVermelho.w &&
      this.y > timeVermelho.y &&
      this.y < timeVermelho.y + timeVermelho.h &&
      this.cor !== timeVermelho.cor
    ) {
      callbackGol(timeAzul); // Gol para o time azul
      const idx = bolasArray.indexOf(this);
      if (idx > -1) bolasArray.splice(idx, 1); // Remove a bola que marcou gol
    }
    // Verifica colisão com a trave do time azul
    if (
      this.x + this.tamanho > timeAzul.x &&
      this.y > timeAzul.y &&
      this.y < timeAzul.y + timeAzul.h &&
      this.cor !== timeAzul.cor
    ) {
      callbackGol(timeVermelho); // gol para o time vermelho
      const idx = bolasArray.indexOf(this);
      if (idx > -1) bolasArray.splice(idx, 1);
    }
  }
}
