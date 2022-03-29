console.clear();
const prompt = require("prompt-sync")();

// PROJETO NÃO FINALIZADO

// JOGO DE FICÇÃO INTERATIVA

// VARIAVÉIS
let destino,
  emboscada,
  escolha,
  jogada,
  quantidadeInimigos,
  princesa = 0,
  livera = 0,
  missera = 0,
  labuge = 0;

// OBJETOS
let tempo = {
  dia: 1,
  hora: 5,
  minuto: 0,
};

let personagem = {
  forca: 3,
  resistencia: 3,
  energia: 20,
  vida: 10,
  ataque: function () {
    return this.forca * this.energia;
  },
  defesa: function () {
    return this.resistencia * this.energia;
  },
  ataqueComLivera: function () {
    return this.ataque() * 100;
  },
};

let dragao = {
  forca: 30,
  resistencia: 30,
  energia: 100,
  vida: 100,
  ataque: function () {
    return this.forca * this.energia;
  },
  defesa: function () {
    return this.resistencia * this.energia;
  },
};

// FUNÇÕES
function mostraTempo() {
  if (tempo.hora >= 24) {
    (tempo.hora -= 24), tempo.dia++;
  } else if (tempo.minuto >= 60) {
    (tempo.minuto -= 60), tempo.hora++;
  }
  console.log(`Dia ${tempo.dia} - ${tempo.hora}h:${tempo.minuto}m`);
}
function perdeVida(dano) {
  return (personagem.vida -= dano);
}
function perdeEnergia(esforco) {
  return (personagem.energia -= esforco);
}
function passaHora(addhora) {
  return (tempo.hora += addhora);
}
function passaMinuto(addminuto) {
  return (tempo.minuto += addminuto);
}
function mostraVida() {
  console.log(`Vida: ${personagem.vida}`);
}
function dado() {
  return Math.floor(Math.random() * 6 + 1);
}
function continuar() {
  prompt(`Pressione ENTER para continuar...`);
}

function descanso() {
  if (personagem.vida < 15) {
    do {
      console.log(`Vida: ${personagem.vida}`);
      console.log(`Você deseja descansar?`);
      escolha = prompt().toLowerCase();
      console.clear();
      if (escolha == `s` || escolha == `sim`) {
        passaHora(15 - personagem.vida);
        personagem.vida = 15;
        console.clear();
      }
    } while (escolha != `s` && escolha != `n` && escolha != `sim` && escolha != `nao`);
  }
}
function escolhaDestino() {
  do {
    console.clear();
    mostraTempo();
    mostraVida();
    console.log(`Por onde você deseja ir? `);
    if (princesa < 1) {
      console.log(`(1) Resgatar a prícesa Arlim?`);
    }
    if (livera < 1) {
      console.log(`(2) Roubar a espada Lívera?`);
    }
    if (missera < 1) {
      console.log(`(3) Enfrentar o dragão Míssera?`);
    }
    if (labuge < 1) {
      console.log(`(4) Buscar a pedra mística de Labuge?`);
    }
    destino = +prompt();
  } while (isNaN(destino) || !Number.isInteger(destino) || destino < 1 || destino > 4);
}

