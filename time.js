/*Classe que representa um time e sua trave*/
export class Time {
  constructor(x, w, h, cor) {
    this.x = x; // posição horizontal fixa da trave
    this.w = w; // largura da trave
    this.h = h; // altura da trave (tamanho ajustável)
    this.cor = cor; // cor do time
    this.bolasQuantidade = 10; // quantidade inicial de bolas
    this.bolasVelocidade = 5; // velocidade inicial das bolas
    this.gols = 0; // contador de gols do time
    this.atualizarY(); // calcula a posição vertical inicial da trave
  }

  /*Atualizar a posição vertical da trave para centralizá-la*/
  atualizarY() {
    this.y = 600 / 2 - this.h / 2; // canvas tem altura fixa em 600px
  }

  /*Desenhar a trave do time*/
  desenhar(ctx) {
    this.atualizarY(); // garante que a trave esteja centralizada verticalmente
    ctx.fillStyle = this.cor; // define a cor da trave
    ctx.fillRect(this.x, this.y, this.w, this.h); // desenha o retângulo da trave
  }
}
