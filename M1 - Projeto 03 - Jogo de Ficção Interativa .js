console.clear();
const prompt = require("prompt-sync")();

// PROJETO NÃO FINALIZADO

let personagem = {
  forca: 3,
  resistencia: 3,
  energia: 10,
  ataque: function () {
    return this.forca * this.energia;
  },
  defesa: function () {
    return this.resistencia * this.energia;
  },
};
let espada = personagem.ataque() * 100;

let dragao = {
  forca: 30,
  resistencia: 30,
  energia: 100,
  ataque: function () {
    return this.forca * this.energia;
  },
  defesa: function () {
    return this.resistencia * this.energia;
  },
};

console.log();
