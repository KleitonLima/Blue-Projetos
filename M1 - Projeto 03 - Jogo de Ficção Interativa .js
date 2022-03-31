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
  ataque: () => {
    return this.forca * this.energia;
  },
  defesa: () => {
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
  ataque: () => {
    return this.forca * this.energia;
  },
  defesa: () => {
    return this.resistencia * this.energia;
  },
};

// FUNÇÕES
mostraStatus = () => {
  if (tempo.hora >= 24) {
    (tempo.hora -= 24), tempo.dia++;
  } else if (tempo.minuto >= 60) {
    (tempo.minuto -= 60), tempo.hora++;
    console.log(`Vida: ${personagem.vida}`);
  }
  console.log(`Dia ${tempo.dia} - ${tempo.hora}h:${tempo.minuto}m`);
};
mostraTempo = () => {
  if (tempo.hora >= 24) {
    (tempo.hora -= 24), tempo.dia++;
  } else if (tempo.minuto >= 60) {
    (tempo.minuto -= 60), tempo.hora++;
    console.log(`Vida: ${personagem.vida}`);
  }
};
descanso = () => {
  if (personagem.vida < 15) {
    do {
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
};

perdeVida = (dano) => {
  return (personagem.vida -= dano);
};
perdeEnergia = (esforco) => {
  return (personagem.energia -= esforco);
};
passaHora = (addhora) => {
  return (tempo.hora += addhora);
};
passaMinuto = (addminuto) => {
  return (tempo.minuto += addminuto);
};
mostraVida = () => {
  console.log(`Vida: ${personagem.vida}`);
};
dado = () => {
  return Math.floor(Math.random() * 6 + 1);
};
continuar = () => {
  prompt(`Pressione ENTER para continuar...`);
};

escolhaDestino = () => {
  do {
    console.clear();
    mostraStatus();
    console.log(`Por onde você deseja ir? `);
    let escolhaDestino = [, `(1) Resgatar a príncesa Arlim`, `(2) Roubar a espada Lívera`, `(3) Enfrentar o dragão Míssera`, `(4) Buscar a pedra mística de Labuge`, `(5) Dormir`];
    if (princesa < 1) {
      console.log(escolhaDestino[1]);
    }
    if (livera < 1) {
      console.log(escolhaDestino[2]);
    }
    if (missera < 1) {
      console.log(escolhaDestino[3]);
    }
    if (labuge < 1) {
      console.log(escolhaDestino[4]);
    }
    if (tempo.hora >= 17 || tempo.hora < 5) {
      console.log(escolhaDestino[5]);
    }
    destino = +prompt();
  } while (isNaN(destino) || !Number.isInteger(destino) || destino < 1 || destino > 5);
};

// ESCOLHA DO DESTINO
while (true) {
  escolhaDestino();
  if (destino == 5) {
    (tempo.hora = 5), (tempo.minuto = Math.floor(Math.random() * 59 + 1)), tempo.dia++;
  }

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
      mostraStatus();
      console.log(`Emboscada!`);
      console.log(`Você deu de cara com ${quantidadeInimigos} Argadans. Não há como fugir, só te resta lutar.`);

      for (i = quantidadeInimigos; i >= 1; passaMinuto(5)) {
        do {
          escolha = +prompt(`Deseja (1) ATACAR ou (2) DEFENDER: `);
          console.clear();
        } while (isNaN(destino) || !Number.isInteger(destino) || destino < 1 || destino > 2);

        jogada = dado();
        emboscada = dado();

        if (escolha == 1) {
          if (jogada >= emboscada) {
            i--;
            mostraStatus();
            console.log(`Você derrotou um inimigo, falta ${i}`);
            perdeEnergia(1);
          } else {
            perdeEnergia(1);
            perdeVida(2);
            mostraStatus();
            console.log(`O inimigo defendeu seu ataque e contra atacou!`);
          }
        }
        if (escolha == 2) {
          if (jogada >= emboscada) {
            perdeEnergia(1);
            mostraStatus();
            console.log(`Você defendeu o ataque inimigo.`);
          } else {
            perdeVida(2);
            mostraStatus();
            console.log(`Você recebeu um ataque!`);
          }
        }
        if (personagem.vida <= 0) {
          console.clear();
          console.log(`Você foi morto!`);
          console.log();
          console.log(`#GAME OVER#`);
          break;
        }
      }
      if (personagem.vida <= 0) {
        console.clear();
        console.log(`Você foi morto!`);
        console.log();
        console.log(`#GAME OVER#`);
        break;
      }

      console.clear();
      mostraStatus();
      console.log(`Você derrotou todos os inimigos.`);

      descanso();

      passaHora(1);
    } else {
      console.clear;
      passaHora(2);
    }

    do {
      console.clear();
      mostraStatus();
      console.log(`Você chegou ao cativeiro! Você contou cerca de 15 soldados Argadans. Como deseja agir?`);
      console.log(`(1) DEIXAR SER PRESO E PLANEJAR UMA FULGA COM A PRINCESA NA PRISÃO`);
      console.log(`(2) ATACAR OS GUARDAS`);
      console.log(`(3) INVADIR SORRATEIRAMENTE ATÉ ENCONTRAR A PRINCESA`);
      escolha = +prompt();
    } while (isNaN(escolha) || !Number.isInteger(escolha) || escolha < 1 || escolha > 3);

    if (escolha == 1) {
      console.clear();
      mostraStatus();
      passaHora(4);
      console.log(`Você se entregou e foi preso! Na prisão a princesa te conta o plano de fuga dela.`);
      console.log(`Juntos conseguiram fugir e voltaram para a cidade!`);
      console.log();
      continuar();
      princesa++;
    } else if (escolha == 2) {
      console.clear();
      mostraTempo();
      console.log(`Você travou um intensa batalha contra os Argadans, mas eles eram muitos e você acabou morto!`);
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
        passaHora(3);
        mostraStatus();
        console.log(`Você conseguiu resgatar a princesa sem que ninguém percebesse. Juntos, vocês voltaram pra cidade...`);
        console.log();
        continuar();
        princesa++;
      } else {
        do {
          console.clear();
          passaHora(1);
          mostraStatus();
          console.log(`VOCÊ FOI AVISTADO! O QUE FAZER?`);
          console.log(`(1) FUGIR DE VOLTA PRA CIDADE`);
          console.log(`(2) SE ENTREGAR E DEIXAR SER PRESO`);
          console.log(`(3) LUTAR`);
          escolha = +prompt();
        } while (isNaN(escolha) || !Number.isInteger(escolha) || escolha < 1 || escolha > 4);
        if (escolha == 1) {
          console.clear();
          passaHora(2);
          mostraStatus();
          console.log(`Você conseguiu fugir de volta para a cidade!`);
          console.log();
          continuar();
        } else if (escolha == 2) {
          console.clear();
          passaHora(4);
          mostraStatus();
          console.log(`Você se entregou e foi preso! Ao encontrar a princesa na prisão você descobre que ela já tinha um plano de fuga.`);
          console.log(`Juntos, vocês conseguem fugir e voltar a cidade.`);
          console.log();
          continuar();
          princesa++;
        } else {
          console.clear();
          passaHora(1);
          mostraTempo();
          console.log(`Você travou uma intensa batalha mas, eles eram muitos e você foi morto!`);
          console.log();
          personagem.vida = 0;
          console.log();
          console.log(`#GAME OVER#`);
          console.log();
          break;
        }
      }
    }
  }
}
