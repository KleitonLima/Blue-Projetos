console.clear();
const prompt = require('prompt-sync')();

// A Jornada do Herói

//História
let dimensao = `Uruzar`
let princesa = `princesa Arlim`;
let pedra = `pedra mística Labuge`;
let dragao = `dragão Míssera`;
let aldeoes = `Gustovs`;
let espada = `espada Livera`;
let resultado = 0;

let historia0 = prompt(`Gerald o Herói! \n\nPressione ENTER pra continuar`);
console.clear();
let historia1 = prompt(`Nos tempos atuais, não mais se ouvia falar em dragões, espadas ou pedras mágicas...\n\nPressione ENTER pra continuar`);
console.clear();
let historia2 = prompt(`Até que, um intenso terremoto abriu um portal fechado a milhares de anos...\n\nPressione ENTER pra continuar`);
console.clear();
let historia3 = prompt(`Um explorador chamado Gerald que vasculhava ali próximo, encontrou esse portal e ao colocar a mão nele foi sugado pra outra dimensão chamada ${dimensao}...\n\nPressione ENTER pra continuar`);
console.clear();
let historia4 = prompt(`Para sair dessa dimensão e voltar pra casa, ele precisa:\nlibertar aldeões sequestrados \nencontrar uma pedra mística \nroubar de monstros uma espada mágica \nsalvar a princesa \ne enfrentar uma dragão...\n\nPressione ENTER pra continuar`);
console.clear();
let historia5 = prompt(`Após passar por todos esses desafios, precisamos saber quais missões foram cumpridas para definir o destino do nosso herói e da dimensão ${dimensao}...\n\nPressione ENTER pra continuar`);
console.clear();
let historia6 = prompt(`Responda nosso questionário, para sabermos se obteve êxito em sua jornada...\n\nPressione ENTER pra continuar`);
console.clear();

//Questiónario
let pergunta1, pergunta2, pergunta3, pergunta4, pergunta5;

while (pergunta1 != `s` && pergunta1 != `sim` && pergunta1 != `n` && pergunta1 != `nao`) {
    pergunta1 = prompt(`Você está com a ${pedra}?  `).toLowerCase();
    console.clear();
};
while (pergunta2 != `s` && pergunta2 != `sim` && pergunta2 != `n` && pergunta2 != `nao`) {
    pergunta2 = prompt(`Você roubou a ${espada}? `).toLowerCase();
    console.clear();
}
while (pergunta3 != `s` && pergunta3 != `sim` && pergunta3 != `n` && pergunta3 != `nao`) {
    pergunta3 = prompt(`Você resgatou a ${princesa}? `).toLowerCase();
    console.clear();
};
while (pergunta4 != `s` && pergunta4 != `sim` && pergunta4 != `n` && pergunta4 != `nao`) {
    pergunta4 = prompt(`Você salvou os aldeões de ${aldeoes}? `).toLowerCase();
    console.clear();
};
while (pergunta5 != `s` && pergunta5 !== `sim` && pergunta5 !== `n` && pergunta5 != `nao`) {
    pergunta5 = prompt(`Você matou o ${dragao}? `).toLowerCase();
    console.clear();
};

//Exibindo as respostas
console.log(`Encontrou a ${pedra}? - ${pergunta1}`);
console.log(`Roubou a ${espada}? - ${pergunta2}`);
console.log(`Resgatou a ${princesa}? - ${pergunta3}`);
console.log(`Salvou os aldeões de ${aldeoes} - ${pergunta4}`);
console.log(`Matou o ${dragao}? - ${pergunta5}`);

console.clear();

//Soma das respostas
if (pergunta1 == `s` || pergunta1 == `sim`) {
    resultado++;
}
if (pergunta2 == `s` || pergunta2 == `sim`) {
    resultado++;
}
if (pergunta3 == `s` || pergunta3 == `sim`) {
    resultado++;
} 
if (pergunta4 == `s` || pergunta4 == `sim`) {
    resultado++;
} 
if (pergunta5 == `s` || pergunta5 == `sim`) {
    resultado++;
} 

//Conclusão
if (resultado == 0){
    console.log(`Você foi um completo desastre, não cumprindo nenhuma missão que lhe foi designado. \nA cidade mística será um reino eterno do ${dragao}! \nA ${princesa} ficará presa até a morte. \nOs aldeões de ${aldeoes} foram mortos. \nVocê nunca voltará para casa. \n`)
} else if (resultado == 1 || resultado == 2) {
    console.log(`Desastrosa foi sua jornada como herói! \nMesmo você conseguindo cumprir alguma missão, não foi o suficiente para salvar a dimensão ${dimensao} ou voltar pra casa! \nSó te resta viver nessa dimensão para sempre \n`);
} else if (resultado == 3) {
    console.log(`Você quase conseguiu completar todas as suas tarefas. \nFelizmente, por conta das que você completou poderá voltar pra casa ou salvar a dimensão ${dimensao}. \n`);
} else if (resultado == 4) {
    console.log(`Nossa! Foi por pouco! Mais uma tarefa e você teria tido êxito completo em suas missões. \nCom as missões que cumpriu terá a escolha de salvar a dimensão ${dimensao} ou voltar para casa. \n`);
} else if (resultado == 5) {
    console.log(`Você cumpriu majestosamente suas missões! \nProvou ser um bravo héroi e agora poderá voltar para casa deixando a dimensão ${dimensao} à salvo! \nPARABÉNS! \n`);
}

console.log();