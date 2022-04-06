console.clear();
const prompt = require("prompt-sync")();

// JOGO DE FICÇÃO INTERATIVA

// HISTÓRIA
console.log(`Gerald, explorava a floresta Amazônica em busca de novas descobertas.
De repente sentiu um grande tremor que sacudiu até as maiores árvores!
Ali próximo ele ouviu um enorme estrondo. Chegando perto para conferir deu de cara com uma imensa cratera.
Não iria descer para olhar se não tivesse visto um estranho líquido que ondulava na parede.
Chegando mais perto notou que formava um círculo e não refletia sua imagem. Na verdade parecia ter algo lá dentro.
Com a ponta do dedo ele tocou no líquido e rapidamente foi sugado para dentro dele.`);
continuar();
console.log(`Acordando em outra floresta, totalmente diferente de onde estava, ele se levantou e seguiu os sons do que parecia ser um vilarejo próximo.
Chegando nele deu de cara com uma feira. As pessoas do local se vestiam estranho e olhavam pra ele. Pensando bem, ele era o estranho ali.
Um homem de uma das barracas o chamou para conversar. Sabendo que não era dali o homem conta que ele está na dimensão Uruzar.
Uma dimensão oculta da terra convencional. Faz um teste com ele que revela que ele é o escolhido para salvar aquela dimensão.`);
continuar();
console.log(`Durante séculos vivemos em completa paz. Até que alguém libertou o dragão Míssera. Depois de solto, ele aprisionou a princesa Arlim,
tomou para sí a espada de Lívera que é a única maneira de derrotá-lo e vem atacando todas as vilas que se opõem a ele.
Você deve derrotar o Míssera, usando a espada de Livera e a pedra de Labuge e resgatar a princesa Arlim para que ela te ajude a voltar para casa.`);

// VARIÁVEIS
let destino,
  emboscada,
  escolha,
  jogada,
  quantidadeInimigos,
  manada,
  gerald,
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
  ataque: 3,
  defesa: 3,
  vida: 15,
  ataqueLivera: function () {
    this.energia--;
    return this.ataque * 20;
  },
  defesaLabuge: function () {
    return this.defesa * 10;
  },
};

let dragao = {
  ataque: 30,
  defesa: 30,
  vida: 150,
};

// FUNÇÕES

perdeVidaPers = (dano) => {
  return (personagem.vida -= dano);
};
perdeVidaDrag = (dano) => {
  return (dragao.vida -= dano);
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
statusPers = () => {
  console.clear();
  if (tempo.hora >= 24) {
    (tempo.hora -= 24), tempo.dia++;
  } else if (tempo.minuto >= 60) {
    (tempo.minuto -= 60), tempo.hora++;
  }
  console.log(`Dia ${tempo.dia} - ${tempo.hora}h:${tempo.minuto}m`);
  console.log(`Vida: ${personagem.vida}`);
};
statusDrag = () => {
  return console.log(`Vida Míssera: ${dragao.vida}`);
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
      statusPers();
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
    statusPers();
    console.log(`Por onde você deseja ir? `);
    let listaDestino = [
      ,
      `(1) Resgatar a princesa Arlim`,
      `(2) Roubar a espada Lívera`,
      `(3) Buscar a pedra mística de Labuge`,
      `(4) Enfrentar o dragão Míssera`,
      `(5) Voltar para terra`,
      `(6) Dormir`,
      `(7) Desistir`,
    ];

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
    if (livera > 0 && arlim > 0 && labuge > 0) {
      console.log(listaDestino[5]);
    }
    if (tempo.hora >= 17 || tempo.hora < 5) {
      console.log(listaDestino[6]);
    }
    if (missera == 0) {
      console.log(listaDestino[7]);
    }
    destino = +prompt();
  } while (isNaN(destino) || !Number.isInteger(destino) || destino < 1 || destino > 7);
};

