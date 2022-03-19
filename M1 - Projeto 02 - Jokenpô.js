console.clear();
const prompt = require("prompt-sync")();

// PROJETO NÃO FINALIZADO

// JOKENPÔ

// VARIAVÉIS    // USEI UMA VÍRGULA SEM NADA ANTES PRA INVÁLIDAR O ÍNDICE "0", SENDO POSSÍVEL SELECIONAR SOMENTE DE 1 Á 3
let elementos = [, `PEDRA`, `PAPEL`, `TESOURA`],
  escolhaU,
  escolhaIA,
  repete = `s`;

//CONDIÇÃO PARA JOGAR NOVAMENTE
while (repete == `s` || repete == `sim`) {
  console.clear();
  let pontosU = 0,
    pontosIA = 0,
    empate = 0,
    rodadasT = 0,
    rodadaA = 0;

  // CONDIÇÃO PARA ACEITAR SOMENTE NÚMEROS NA QUANTIDADE DE RODADAS
  do {
    rodadasT = +prompt(`Quantas rodadas você deseja jogar? `);
    console.clear();
  } while (Number.isNaN(rodadasT) || rodadasT > 10 || rodadasT < 0);

  console.clear();

  // ESCOLHA DO ÍNDICE PELO USUÁRIO
  for (i = 1; i <= rodadasT; i++) {
    escolhaU = +prompt(`Digite sua escolha (1)-PEDRA (2)-PAPEL (3)-TESOURA: `);
    console.clear();

    // CONDIÇÃO PRA SOMENTE ACEITAR UM NÚMERO E QUE SEJA DE 1 À 3
    while (escolhaU < 0 || escolhaU > 3 || isNaN(escolhaU)) {
      console.clear();
      console.log(`Digite 1 para PEDRA, 2 para PAPEL ou 3 para TESOURA`);
      console.log();

      escolhaU = +prompt(
        `Digite sua escolha (1)-PEDRA (2)-PAPEL (3)-TESOURA: `
      );
      console.clear();
    }

    // ESCOLHA DO ÍNDICE PELA MÁQUINA
    escolhaIA = Math.floor(Math.random() * 3 + 1);

    // SELECIONANDO O ÍNDICE NA LISTA PARA SER EXIBIDO O NOME DA ESCOLHA
    (escolhaU = elementos[escolhaU]), (escolhaIA = elementos[escolhaIA]);

    // EXIBINDO AS ESCOLHAS
    rodadaA++
    console.log(`Rodada ${rodadaA}`);
    console.log(`Você: ${escolhaU}`);
    console.log(`Máquina: ${escolhaIA}`);

    //EXIBINDO O RESULTADO DA RODADA
    if (escolhaU == escolhaIA) {
      console.log();
      console.log(`DEU EMPATE`);
      console.log(`______________________________________________________`);
      empate++;
    } else if (
      (escolhaU == `PAPEL` && escolhaIA == `PEDRA`) ||
      (escolhaU == `PEDRA` && escolhaIA == `TESOURA`) ||
      (escolhaU == `TESOURA` && escolhaIA == `PAPEL`)
    ) {
      console.log();
      console.log(`VOCÊ VENCEU! :)`);
      console.log(`______________________________________________________`);
      pontosU++;
    } else {
      console.log();
      console.log(`VOCÊ PERDEU! :(`);
      console.log(`______________________________________________________`);
      pontosIA++;
    }
  }

  // EXIBINDO O RESULTADO FINAL
  console.log(`RESULTADO FINAL`);
  console.log();
  console.log(`Você venceu ${pontosU}`);
  console.log(`Eu venci ${pontosIA}`);
  console.log(`Empates ${empate}`);
  console.log();

  if (pontosU == pontosIA) {
    console.log(`VOCÊS EMPATARAM`);
  } else if (pontosU > pontosIA) {
    console.log(`VOCÊ FOI O GRANDE CAMPEÃO!`);
  } else {
    console.log(`VOCÊ FOI DERROTADO!`);
  }
  console.log();

  // PERGUNTANDO SE QUER JOGAR NOVAMENTE
  do {
    repete = prompt(`Deseja jogar novamente? `).toLowerCase();
    console.clear();
  } while (
    repete != `s` &&
    repete != `sim` &&
    repete != `n` &&
    repete != `nao`
  );

  // ENCERRANDO O JOGO
  if (repete == `n` || repete == `nao`) {
    console.log(`Foi um prazer jogar com você! Volte mais vezes`);
  }
}

console.log();
