console.clear();
const prompt = require("prompt-sync")();

// PROJETO NÃO FINALIZADO

let elementos = [, `PEDRA`, `PAPEL`, `TESOURA`],
  rodadas = +prompt(`Quantas rodadas você deseja jogar? `),
  escolhaU,
  escolhaIA,
  resultado;
console.clear();

for (i = 1; i <= rodadas; i++) {
  escolhaU = +prompt(`Digite sua escolha: (1) PEDRA (2) PAPEL (3) TESOURA`);
  console.clear();

  escolhaIA = Math.floor(Math.random() * 3 + 1);

  while (escolhaU < 0 || escolhaU > 3 || isNaN(escolhaU)) {
    console.clear();
    console.log(`Digite 1 para PEDRA, 2 para PAPEL ou 3 para TESOURA`);
    console.log();

    escolhaU = +prompt(`Digite sua escolha: (1) PEDRA (2) PAPEL (3) TESOURA`);
    console.clear();
  }
  console.log(`Você: ${elementos[escolhaU]}`);
  console.log(`Máquina: ${elementos[escolhaIA]}`);

  if (escolhaU == escolhaIA) {
    console.log();
    console.log(`DEU EMPATE`);
  } else if (
    (escolhaU == `PAPEL` && escolhaIA == `PEDRA`,
    escolhaU == `PEDRA` && escolhaIA == `TESOURA`,
    escolhaU == `TESOURA` && escolhaIA == `PAPEL`)
  ) {
    console.log(`VOCÊ VENCEU! :)`);
  } else {
    console.log(`VOCÊ PERDEU! :(`);
  }
  console.log();
}
console.log();
