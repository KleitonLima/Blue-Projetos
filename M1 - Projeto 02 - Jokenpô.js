console.clear();
const prompt = require("prompt-sync")();

// JOKENPÔ

// VARIAVÉIS GLOBAIS   // USEI UMA VÍRGULA SEM NADA ANTES PRA INVÁLIDAR O ÍNDICE "0", SENDO POSSÍVEL SELECIONAR SOMENTE DE 1 Á 3
let elementos = [, `PEDRA`, `PAPEL`, `TESOURA`],
  repete = `s`,
  conhece,
  escolhaU,
  escolhaIA;

console.log(`#Jokenpô#`);
console.log();
console.log(`Seja bem vindo ao Jokenpô!`);
console.log();
console.log(`Eu sou a July e irei jogar com você!`);
console.log();

do {
  conhece = prompt(console.log(`Antes de continuar, preciso saber se você conhece o jogo Jokenpô?`)).toLowerCase();
  console.clear();
} while (conhece != `sim` && conhece != `s` && conhece != `nao` && conhece != `n`);

if (conhece == `nao` || conhece == `n`) {
  do {
    console.log(`Tudo bem!`);
    console.log(`Pelo nome Jokenpô você pode não conhecer mas, tenho quase certeza que conhece`);
    conhece = prompt(console.log(`pelo nome PEDRA, PAPEL e TESOURA, não conhece?`)).toLowerCase();
    console.clear();
  } while (conhece != `sim` && conhece != `s` && conhece != `nao` && conhece != `n`);

  if (conhece == `nao` || conhece == `n`) {
    console.clear();
    console.log(`Então, deixa eu te explicar.`);
    console.log(`Jokenpô ou PEDRA, PAPEL e TESOURA, é um jogo onde você escolhe um entre os três elementos:`);
    console.log(`PEDRA, PAPEL ou TESOURA, sendo que PEDRA ganha de TESOURA e perde para o PAPEL.`);
    console.log(`PAPEL ganha da PEDRA e perde para a TESOURA. Já a TESOURA ganha do PAPEL e perde para a PEDRA.`);
    console.log(`Você deve escolher um e eu escolherei outro, ao final das rodadas que você definir veremos quem venceu.`);
    console.log();
    console.log(`Vamos começar a entender na prática.`);
    console.log();
    prompt(console.log(`Pressione ENTER para continuar...`));
  } else {
    console.log(`Perfeito! Então, vamos começar!`);
    console.log();
    prompt(console.log(`Pressione ENTER para continuar...`));
  }
} else {
  console.log(`Perfeito! Então, vamos começar!`);
  console.log();
  prompt(console.log(`Pressione ENTER para continuar...`));
}

// CONDIÇÃO PARA JOGAR NOVAMENTE
while (repete == `s` || repete == `sim`) {
  console.clear();

  // VARIAVÉIS
  let pontosU = 0,
    pontosIA = 0,
    empate = 0,
    rodadasT = 0,
    rodadaA = 0;

  // CONDIÇÃO PARA ACEITAR SOMENTE NÚMEROS NA QUANTIDADE DE RODADAS
  do {
    rodadasT = +prompt(`Quantas rodadas você deseja jogar?(Max=10) `);
    console.clear();
  } while (Number.isNaN(rodadasT) || rodadasT > 10 || rodadasT < 1);

  console.clear();

  // ESCOLHA DO ÍNDICE PELO USUÁRIO
  for (i = 1; i <= rodadasT; i++) {
    escolhaU = +prompt(`Digite sua escolha (1)-PEDRA (2)-PAPEL (3)-TESOURA: `);
    console.clear();

    // CONDIÇÃO PRA SOMENTE ACEITAR UM NÚMERO E QUE SEJA DE 1 À 3
    while (escolhaU < 1 || escolhaU > 3 || isNaN(escolhaU)) {
      console.clear();
      console.log(`Digite 1 para PEDRA, 2 para PAPEL ou 3 para TESOURA`);
      console.log();

      escolhaU = +prompt(`Digite sua escolha (1)-PEDRA (2)-PAPEL (3)-TESOURA: `);
      console.clear();
    }

    // ESCOLHA DO ÍNDICE PELA MÁQUINA
    escolhaIA = Math.floor(Math.random() * 3 + 1);

    // SELECIONANDO O ÍNDICE NA LISTA PARA SER EXIBIDO O NOME DA ESCOLHA
    (escolhaU = elementos[escolhaU]), (escolhaIA = elementos[escolhaIA]);

    // EXIBINDO AS ESCOLHAS
    rodadaA++;
    console.log(`Rodada ${rodadaA}`);
    console.log(`Você: ${escolhaU}`);
    console.log(`July: ${escolhaIA}`);

    //EXIBINDO O RESULTADO DA RODADA
    if (escolhaU == escolhaIA) {
      console.log();
      console.log(`DEU EMPATE :|`);
      console.log(`______________________________________________________`);
      empate++;
    } else if ((escolhaU == `PAPEL` && escolhaIA == `PEDRA`) || (escolhaU == `PEDRA` && escolhaIA == `TESOURA`) || (escolhaU == `TESOURA` && escolhaIA == `PAPEL`)) {
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
  console.log(`Rodadas jogadas: ${rodadasT}`);
  console.log();
  console.log(`Você venceu: ${pontosU}`);
  console.log(`July venceu: ${pontosIA}`);
  console.log(`Empate: ${empate}`);
  console.log();

  if (pontosU == pontosIA) {
    console.log(`VOCÊS EMPATARAM :o`);
    console.log();
    console.log(`Vamos jodar de novo pra definir um vencedor!`);
  } else if (pontosU > pontosIA) {
    console.log(`VOCÊ FOI O GRANDE CAMPEÃO! :D`);
    console.log();
    console.log(`Uau! Estou impressionada. Aposto que não consegue vencer de novo!`);
  } else {
    console.log(`VOCÊ FOI DERROTADO! :(`);
    console.log();
    console.log(`Não fique triste! Tente outra vez! Tenho certeza que terá mais sorte.`);
  }
  console.log();

  // PERGUNTANDO SE QUER JOGAR NOVAMENTE
  do {
    repete = prompt(`Deseja jogar novamente? `).toLowerCase();
    console.clear();
  } while (repete != `s` && repete != `sim` && repete != `n` && repete != `nao`);

  // ENCERRANDO O JOGO
  if (repete == `n` || repete == `nao`) {
    console.log(`Foi um prazer jogar com você! Volte mais vezes! :)`);
  }
}

console.log();
