console.clear();
const prompt = require("prompt-sync")();

// PROJETO NÃO FINALIZADO

// JOGO DE FICÇÃO INTERATIVA

// VARIAVÉIS
let destino, emboscada, escolha, jogada, quantidadeInimigos, sorte;

// OBJETOS
let tempo = {
  dia: 1,
  hora: 5,
  minuto: 0,
  mostraTempo: function (tempo) {
    if (this.hora >= 24) {
      (this.hora -= 24), this.dia++;
    } else if (this.minuto >= 60) {
      (this.minuto -= 60), this.hora++;
    }
    console.log(`${this.hora}h:${this.minuto}m`);
  },
};

let personagem = {
  forca: 3,
  resistencia: 3,
  energia: 15,
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
  ataque: function () {
    return this.forca * this.energia;
  },
  defesa: function () {
    return this.resistencia * this.energia;
  },
};

// FUNÇÕES
function dado() {
  return Math.floor(Math.random() * 6 + 1);
}

// ESCOLHA DO DESTINO
for (personagem.energia > 0; ; ) {
  do {
    console.clear();
    tempo.mostraTempo();
    console.log(`Energia: ${personagem.energia}`);
    console.log(`Por onde você deseja ir? `);
    console.log(`(1) Resgatar a prícesa Arlim?`);
    console.log(`(2) Roubar a espada Lívera?`);
    console.log(`(3) Enfrentar o dragão Míssera?`);
    console.log(`(4) Buscar a pedra mística de Labuge?`);
    destino = +prompt();
  } while (isNaN(destino) || !Number.isInteger(destino) || destino < 1 || destino > 4);

  // DESTINO 1
  if (destino == 1) {
    console.clear();
    tempo.mostraTempo();
    console.log(`Muito bem! Siga por este caminho e chegará até o cativeiro da príncesa. Cuidado no caminho e boa sorte!`);
    console.log();
    +prompt(`Pressione ENTER para continuar...`);
    console.clear();

    // ALEATORIEDADE
    emboscada = dado();

    if (emboscada % 2 == 0) {
      quantidadeInimigos = Math.floor(Math.random() * 4 + 2);
      console.clear();
      tempo.hora += 1;
      tempo.mostraTempo();
      console.log(`Emboscada!`);
      console.log(`Você deu de cara com ${quantidadeInimigos} Argadans. Não há como fugir, só te resta lutar.`);

      for (i = quantidadeInimigos; i >= 1; tempo.minuto += 5) {
        console.log(`Energia: ${personagem.energia}`);

        do {
          escolha = +prompt(`Deseja (1) ATACAR ou (2) DEFENDER: `);
          console.clear();
        } while (isNaN(destino) || !Number.isInteger(destino) || destino < 1 || destino > 2);

        jogada = dado();
        emboscada = dado();

        if (escolha == 1) {
          if (jogada > emboscada) {
            i--;
            tempo.mostraTempo();
            console.log(`Você derrotou um inimigo, falta ${i}`);
            personagem.energia -= 1;
          } else if (jogada == emboscada) {
            tempo.mostraTempo();
            console.log(`Niguém foi ferido!`);
            personagem.energia -= 1;
          } else {
            tempo.mostraTempo();
            personagem.energia -= 2;
            console.log(`Você recebeu um ataque!`);
          }
        }
        if (escolha == 2) {
          if (jogada >= emboscada) {
            tempo.mostraTempo();
            console.log(`Você defendeu o ATAQUE INIMIGO`);
            personagem.energia -= 1;
          } else {
            tempo.mostraTempo();
            personagem.energia -= 2;
            console.log(`Você recebeu um ataque!`);
          }
        }
      }

      console.clear();
      tempo.mostraTempo();
      console.log(`Você derrotou todos os inimigos.`);

      if (personagem.energia < 10) {
        do {
          console.log(`Energia: ${personagem.energia}`);
          console.log(`Você deseja descansar?`);
          escolha = prompt().toLowerCase();
          console.clear();
          if (escolha == `s` || escolha == `sim`) {
            tempo.hora += 10 - personagem.energia;
            personagem.energia = 15;
            console.clear();
          }
        } while (escolha != `s` && escolha != `n` && escolha != `sim` && escolha != `nao`);
      }
      tempo.hora += 1;
    } else {
      console.clear;
      tempo.hora += 2;
    }

    tempo.mostraTempo();
    console.log(`Energia: ${personagem.energia}`);

    do {
      console.log(`Você chegou ao cativeiro! Você contou cerca de 15 soldados Argadans. Como deseja agir?`);
      console.log(`(1) DEIXAR SER PRESO E PLANEJAR UMA FULGA COM A PRINCESA NA PRISÃO`);
      console.log(`(2) ATACAR OS GUARDAS`);
      console.log(`(3) INVADIR SORRATEIRAMENTE ATÉ ENCONTRAR A PRINCESA`);
      escolha = +prompt();
    } while (isNaN(destino) || !Number.isInteger(destino) || destino < 1 || destino > 3);

    if (escolha == 1) {
      console.log(`Você se entregou e foi preso! Junto com a princesa conseguiram fugir e voltaram pra cidade!`);
      tempo.hora += 4;
    } else if ( escolha == 2) {}
  }

  break;
}

console.log();
