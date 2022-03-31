console.clear();
const prompt = require("prompt-sync")();

// PROJETO NÃO FINALIZADO

// JOGO DE FICÇÃO INTERATIVA

// VARIÁVEIS
let destino,
  emboscada,
  escolha,
  jogada,
  quantidadeInimigos,
  manada,
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
  energia: 10,
  vida: 15,
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
  console.log();
  prompt(`Pressione ENTER para continuar...`);
};
gameOver = () => {
  console.log();
  personagem.vida = 0;
  mostraVida();
  console.log();
  console.log(`#GAME OVER#`);
  console.log();
};
mostraStatus = () => {
  console.clear();
  if (tempo.hora >= 24) {
    (tempo.hora -= 24), tempo.dia++;
  } else if (tempo.minuto >= 60) {
    (tempo.minuto -= 60), tempo.hora++;
  }
  console.log(`Dia ${tempo.dia} - ${tempo.hora}h:${tempo.minuto}m`);
  console.log(`Vida: ${personagem.vida}`);
};
mostraTempo = () => {
  console.clear();
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
      console.clear();
      mostraStatus();
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
escolhaDestino = () => {
  do {
    console.clear();
    mostraStatus();
    console.log(`Por onde você deseja ir? `);
    let listaDestino = [, `(1) Resgatar a princesa Arlim`, `(2) Roubar a espada Lívera`, `(3) Enfrentar o dragão Míssera`, `(4) Buscar a pedra mística de Labuge`, `(5) Dormir`, , , , `(9) Desistir`];

    if (princesa < 1) {
      console.log(listaDestino[1]);
    }
    if (livera < 1) {
      console.log(listaDestino[2]);
    }
    if (missera < 1) {
      console.log(listaDestino[3]);
    }
    if (labuge < 1) {
      console.log(listaDestino[4]);
    }
    if (tempo.hora >= 17 || tempo.hora < 5) {
      console.log(listaDestino[5]);
    }
    console.log(listaDestino[9]);
    destino = +prompt();
  } while (isNaN(destino) || !Number.isInteger(destino) || destino < 1 || destino > 9);
};

// ESCOLHA DO DESTINO
while (true) {
  escolhaDestino();

  // DESTINO 1
  if (destino == 1) {
    console.clear();
    mostraTempo();
    console.log(`Muito bem! Siga por este caminho e chegará até o cativeiro da princesa. Cuidado no caminho e boa sorte!`);
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
          } else {
            perdeVida(2);
            mostraStatus();
            console.log(`O inimigo defendeu seu ataque e contra atacou!`);
          }
        }
        if (escolha == 2) {
          if (jogada >= emboscada) {
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
          gameOver();
          break;
        }
      }
      if (personagem.vida <= 0) {
        console.clear();
        gameOver();
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
      console.log(`(1) DEIXAR SER PRESO E PLANEJAR UMA FUGA COM A PRINCESA NA PRISÃO`);
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
      gameOver();
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
          gameOver();
          break;
        }
      }
    }
  }

  // DESTINO 2
  else if (destino == 2) {
    mostraStatus();
    console.log(`Perfeito! Desça por esse caminho e chegará a base dos Argadans, onde a espada está localizada.`);
    continuar();
    manada = dado();
    if (manada % 2 == 0) {
      mostraStatus();
      console.log(`Enquanto atravessava um imenso vale, você avistou uma manada de Orlus, animais maiores que elefantes.`);
      console.log(`Você precisa decidir como agir...`);
      continuar();
      mostraStatus();
      console.log(`Pode tentar correr mais que os Orlus e voltar ao inicio do vale, à cerca de 1km...`);
      console.log(`Pode se esconder atrás de uma enorme pedra no meio do vale....`);
      console.log(`Subir em uma árvore também no meio do vale...`);
      console.log();
      console.log(`(1) CORRER PARA O INICIO DO VALE`);
      console.log(`(2) ESCONDER ATRÁS DA PEDRA`);
      console.log(`(3) SUBIR NA ÁRVORE`);
      escolha = +prompt();
      if (escolha == 1) {
        addminuto(10);
        mostraTempo();
        console.log(`Você correu muito rápido... só não, mais rápido que a manada que te pisoteou.`);
        gameOver();
        break;
      }
    }
  }

  // DESTINO 3
  else if (destino == 3) {
    if (livera == 0 && labuge == 0) {
      do {
        mostraStatus();
        console.log(`Você não terá chance contra o dragão Míssera sem a espada Lívera e a pedra Labuge.`);
        escolha = prompt(`Deseja mesmo continuar? `).toLowerCase();
      } while (escolha != `s` && escolha != `n` && escolha != `sim` && escolha != `nao`);
      if (escolha == `s` || escolha == `sim`) {
        mostraStatus();
        console.log(`Tudo bem! Mas, não diga que não foi avisado!`);
        console.log(`Suba por este caminho e chegará a caverna do dragão Míssera! Boa sorte!`);
        continuar();
      }
    }
    console.log();
  }

  // DESTINO 5
  else if (destino == 5) {
    (tempo.hora = 5), (tempo.minuto = Math.floor(Math.random() * 59 + 1)), tempo.dia++;
  }

  // DESTINO 9
  else if (destino == 9) {
    break;
  }
}
