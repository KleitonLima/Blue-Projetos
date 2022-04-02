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
  arlim = 0,
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
  }
  console.log(`Dia ${tempo.dia} - ${tempo.hora}h:${tempo.minuto}m`);
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
    let listaDestino = [, `(1) Resgatar a princesa Arlim`, `(2) Roubar a espada Lívera`, `(3) Buscar a pedra mística de Labuge`, `(4) Enfrentar o dragão Míssera`, `(5) Dormir`, , , , `(9) Desistir`];

    if (arlim < 1) {
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
    if (arlim > 0) {
      mostraStatus();
      console.log(`Você já resgatou a princesa. Siga nas outras missões!`);
      continuar();
    } else {
      mostraStatus();
      console.log(`Muito bem! Siga por este caminho e chegará até o cativeiro da princesa. Cuidado no caminho e boa sorte!`);
      console.log();
      continuar();

      // ALEATORIEDADE
      emboscada = dado();
      quantidadeInimigos = Math.floor(Math.random() * 3 + 2);

      if (emboscada % 2 == 0 && livera == 0) {
        passaHora(1);
        mostraStatus();
        console.log(`Emboscada!`);
        console.log(`Você deu de cara com ${quantidadeInimigos} Argadans. Não há como fugir, só te resta lutar.`);

        for (i = quantidadeInimigos; i > 0; passaMinuto(5)) {
          do {
            console.log();
            escolha = +prompt(`Deseja (1) ATACAR ou (2) DEFENDER: `);
            console.clear();
          } while (isNaN(escolha) || !Number.isInteger(escolha) || escolha < 1 || escolha > 2);

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
            break;
          }
        }
        if (personagem.vida <= 0) {
          console.clear();
          mostraTempo();
          console.log(`Você lutou bravamente mas, acabou morto.`);
          gameOver();
          break;
        }
        mostraStatus();
        console.log(`Você derrotou todos os inimigos.`);
        continuar();
        descanso();
        passaHora(1);
      } else if (emboscada % 2 == 0 && livera > 0) {
        passaHora(1);
        mostraStatus();
        console.log(`Emboscada!`);
        console.log(`Você deu de cara com ${quantidadeInimigos} Argadans.`);
        continuar();
        mostraStatus();
        console.log(`Quando os guardas avistaram você em posse da Lívera, tentaram fugir. Você não deixou, é claro, e acabou com todos eles.`);
        continuar();
        passaHora(1);
      } else {
        passaHora(2);
      }

      do {
        listaEscolha = [, `(1) DEIXAR SER PRESO E PLANEJAR UMA FUGA COM A PRINCESA NA PRISÃO`, `(2) ATACAR OS GUARDAS`, `(3) INVADIR SORRATEIRAMENTE ATÉ ENCONTRAR A PRINCESA`];
        mostraStatus();
        console.log(`Você chegou ao cativeiro! Você contou cerca de 30 soldados Argadans. Como deseja agir?`);
        console.log();
        console.log(listaEscolha[1]);
        console.log(listaEscolha[2]);
        console.log(listaEscolha[3]);
        escolha = +prompt();
      } while (isNaN(escolha) || !Number.isInteger(escolha) || escolha < 1 || escolha > 3);

      if (escolha == 1) {
        mostraStatus();
        passaHora(4);
        console.log(`Você se entregou e foi preso! Na prisão, a princesa Arlim te conta o plano de fuga dela.`);
        console.log(`Juntos, vocês conseguem fugir e voltar para a cidade!`);
        console.log();
        continuar();
        arlim++;
      } else if (escolha == 2) {
        if (livera == 0) {
          console.clear();
          mostraTempo();
          console.log(`Você travou um intensa batalha contra os Argadans, mas eles eram muitos e você acabou morto!`);
          gameOver();
          break;
        } else if (livera > 0) {
          mostraStatus();
          passaHora(2);
          passaMinuto(30);
          console.log(`Com a Lívera em mãos, os guardas não tiveram chance contra você, que derrotou todos eles`);
          console.log(`e salvou a princesa Arlim da prisão, voltando com ela para a cidade.`);
          continuar();
          arlim++;
        }
      } else if (escolha == 3) {
        jogada = dado();
        if (jogada % 2 == 0) {
          passaHora(3);
          mostraStatus();
          console.log(`Você conseguiu resgatar a princesa sem que ninguém percebesse. Juntos, vocês voltaram para cidade...`);
          console.log();
          continuar();
          arlim++;
        } else {
          do {
            listaEscolha = [, `(1) FUGIR DE VOLTA PRA CIDADE`, `(2) SE ENTREGAR E DEIXAR SER PRESO`, `(3) LUTAR`];
            passaHora(1);
            mostraStatus();
            console.log(`VOCÊ FOI AVISTADO! O QUE FAZER?`);
            console.log();
            console.log(listaEscolha[1]);
            console.log(listaEscolha[2]);
            console.log(listaEscolha[3]);
            escolha = +prompt();
          } while (isNaN(escolha) || !Number.isInteger(escolha) || escolha < 1 || escolha > 3);
          if (escolha == 1) {
            passaHora(2);
            mostraStatus();
            console.log(`Você conseguiu fugir de volta para a cidade!`);
            console.log();
            continuar();
          } else if (escolha == 2) {
            passaHora(4);
            mostraStatus();
            console.log(`Você se entregou e foi preso! Ao encontrar a princesa Arlim na prisão você descobre que ela já tinha um plano de fuga.`);
            console.log(`Juntos, vocês conseguem fugir e voltar a cidade.`);
            console.log();
            continuar();
            arlim++;
          } else if (escolha == 3) {
            if (livera == 0) {
              passaHora(1);
              mostraTempo();
              console.log(`Você travou uma intensa batalha mas, eles eram muitos e você foi morto!`);
              gameOver();
              break;
            } else if (livera > 0) {
              passaMinuto(30);
              mostraStatus();
              passaHora(2);
              console.log(`Você acabou com todos os guardas e resgatou a princesa Arlim. Juntos, voltaram pra cidade.`);
              continuar();
              arlim++;
            }
          }
        }
      }
    }
  } else if (destino == 2) {
    if (livera > 0) {
      mostraStatus();
      console.log(`Você já roubou a espada! Siga nas outras missões.`);
      continuar();
    } else {
      mostraStatus();
      console.log(`Perfeito! Desça por esse caminho e chegará a base dos Argadans, onde a espada está localizada.`);
      continuar();
      manada = dado();
      if (manada % 2 == 0) {
        passaHora(1);
        passaMinuto(30);
        mostraStatus();
        console.log(`Enquanto atravessava um imenso vale, você avistou uma manada de Orlus, animais maiores que elefantes.`);
        console.log(`Você precisa decidir como agir.`);
        continuar();
        do {
          mostraStatus();
          listaEscolha = [, `(1) SUBIR NA ÁRVORE`, `(2) CORRER PARA O INICIO DO VALE`, `(3) ESCONDER ATRÁS DA PEDRA`];
          console.log(`Pode subir em uma árvore no meio do vale...`);
          console.log(`Você pode tentar correr, antes que os Orlus te alcance, e voltar ao inicio do vale, à cerca de 1km...`);
          console.log(`Pode se esconder atrás de uma enorme pedra também no meio do vale....`);
          console.log();
          console.log(listaEscolha[1]);
          console.log(listaEscolha[2]);
          console.log(listaEscolha[3]);
          escolha = +prompt();
        } while (isNaN(escolha) || !Number.isInteger(escolha) || escolha < 1 || escolha > 3);

        if (escolha == 1) {
          manada = dado();
          if (manada % 2 == 0) {
            passaMinuto(20);
            mostraTempo();
            console.log(`Você subiu na árvore. A manada desviou e por pouco não derrubaram a árvore.`);
            continuar();
          } else {
            passaMinuto(10);
            mostraTempo();
            console.log(`Você subiu na árvore... mas, a manada acabou derrubando a árvore e você foi pisoteado.`);
            gameOver();
            break;
          }
        } else if (escolha == 2) {
          passaMinuto(10);
          mostraTempo();
          console.log(`Você correu muito rápido... só não, mais rápido que a manada que te pisoteou.`);
          gameOver();
          break;
        } else if (escolha == 3) {
          passaMinuto(20);
          mostraStatus();
          console.log(`Você chegou a pedra. A manada acabou desviando da pedra e você ficou protegido.`);
          continuar();
        }
        passaHora(1);
        passaMinuto(30);
      } else {
        passaHora(3);
      }
      do {
        mostraStatus();
        listaEscolha = [
          ,
          `(1) ATACAR QUEM APARECER PELA FRENTE...`,
          `(2) DAR A VOLTA, BUSCANDO UM MEIO DE ENTRAR SEM SER VISTO...`,
          `(3) SE ENTREGAR E TORCER PARA SER LEVADO PARA PRÓXIMO DA ESPADA E ENTÃO PLANEJAR ALGO PARA ROUBÁ-LA...`,
        ];
        console.log(`Você chegou a base! Há tantos guardas que você não conseguiu contar todos. Parou no 50.`);
        console.log(`Como você deseja agir?`);
        console.log();
        console.log(listaEscolha[1]);
        console.log(listaEscolha[2]);
        console.log(listaEscolha[3]);
        escolha = +prompt();
      } while (isNaN(escolha) || !Number.isInteger(escolha) || escolha < 1 || escolha > 3);
      if (escolha == 1) {
        mostraTempo();
        console.log(`Corajoso da sua parte, devo admitir. Mas, sem chance de derrotar mais de 50 Argadans sem a espada de Lívera.`);
        gameOver();
        break;
      } else if (escolha == 2) {
        passaMinuto(40);
        mostraStatus();
        quantidadeInimigos = Math.floor(Math.random() * 4 + 2);
        console.log(`Ao dar a volta, você achou uma brecha entre as pedras do morro, que permitiu que você entrasse até o local da espada.`);
        console.log(`Há ${quantidadeInimigos} guardas que você terá que lutar!`);
        console.log();

        for (i = quantidadeInimigos; i >= 1; passaMinuto(5)) {
          do {
            console.log();
            escolha = +prompt(`Deseja (1) ATACAR ou (2) DEFENDER: `);
            console.clear();
          } while (isNaN(escolha) || !Number.isInteger(escolha) || escolha < 1 || escolha > 2);

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
            break;
          }
        }
        if (personagem.vida <= 0) {
          console.clear();
          mostraTempo();
          console.log(`Mesmo com toda sua bravura, você acabou morto.`);
          gameOver();
          break;
        }

        mostraStatus();
        passaHora(3);
        passaMinuto(30);
        console.log(`Você derrotou os os guardas que vigiavam a espada. Em posse da Lívera, você derrotou todos os Argadans da base e voltou para a cidade.`);
        continuar();
        livera++;
        descanso();
      } else if (escolha == 3) {
        jogada = dado();
        if (jogada % 2 == 0) {
          mostraStatus();
          passaMinuto(15);
          console.log(`Você se entregou. Quando os guardas te levava para a prisão, você avistou a espada e num vacilo dos guardas, você conseguiu pegá-la.`);
          continuar();
          mostraStatus();
          passaHora(3);
          passaMinuto(30);
          console.log(`Com a Lívera em mãos, você derrotou todos os guardas da base e voltou para a cidade.`);
          continuar();
          livera++;
        } else {
          passaMinuto(15);
          mostraTempo();
          console.log(`Você se entregou e foi para a prisão. Lá, não conseguiu encontrar nenhuma maneira de escapar e roubar a espada. Ficará preso até a morte...`);
          gameOver();
          break;
        }
      }
    }
  } else if (destino == 3) {
    // DESTINO 3
    if (arlim == 0) {
      do {
        mostraStatus();
        console.log(`A princesa Arlim é a única conhecedora do caminho correto para encontrar a pedra de Labuge.`);
        console.log(`Sem ela, será pior que procurar uma agulha em um palheiro. Deseja prosseguir, mesmo assim?`);
        escolha = +prompt();
      } while (escolha != `s` && escolha != `n` && escolha != `sim` && escolha != `nao`);
    }
  }

  // DESTINO 4
  else if (destino == 4) {
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
