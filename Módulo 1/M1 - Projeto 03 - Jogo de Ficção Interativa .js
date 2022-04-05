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
  livera = 1,
  missera = 0,
  labuge = 1;

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
  ataque: this.forca + this.energia,
  defesa: this.resistencia + this.energia,
};
let dragao = {
  forca: 30,
  resistencia: 30,
  energia: 100,
  vida: 100,
  ataque: this.forca + this.energia,
  defesa: this.resistencia * this.energia,
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
    if (labuge < 1) {
      console.log(listaDestino[3]);
    }
    if (missera < 1) {
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
    if (labuge > 0) {
      mostraStatus();
      console.log(`Você já encontrou a pedra de Labuge! Siga nas outras missões.`);
      continuar();
    } else if (arlim == 0) {
      do {
        mostraStatus();
        console.log(`A princesa Arlim é a única conhecedora do caminho correto para encontrar a pedra de Labuge.`);
        console.log(`Sem ela, será pior que procurar uma agulha em um palheiro. Deseja prosseguir, mesmo assim?`);
        escolha = prompt().toLowerCase();
      } while (escolha != `s` && escolha != `n` && escolha != `sim` && escolha != `nao`);
      if (escolha == `s` || escolha == `sim`) {
        mostraStatus();
        console.log(`Muito bem! Se prefere assim, não vou impedi-lo.`);
        console.log(`Siga por dentro da floresta, até o precipício. Dizem que a pedra pode ser encontrada nas paredes desse precipício.`);
        console.log(`Ninguém nunca voltou vivo pra contar a história se é verdade. Boa sorte!`);
        continuar();
        passaHora(4);
        mostraStatus();
        console.log(`Você chegou ao precipício, passou um bom tempo procurando algum indicio da pedra de Labuge mas, nada encontrou e voltou para a cidade.`);
        continuar();
        passaHora(2);
      }
    } else if (arlim > 0) {
      mostraStatus();
      console.log(`Muito bem! Siga com a princesa e ela te guiará pelo caminho correto!`);
      continuar();
      passaHora(2);
      mostraStatus();
      console.log(`Chegando a beira do precipício, a princesa começa a se guiar de uma maneira totalmente inacreditável,`);
      console.log(`até mesmo pra você um explorador tão habilidoso.`);
      continuar();
      passaHora(1);
      passaMinuto(30);
      mostraStatus();
      console.log(`Pouco a pouco, vocês vão descendo pela difícil parede do precipício, parando as vezes para a princesa se guiar,`);
      console.log(`seja lá como ela estivesse fazendo isso!`);
      continuar();
      passaHora(1);
      mostraStatus();
      console.log(`Chegando ao fim do precipício, guiados, no meio da escuridão, por uma tocha que você acendeu,`);
      console.log(`vocês chegam a entrada da caverna onde a princesa disse estar a pedra.`);
      continuar();
      mostraStatus();
      console.log(`Você fica fascinado com as escritas e desenhos nas paredes e segue passando a mão nelas, enquanto a princesa segue mais adiante.`);
      console.log(`Enquanto passava a mão nas paredes, você acaba tocando em uma Eslife, uma animal parecido com uma cobra e ela morde sua mão esquerda.`);
      continuar();
      perdeVida(1);
      listaEscolha = [, `(1) ARRANCAR A MÃO`, `(2) CHUPAR O LOCAL DA MORDIDA`, `(3) CORRER EM BUSCA DA PRINCESA`];
      mostraStatus();
      console.log(`Você precisa decidir rápido o que fazer:`);
      console.log(`Pode arrancar a mão com o facão pra evitar que, se houver veneno, se espalhe pelo corpo.`);
      console.log(`Chupar o local da mordida e cuspir o possivel veneno ou correr em busca dá princesa e pedir ajuda.`);
      continuar();
      do {
        mostraStatus();
        console.log(`O que você decide?`);
        console.log();
        console.log(listaEscolha[1]);
        console.log(listaEscolha[2]);
        console.log(listaEscolha[3]);
        escolha = +prompt();
      } while (isNaN(escolha) || !Number.isInteger(escolha) || escolha < 1 || escolha > 3);
      if (escolha == 1) {
        mostraStatus();
        passaMinuto(15);
        console.log(`Você amarrar um pedaço de pano no ante braço, apoia o braço na pedra e com o facão arranca a mão!`);
        console.log(`A princesa escuta seu grito de dor e corre ao seu encontro. Ao ver a picada em sua mão no chão ela diz que a Eslife não é um veneno mortal`);
        console.log(`e bastava apenas amarrar um pano no braço para evitar que a substância se espalha-se no corpo e causa-se alucinações.`);
        continuar();
        mostraStatus();
        console.log(`Por conta do sangramento, vocês precisam cancelar a busca pela pedra e voltar a cidade.`);
        continuar();
        passaHora(1);
        mostraTempo();
        console.log(`Na subida do penhasco, você se desequilibra e, sem a outra mão, não consegue se segurar e acaba caindo e morrendo...`);
        gameOver();
        break;
      } else if (escolha == 2) {
        jogada = dado();
        if (jogada % 2 == 0) {
          mostraStatus();
          console.log(`Você começa a chupar o local da mordida e cuspir. Repetidas vezes você repete isso...`);
          console.log(`De repente, as coisas começam a girar. Atordoado, você se segura na pedra`);
          continuar();
          mostraStatus();
          console.log(`Você avista uma criatura estranha se aproximando. Com o facão na mão você acerta a criatura que caí no chão.`);
          console.log(`Você fica ali parado até que tudo pare de girar. Ao observar novamente a criatura no chão, você vê que se tratava da princesa Arlim.`);
          continuar();
          mostraTempo();
          console.log(`A substância da Eslife devia ser alucinógena e fez você enxergar a princesa de outra forma!.`);
          console.log(`Com ela morta, você segue a busca sozinho mas, a língua escrita nas parede é totalmente desconhecida.`);
          console.log(`Você fica perdido nos labirintos, até a morte...`);
          gameOver();
          break;
        } else {
          mostraStatus();
          passaMinuto(10);
          console.log(`Você começa a chupar o local do ferimento. A princesa logo nota sua falta e volta ao seu encontro.`);
          console.log(`Ela manda você parar e amarra, muito apertado, um pano em seu braço. O veneno da Eslife não é fatal e sim alucinógeno.`);
          continuar();
          mostraStatus();
          console.log(`Em cerca de 1 hora o efeito deve passar. Com o pano amarrado no braço a substância não irá se espalhar pelo corpo. Assim, vocês voltam a busca.`);
          continuar();
        }
      } else if (escolha == 3) {
        mostraStatus();
        console.log(`Você vai ao encontro da princesa. Mostrando a ela o ferimento e descrevendo o animal, ela amarra um pano em seu braço, apertado muito forte.`);
        console.log(`O veneno da Eslife não é fatal, apenas alucinógeno. Assim, vocês continuam a busca.`);
        continuar();
      }
      descanso();
      mostraStatus();
      passaHora(3);
      console.log(`Horas depois de entrar na caverna, que é um labirinto que muda sempre, seguindo as escritas que a princesa foi traduzindo, vocês conseguem chegar ao final.`);
      continuar();
      mostraStatus();
      console.log(`No local, vocês avistam a pedra de Labuge, em um totem antigo. Na frente dele, 3 pequenos pedestais, cada um com um item diferente.`);
      continuar();
      mostraStatus();
      console.log(`No primeiro pedestal, uma moeda de ouro. No segundo uma maçã. No terceiro um pequeno jarro de barro com água.`);
      console.log(`Entre os pedestais e o totem, uma estátua de um ser humano ajoelhado, com as mãos juntas e estendidas para frente como se pedisse algo.`);
      continuar();
      mostraStatus();
      console.log(`A princesa lê o que está escrito na parede atrás: "Para a pedra de Labuge ter, é necessário saber o que é mais essencial para viver"`);
      console.log(`A moeda significa riqueza. A maçã alimento. A água ela mesma. Você deve entregar a estátua o correto para que a pedra seja entregue.`);
      console.log(`Caso contrário, tudo irá desabar e aqui, enterrados, ficaremos para sempre.`);
      continuar();
      do {
        listaEscolha = [, `(1) COLOCAR A MOEDA`, `(2) COLOCAR A MAÇÃ`, `(3) COLOCAR A ÁGUA`];
        mostraStatus();
        console.log(`O que deseja fazer?`);
        console.log();
        console.log(listaEscolha[1]);
        console.log(listaEscolha[2]);
        console.log(listaEscolha[3]);
        escolha = +prompt();
        console.log();
      } while (isNaN(escolha) || !Number.isInteger(escolha) || escolha < 1 || escolha > 3);
      if (escolha == 1) {
        passaMinuto(5);
        mostraTempo();
        console.log(`Você pega moeda e coloca na mão da estátua.`);
        console.log(`Tudo começou a tremer, a passagem por onde vocês entraram se fechou a estátua pegou fogo e tudo desmoronou.`);
        gameOver();
        break;
      } else if (escolha == 2) {
        passaMinuto(5);
        mostraTempo();
        console.log(`Você pega a maçã e coloca na mão da estátua.`);
        console.log(`A estátua começou a virar pó. Tudo ao redor começou a virar pó, enterrando vocês vivos!`);
        gameOver();
        break;
      } else if (escolha == 3) {
        passaMinuto(5);
        mostraStatus();
        console.log(`Você coloca o pequeno jarro com água na mão da estátua.`);
        console.log(`Começam a nascer flores na estátua que se alastram por todo o lado deixando tudo cheio de flores.`);
        console.log(`Uma enorme flor nasce no centro da sala. Ao desabrochar ela revela a pedra de Labuge dentro dela.`);
        continuar();
        passaMinuto(5);
        mostraStatus();
        console.log(`Ao pegar a pedra, as paredes atrás do totem se abrem, revelando uma saída.`);
        console.log(`Juntos e com a pedra de Labuge, vocês voltam para cidade!`);
        continuar();
        passaHora(3);
        labuge++;
      }
    }
  }

  // DESTINO 4
  else if (destino == 4) {
    escolha = `s`;
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
    } else if (livera > 0 && labuge == 0) {
      do {
        mostraStatus();
        console.log(`Sua chances de vencer o Míssera aumentam com a Lívera, porém o ideal seria também ter a pedra de Labuge para aumentar sua defesa.`);
        console.log(`Deseja prosseguir?`);
        escolha = prompt().toLowerCase();
      } while (escolha != `s` && escolha != `sim` && escolha != `n` && escolha != `nao`);
      if (escolha == `s` || escolha == `sim`) {
        mostraStatus();
        console.log(`Tudo bem! Mas, não diga que não foi avisado!`);
        console.log(`Suba por este caminho e chegará a caverna do dragão Míssera! Boa sorte!`);
        continuar();
      }
    } else if (livera == 0 && labuge > 0) {
      do {
        mostraStatus();
        console.log(`Você até vai conseguir se defender do dragão Míserra, porém seus ataques serão fracos contra a ele sem a espada de Lívera.`);
        console.log(`Deseja continuar?`);
        escolha = prompt().toLowerCase();
      } while (escolha != `s` && escolha != `sim` && escolha != `n` && escolha != `nao`);
      if (escolha == `s` || escolha == `sim`) {
        mostraStatus();
        console.log(`Tudo bem! Mas, não diga que não foi avisado!`);
        console.log(`Suba por este caminho e chegará a caverna do dragão Míssera! Boa sorte!`);
        continuar();
      }
    } else if (livera > 0 && labuge > 0) {
      mostraStatus();
      console.log(`Perfeito! Você está pronto para derrotar o Míssera! Seja forte e corajoso nessa batalha.`);
      continuar();
      mostraStatus();
      console.log(`Suba por este caminho e chegará ao covil do dragão Míssera! Boa sorte!`);
      continuar();
    }
    if (escolha == `s` || escolha == `sim`) {
      passaHora(5);
      mostraStatus();
      console.log(`Depois de horas subindo a montanha, finalmente você chega na caverna do dragão Míssera.`);
      continuar();
      do {
        mostraStatus();
        listaEscolha = [, `(1) Entrar sorrateiramente tentando não acordar o dragão`, `(2) Atraí-lo para fora da caverna`];
        console.log(`Como deseja agir?`);
        console.log();
        console.log(listaEscolha[1]);
        console.log(listaEscolha[2]);
        escolha = +prompt();
      } while (isNaN(escolha) || !Number.isInteger(escolha) || escolha < 1 || escolha > 2);
      if (escolha == 1) {
        passaMinuto(20);
        mostraStatus();
        console.log(`Você entra devagar caverna adentro. Então, você percebe que, por dentro, mais parece um castelo.`);
        console.log(`Com alguns candelabros e umas fogueiras acesas você vai se guiando e entrando ainda mais.`);
        continuar();
        mostraStatus();
        console.log(`Rápido e repentinamente atrás de você, saindo das sombras uma boca gigante e aberta vem em sua direção.`);
        continuar();
        if (labuge == 0) {
          mostraTempo();
          console.log(`Sem pedra de Labuge como escudo, você é mastigado e engolido em pedacinhos pelo Míssera.`);
          gameOver();
          break;
        } else if (labuge > 0) {
          mostraStatus();
          console.log(`Com a pedra e Labuge, você cria uma bola escudo ao seu redor que te protege da mordida mortal do Míssera.`);
          continuar();
          if (livera == 0) {
            mostraStatus();
            console.log(`O Míssera continua mordendo so escudo ao seu redor. Cospe fogo enquanto morde e vai destruindo o escudo pouco a pouco.`);
            console.log(`Sem a Lívera para atacá-lo só te resta esperar que ele solte... o que não acontece.`);
            continuar();
            mostraTempo();
            console.log(`Depois de dezenas de tentativas sem descanso, Míssera consegue quebrar uma parte do escudo, fazendo com que entre fogo e te queime,`);
            console.log(`até você não conseguir mais segurar o escudo Labuge e é devorado.`);
            gameOver();
            break;
          } else if (livera > 0) {
            mostraStatus();
            console.log(`Com a Lívera você fura a língua do Míssera, que se afasta e se levanta dentro da sua caverna.`);
            console.log(`Você contempla a grandiosidade do Míssera. Prepara a espada de Lívera e a pedra de Labuge para a batalha!`);
            continuar();
          }
        }
      }
    }
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
