console.clear();
const prompt = require("prompt-sync")();

// PROJETO NÃO FINALIZADO

let elementos = [, `PEDRA`, `PAPEL`, `TESOURA`],
  elementoU,
  elementoIA,
  rodadas = +prompt(`Quantas rodadas você deseja jogar? `),
  escolhaU,
  escolhaIA,
  resultado = 0;
console.clear();

for (i = 1; i <= rodadas; i++) {
  escolhaU = +prompt(`Digite sua escolha: (1)-PEDRA (2)-PAPEL (3)-TESOURA: `);
  console.clear();

  escolhaIA = Math.floor(Math.random() * 3 + 1);

  while (escolhaU < 0 || escolhaU > 3 || isNaN(escolhaU)) {
    console.clear();
    console.log(`Digite 1 para PEDRA, 2 para PAPEL ou 3 para TESOURA: `);
    console.log();

    escolhaU = +prompt(`Digite sua escolha: (1)-PEDRA (2)-PAPEL (3)-TESOURA: `);
    console.clear();
  }
  (elementoU = elementos[escolhaU]), (elementoIA = elementos[escolhaIA]);

  console.log(`Você: ${elementoU}`);
  console.log(`Máquina: ${elementoIA}`);

  if (elementoU == elementoIA) {
    console.log();
    console.log(`DEU EMPATE`);
    console.log();
  } else if (
    (elementoU == `PAPEL` && elementoIA == `PEDRA`) ||
    (elementoU == `PEDRA` && elementoIA == `TESOURA`) ||
    (elementoU == `TESOURA` && elementoIA == `PAPEL`)
  ) {
    console.log();
    console.log(`VOCÊ VENCEU! :)`);
    console.log();
    resultado++;
  } else {
    console.log();
    console.log(`VOCÊ PERDEU! :(`);
    console.log();
    resultado--;
  }
}
console.log(`RESULTADO FINAL`);
console.log();

if (resultado == 0) {
  console.log(`VOCÊS EMPATARAM`);
} else if (resultado > 0) {
  console.log(`VOCÊ FOI O GRANDE CAMPEÃO!`);
} else {
  console.log(`VOCÊ FOI DERROTADO!`);
}

console.log();