// ESCOLHA DO DESTINO
while (true) {
  descanso();
  escolhaDestino();

  // DESTINOS
  if (destino == 1) {
    if (arlim > 0) {
      statusPers();
      console.log(`Você já resgatou a princesa. Siga nas outras missões!`);
      continuar();
    } else {
      statusPers();
      console.log(`Muito bem! Siga por este caminho e chegará até o cativeiro da princesa. Cuidado no caminho e boa sorte!`);
      continuar();

      // ALEATORIEDADE
      emboscada = dado();
      quantidadeInimigos = Math.floor(Math.random() * 3 + 2);

      if (emboscada % 2 == 0 && livera == 0) {
        passaHora(1);
        statusPers();
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
              statusPers();
              console.log(`Você derrotou um inimigo, falta ${i}`);
            } else {
              perdeVidaPers(2);
              statusPers();
              console.log(`O inimigo defendeu seu ataque e contra atacou!`);
            }
          }
          if (escolha == 2) {
            if (jogada >= emboscada) {
              statusPers();
              console.log(`Você defendeu o ataque inimigo.`);
            } else {
              perdeVidaPers(2);
              statusPers();
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
        statusPers();
        console.log(`Você derrotou todos os inimigos.`);
        continuar();
        descanso();
        passaHora(1);
      } else if (emboscada % 2 == 0 && livera > 0) {
        passaHora(1);
        statusPers();
        console.log(`Emboscada!`);
        console.log(`Você deu de cara com ${quantidadeInimigos} Argadans.`);
        continuar();
        statusPers();
        console.log(`Quando os guardas avistaram você em posse da Lívera, tentaram fugir. Você não deixou, é claro, e acabou com todos eles.`);
        continuar();
        passaHora(1);
      } else {
        passaHora(2);
      }

      do {
        listaEscolha = [, `(1) DEIXAR SER PRESO E PLANEJAR UMA FUGA COM A PRINCESA NA PRISÃO`, `(2) ATACAR OS GUARDAS`, `(3) INVADIR SORRATEIRAMENTE ATÉ ENCONTRAR A PRINCESA`];
        statusPers();
        console.log(`Você chegou ao cativeiro! Você contou cerca de 30 soldados Argadans. Como deseja agir?`);
        console.log();
        console.log(listaEscolha[1]);
        console.log(listaEscolha[2]);
        console.log(listaEscolha[3]);
        escolha = +prompt();
      } while (isNaN(escolha) || !Number.isInteger(escolha) || escolha < 1 || escolha > 3);

      if (escolha == 1) {
        passaHora(4);
        statusPers();
        console.log(`Você se entregou e foi preso! Na prisão, a princesa Arlim te conta o plano de fuga dela.`);
        console.log(`Juntos, vocês conseguem fugir e voltar para a cidade!`);
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
          passaHora(2);
          passaMinuto(30);
          statusPers();
          console.log(`Com a Lívera em mãos, os guardas não tiveram chance contra você, que derrotou todos eles`);
          console.log(`e salvou a princesa Arlim da prisão, voltando com ela para a cidade.`);
          continuar();
          arlim++;
        }
      } else if (escolha == 3) {
        jogada = dado();
        if (jogada % 2 == 0) {
          passaHora(3);
          statusPers();
          console.log(`Você conseguiu resgatar a princesa sem que ninguém percebesse. Juntos, vocês voltaram para cidade...`);
          continuar();
          arlim++;
        } else {
          do {
            listaEscolha = [, `(1) FUGIR DE VOLTA PRA CIDADE`, `(2) SE ENTREGAR E DEIXAR SER PRESO`, `(3) LUTAR`];
            passaHora(1);
            statusPers();
            console.log(`VOCÊ FOI AVISTADO! O QUE FAZER?`);
            console.log();
            console.log(listaEscolha[1]);
            console.log(listaEscolha[2]);
            console.log(listaEscolha[3]);
            escolha = +prompt();
          } while (isNaN(escolha) || !Number.isInteger(escolha) || escolha < 1 || escolha > 3);

          if (escolha == 1) {
            passaHora(2);
            statusPers();
            console.log(`Você conseguiu fugir de volta para a cidade!`);
            continuar();
          } else if (escolha == 2) {
            passaHora(4);
            statusPers();
            console.log(`Você se entregou e foi preso! Ao encontrar a princesa Arlim na prisão você descobre que ela já tinha um plano de fuga.`);
            console.log(`Juntos, vocês conseguem fugir e voltar a cidade.`);
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
              passaHora(2);
              statusPers();
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
      statusPers();
      console.log(`Você já roubou a espada! Siga nas outras missões.`);
      continuar();
    } else {
      statusPers();
      console.log(`Perfeito! Desça por esse caminho e chegará a base dos Argadans, onde a espada está localizada.`);
      continuar();
      manada = dado();
      if (manada % 2 == 0) {
        passaHora(1);
        passaMinuto(30);
        statusPers();
        console.log(`Enquanto atravessava um imenso vale, você avistou uma manada de Orlus, animais maiores que elefantes.`);
        console.log(`Você precisa decidir como agir.`);
        continuar();
        do {
          statusPers();
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
          statusPers();
          console.log(`Você chegou a pedra. A manada acabou desviando da pedra e você ficou protegido.`);
          continuar();
        }
        passaHora(1);
        passaMinuto(30);
      } else {
        passaHora(3);
      }
      do {
        statusPers();
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
        statusPers();
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
              statusPers();
              console.log(`Você derrotou um inimigo, falta ${i}`);
            } else {
              perdeVidaPers(2);
              statusPers();
              console.log(`O inimigo defendeu seu ataque e contra atacou!`);
            }
          }
          if (escolha == 2) {
            if (jogada >= emboscada) {
              statusPers();
              console.log(`Você defendeu o ataque inimigo.`);
            } else {
              perdeVidaPers(2);
              statusPers();
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

        statusPers();
        passaHora(3);
        passaMinuto(30);
        console.log(`Você derrotou os guardas que vigiavam a espada. Em posse da Lívera, você derrotou todos os Argadans da base e voltou para a cidade.`);
        continuar();
        livera++;
        descanso();
      } else if (escolha == 3) {
        jogada = dado();
        if (jogada % 2 == 0) {
          statusPers();
          passaMinuto(15);
          console.log(`Você se entregou. Quando os guardas te levava para a prisão, você avistou a espada e num vacilo dos guardas, você conseguiu pegá-la.`);
          continuar();
          statusPers();
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
    if (labuge > 0) {
      statusPers();
      console.log(`Você já encontrou a pedra de Labuge! Siga nas outras missões.`);
      continuar();
    } else if (arlim == 0) {
      do {
        statusPers();
        console.log(`A princesa Arlim é a única conhecedora do caminho correto para encontrar a pedra de Labuge.`);
        console.log(`Sem ela, será pior que procurar uma agulha em um palheiro. Deseja prosseguir, mesmo assim?`);
        escolha = prompt().toLowerCase();
      } while (escolha != `s` && escolha != `n` && escolha != `sim` && escolha != `nao`);
      if (escolha == `s` || escolha == `sim`) {
        statusPers();
        console.log(`Muito bem! Se prefere assim, não vou impedi-lo.`);
        console.log(`Siga por dentro da floresta, até o precipício. Dizem que a pedra pode ser encontrada nas paredes desse precipício.`);
        console.log(`Ninguém nunca voltou vivo pra contar a história se é verdade. Boa sorte!`);
        continuar();
        passaHora(4);
        statusPers();
        console.log(`Você chegou ao precipício, passou um bom tempo procurando algum indicio da pedra de Labuge mas, nada encontrou e voltou para a cidade.`);
        continuar();
        passaHora(2);
      }
    } else if (arlim > 0) {
      statusPers();
      console.log(`Muito bem! Siga com a princesa e ela te guiará pelo caminho correto!`);
      continuar();
      passaHora(2);
      statusPers();
      console.log(`Chegando a beira do precipício, a princesa começa a se guiar de uma maneira totalmente inacreditável,`);
      console.log(`até mesmo pra você um explorador tão habilidoso.`);
      continuar();
      passaHora(1);
      passaMinuto(30);
      statusPers();
      console.log(`Pouco a pouco, vocês vão descendo pela difícil parede do precipício, parando as vezes para a princesa se guiar,`);
      console.log(`seja lá como ela estivesse fazendo isso!`);
      continuar();
      passaHora(1);
      statusPers();
      console.log(`Chegando ao fim do precipício, guiados, no meio da escuridão, por uma tocha que você acendeu,`);
      console.log(`vocês chegam a entrada da caverna onde a princesa disse estar a pedra.`);
      continuar();
      statusPers();
      console.log(`Você fica fascinado com as escritas e desenhos nas paredes e segue passando a mão nelas, enquanto a princesa segue mais adiante.`);
      console.log(`Enquanto passava a mão nas paredes, você acaba tocando em uma Eslife, uma animal parecido com uma cobra e ela morde sua mão esquerda.`);
      continuar();
      perdeVidaPers(1);
      listaEscolha = [, `(1) ARRANCAR A MÃO`, `(2) CHUPAR O LOCAL DA MORDIDA`, `(3) CORRER EM BUSCA DA PRINCESA`];
      statusPers();
      console.log(`Você precisa decidir rápido o que fazer:`);
      console.log(`Pode arrancar a mão com o facão pra evitar que, se houver veneno, se espalhe pelo corpo.`);
      console.log(`Chupar o local da mordida e cuspir o possivel veneno ou correr em busca dá princesa e pedir ajuda.`);
      continuar();
      do {
        statusPers();
        console.log(`O que você decide?`);
        console.log();
        console.log(listaEscolha[1]);
        console.log(listaEscolha[2]);
        console.log(listaEscolha[3]);
        escolha = +prompt();
      } while (isNaN(escolha) || !Number.isInteger(escolha) || escolha < 1 || escolha > 3);
      if (escolha == 1) {
        statusPers();
        passaMinuto(15);
        console.log(`Você amarrar um pedaço de pano no ante braço, apoia o braço na pedra e com o facão arranca a mão!`);
        console.log(`A princesa escuta seu grito de dor e corre ao seu encontro. Ao ver a picada em sua mão no chão ela diz que a Eslife não é um veneno mortal`);
        console.log(`e bastava apenas amarrar um pano no braço para evitar que a substância se espalha-se no corpo e causa-se alucinações.`);
        continuar();
        statusPers();
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
          statusPers();
          console.log(`Você começa a chupar o local da mordida e cuspir. Repetidas vezes você repete isso...`);
          console.log(`De repente, as coisas começam a girar. Atordoado, você se segura na pedra`);
          continuar();
          statusPers();
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
          statusPers();
          passaMinuto(10);
          console.log(`Você começa a chupar o local do ferimento. A princesa logo nota sua falta e volta ao seu encontro.`);
          console.log(`Ela manda você parar e amarra, muito apertado, um pano em seu braço. O veneno da Eslife não é fatal e sim alucinógeno.`);
          continuar();
          statusPers();
          console.log(`Em cerca de 1 hora o efeito deve passar. Com o pano amarrado no braço a substância não irá se espalhar pelo corpo. Assim, vocês voltam a busca.`);
          continuar();
        }
      } else if (escolha == 3) {
        statusPers();
        console.log(`Você vai ao encontro da princesa. Mostrando a ela o ferimento e descrevendo o animal, ela amarra um pano em seu braço, apertado muito forte.`);
        console.log(`O veneno da Eslife não é fatal, apenas alucinógeno. Assim, vocês continuam a busca.`);
        continuar();
      }
      descanso();
      statusPers();
      passaHora(3);
      console.log(`Horas depois de entrar na caverna, que é um labirinto que muda sempre, seguindo as escritas que a princesa foi traduzindo, vocês conseguem chegar ao final.`);
      continuar();
      statusPers();
      console.log(`No local, vocês avistam a pedra de Labuge, em um totem antigo. Na frente dele, 3 pequenos pedestais, cada um com um item diferente.`);
      continuar();
      statusPers();
      console.log(`No primeiro pedestal, uma moeda de ouro. No segundo uma maçã. No terceiro um pequeno jarro de barro com água.`);
      console.log(`Entre os pedestais e o totem, uma estátua de um ser humano ajoelhado, com as mãos juntas e estendidas para frente como se pedisse algo.`);
      continuar();
      statusPers();
      console.log(`A princesa lê o que está escrito na parede atrás: "Para a pedra de Labuge ter, é necessário saber o que é mais essencial para viver"`);
      console.log(`A moeda significa riqueza. A maçã alimento. A água ela mesma. Você deve entregar a estátua o correto para que a pedra seja entregue.`);
      console.log(`Caso contrário, tudo irá desabar e aqui, enterrados, ficaremos para sempre.`);
      continuar();
      do {
        listaEscolha = [, `(1) COLOCAR A MOEDA`, `(2) COLOCAR A MAÇÃ`, `(3) COLOCAR A ÁGUA`];
        statusPers();
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
        statusPers();
        console.log(`Você coloca o pequeno jarro com água na mão da estátua.`);
        console.log(`Começam a nascer flores na estátua que se alastram por todo o lado deixando tudo cheio de flores.`);
        console.log(`Uma enorme flor nasce do totem e trás até você a pedra de Labuge. Ao desabrochar ela revela a pedra de Labuge dentro dela.`);
        continuar();
        passaMinuto(5);
        statusPers();
        console.log(`Ao pegar a pedra, as paredes atrás do totem se abrem, revelando uma saída.`);
        console.log(`Juntos e com a pedra de Labuge, vocês voltam para cidade!`);
        continuar();
        passaHora(3);
        labuge++;
      }
    }
  } else if (destino == 4) {
    if ((livera == 0 && labuge == 0) || (livera > 0 && labuge == 0) || (livera == 0 && labuge > 0)) {
      statusPers();
      console.log(`Você não terá chance contra o dragão Míssera se não tiver tanto a pedra de Labuge quanto a espada de Livera.`);
      console.log(`Recupere as duas e te digo o caminho!`);
      continuar();
    } else if (livera > 0 && labuge > 0) {
      statusPers();
      console.log(`Perfeito! Você está pronto para derrotar o Míssera! Seja forte e corajoso nessa batalha.`);
      console.log(`Suba por este caminho e chegará ao covil do dragão Míssera! Boa sorte!`);
      continuar();

      passaHora(5);
      statusPers();
      console.log(`Depois de horas subindo a montanha, finalmente você chega na caverna do dragão Míssera.`);
      passaMinuto(20);
      console.log(`Você entra devagar caverna adentro. Então, você percebe que, por dentro, mais parece um castelo.`);
      console.log(`Com alguns candelabros e umas fogueiras acesas você vai se guiando e entrando ainda mais.`);
      continuar();
      statusPers();
      console.log(`Rápido e repentinamente atrás de você, saindo das sombras uma boca gigante e aberta vem em sua direção.`);
      console.log(`Com a pedra e Labuge, você cria uma bola escudo ao seu redor que te protege da mordida mortal do Míssera.`);
      continuar();
      statusPers();
      console.log(`Com a Lívera você fura a língua do Míssera, que se afasta e se levanta dentro da sua caverna.`);
      console.log(`Você contempla a grandiosidade do Míssera, enquanto prepara a espada de Lívera e a pedra de Labuge para a batalha!`);
      continuar();

      batalha: while (true) {
        missera = dado();
        gerald = dado();
        do {
          listaEscolha = [, `(1) ATACAR`, `(2) DEFENDER`];
          statusPers();
          statusDrag();
          console.log(`Como agir?`);
          escolha = +prompt(`Deseja ${listaEscolha[1]} ou ${listaEscolha[2]}: `);
        } while (isNaN(escolha) || !Number.isInteger(escolha) || escolha < 1 || escolha > 2);

        if (escolha == 1) {
          if (gerald >= missera) {
            gerald += personagem.ataqueLivera();
            missera += dragao.defesa;
            perdeVidaDrag(gerald - missera);
            statusPers();

            console.log(`Você acertou o ataque!`);
            statusDrag();
            continuar();
          } else {
            perdeVidaPers(missera - gerald);
            statusPers();

            console.log(`Míssera defendeu o ataque e contra-atacou!`);
            statusDrag();
            continuar();
          }
          if (personagem.vida <= 0) {
            break;
          }
          if (dragao.vida <= 0) {
            break;
          }
        } else if (escolha == 2) {
          if (missera > gerald) {
            gerald += personagem.defesaLabuge();
            missera += dragao.ataque;
            perdeVidaPers(missera - gerald);
            statusPers();

            console.log(`Você recebeu um ataque!`);
            statusDrag();
            continuar();
          } else {
            statusPers();

            console.log(`Você defendeu o ataque!`);
            statusDrag();
            continuar();
          }
          if (personagem.vida <= 0) {
            break;
          }
          if (dragao.vida <= 0) {
            break;
          }
        }
      }
      if (dragao.vida <= 0) {
        statusPers();
        console.log(`Você venceu o dragão Míssera! Agora a dimensão Uruzar está livre e em paz!`);
        continuar();
      }
      if (personagem.vida <= 0) {
        mostraTempo();
        console.log(`Mesmo com toda sua bravura, o dragão Míssera demonstrou o quão forte é e matou você!`);
        gameOver();
        break;
      }
      passaHora(2);
    }
  } else if (destino == 5) {
    if (missera == 0) {
      do {
        statusPers();
        console.log(`Se você for agora, sem derrotar o dragão Míssera, tudo que fez até agora será em vão para nós, mas, pelo menos você voltará para seu lar!`);
        escolha = prompt(`Deseja voltar para a terra, mesmo assim? `).toLowerCase();
      } while (escolha != `s` && escolha != `sim` && escolha != `n` && escolha != `nao`);
      if (escolha == `s` || escolha == `sim`) {
        console.clear();
        console.log(`Aos prantos, Arlim te orienta a colocar a pedra de Labuge no chão e atingi-la com a ponta da espada de Lívera.`);
        console.log(`Fazendo isso um imenso brilho saí da pedra, até que não seja mais possível enxergar nada além da luz.`);
        console.log(`Você acorda no mesmo local onde foi sugado. No lugar de onde antes havia o portal, não há mais nada além da rocha.`);
        console.log();
        console.log(`FIM`);
        console.log();
        break;
      }
    } else {
      console.clear();
      console.log(`A dimensão Uruzar agradece por tudo que fez por nós! Seremos eternamente gratos a você!`);
      continuar();
      console.clear();
      console.log(`Arlim te orienta a colocar a pedra de Labuge no chão e atingi-la com a ponta da espada de Lívera.`);
      console.log(`Fazendo isso um imenso brilho saí da pedra, até que não seja mais possível enxergar nada além da luz.`);
      console.log(`Você acorda no mesmo local onde foi sugado. No lugar de onde antes havia o portal, não há mais nada além da rocha.`);
      console.log();
      console.log(`FIM`);
      console.log();
      break;
    }
  } else if (destino == 6) {
    (tempo.hora = 5), (tempo.minuto = Math.floor(Math.random() * 59 + 1)), tempo.dia++;
  } else if (destino == 7) {
    break;
  }
}