// ESCOLHA DO DESTINO
for (;;) {
  escolhaDestino();

  // DESTINO 1
  if (destino == 1) {
    console.clear();
    mostraTempo();
    console.log(`Muito bem! Siga por este caminho e chegará até o cativeiro da príncesa. Cuidado no caminho e boa sorte!`);
    console.log();
    continuar();

    // ALEATORIEDADE
    emboscada = dado();

    if (emboscada % 2 == 0) {
      console.clear();
      quantidadeInimigos = Math.floor(Math.random() * 3 + 2);
      console.clear();
      passaHora(1);
      mostraTempo();
      console.log(`Emboscada!`);
      console.log(`Você deu de cara com ${quantidadeInimigos} Argadans. Não há como fugir, só te resta lutar.`);

      for (i = quantidadeInimigos; i >= 1; passaMinuto(5)) {
        mostraVida();
        do {
          escolha = +prompt(`Deseja (1) ATACAR ou (2) DEFENDER: `);
          console.clear();
        } while (isNaN(destino) || !Number.isInteger(destino) || destino < 1 || destino > 2);

        jogada = dado();
        emboscada = dado();

        if (escolha == 1) {
          if (jogada >= emboscada) {
            i--;
            mostraTempo();
            console.log(`Você derrotou um inimigo, falta ${i}`);
            perdeEnergia(1);
          } else {
            mostraTempo();
            perdeEnergia(1);
            console.log(`O inimigo defendeu seu ataque e contra atacou!`);
            perdeVida(2);
          }
        }
        if (escolha == 2) {
          if (jogada >= emboscada) {
            mostraTempo();
            console.log(`Você defendeu o ataque inimigo e contra atacou`);
            perdeEnergia(1);
          } else {
            mostraTempo();
            perdeVida(2);
            console.log(`Você recebeu um ataque!`);
          }
        }
      }

      console.clear();
      mostraTempo();
      console.log(`Você derrotou todos os inimigos.`);

      descanso();

      passaHora(1);
    } else {
      console.clear;
      passaHora(2);
    }

    do {
      console.clear();
      mostraTempo();
      mostraVida(1);
      console.log(`Você chegou ao cativeiro! Você contou cerca de 15 soldados Argadans. Como deseja agir?`);
      console.log(`(1) DEIXAR SER PRESO E PLANEJAR UMA FULGA COM A PRINCESA NA PRISÃO`);
      console.log(`(2) ATACAR OS GUARDAS`);
      console.log(`(3) INVADIR SORRATEIRAMENTE ATÉ ENCONTRAR A PRINCESA`);
      escolha = +prompt();
    } while (isNaN(escolha) || !Number.isInteger(escolha) || escolha < 1 || escolha > 3);

    if (escolha == 1) {
      console.clear();
      mostraTempo();
      mostraVida();
      console.log(`Você se entregou e foi preso! Na prisão a princesa te conta o plano de fuga dela.`);
      console.log(`Juntos conseguiram fugir e voltaram para a cidade!`);
      console.log();
      continuar();
      passaHora(4);
      princesa++;
    } else if (escolha == 2) {
      console.clear();
      mostraTempo();

      console.log(`Você travou um intesna batalha contra os Argadans, mas eles eram muitos e você acabou morto!`);
      console.log();
      personagem.vida = 0;
      mostraVida();
      console.log();
      console.log(`#GAME OVER#`);
      console.log();
      break;
    } else {
      jogada = dado();
      if (jogada % 2 == 0) {
        console.clear();
        console.log(`Você conseguiu resgatar a princesa sem que ninguém percebesse. Juntos, vocês voltaram pra cidade...`);
        passaHora(3);
        console.log();
        continuar();
        princesa++;
      } else {
        do {
          console.clear();
          mostraTempo();
          mostraVida();
          console.log(`VOCÊ FOI AVISTADO! O QUE FAZER?`);
          console.log(`(1) FUGIR DE VOLTA PRA CIDADE`);
          console.log(`(2) SE ENTREGAR E DEIXAR SER PRESO`);
          console.log(`(3) LUTAR`);
          escolha = +prompt();
        } while (isNaN(escolha) || !Number.isInteger(escolha) || escolha < 1 || escolha > 4);
        if (escolha == 1) {
          console.clear();
          mostraTempo();
          mostraVida();
          passaHora(2);
          console.log(`Você conseguiu fugir de volta para a cidade!`);
          continuar();
        } else if (escolha == 2) {
          mostraTempo();
          passaHora(4);
          console.clear();
          console.log(`Você se entregou e foi preso! Ao encontrar a princesa na prisão você descobre que ela já tinha um plano de fuga.`);
          console.log(`Juntos, vocês conseguem fugir e voltar a cidade.`);
          console.log();
          continuar();
          princesa++;
        } else {
          console.clear();
          console.log(`Você travou uma intensa batalha mas, eles eram muitos e você foi morto!`);
          console.log();
          personagem.vida = 0;
          mostraTempo();
          console.log();
          console.log(`#GAME OVER#`);
          console.log();
          break;
        }
      }
    }
  }
}
