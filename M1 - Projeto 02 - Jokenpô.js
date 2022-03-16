console.clear();
const prompt = require('prompt-sync')();

let pedra, papel, tesoura, escolhaU, escolhaIA;

while(isNaN(escolhaU)) {
    escolhaU = +prompt(`Digite sua escolha: (1) PEDRA (2) PAPEL (3) TESOURA`);
    escolhaIA = Math.floor(Math.random() * 3 + 1);
};

console.log(escolhaU);
console.log(escolhaIA);

console.log();