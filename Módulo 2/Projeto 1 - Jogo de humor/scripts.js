const imgslist = [
  "./assets/img/matrix 1.jpg",
  "./assets/img/1 dia na programação - toma bala.gif",
  "./assets/img/3 dias na programação - mais bala.gif",
  "./assets/img/10 dias na programação - vendo código em tudo.gif",
  "./assets/img/15 dias na programação - começou a pegar o jeito.gif",
  "./assets/img/1 mês na programação - pegando agilidade e se livrando dos erros.gif",
  "./assets/img/3 meses na programação - parando os erros sem muito esforço.gif",
  "./assets/img/1 ano na programação - voando.gif",
];

const date = document.querySelector("#date");
const situation = document.querySelector("#situation");
const img = document.querySelector("img");
const button = document.querySelector("button");

button.addEventListener("click", () => {});

function handleChangeImg() {
  if (img.attributes.src.nodeValue == imgslist[0]) {
    date.innerHTML = "PRIMEIRO DIA NA PROGRAMACÃO";
    situation.innerHTML = "PRIMEIRA BALA";
    img.setAttribute("src", imgslist[1]);
  } else if (img.attributes.src.nodeValue == imgslist[1]) {
    date.innerHTML = "SEGUNDO DIA NA PROGRAMACÃO";
    situation.innerHTML = "TOME-LHE MAIS BALA";
    img.setAttribute("src", imgslist[2]);
  } else if (img.attributes.src.nodeValue == imgslist[2]) {
    date.innerHTML = "DECIMO DIA DE PROGRAMACÃO";
    situation.innerHTML = "ENXERGANDO CODIGO EM TUDO";
    img.setAttribute("src", imgslist[3]);
  } else if (img.attributes.src.nodeValue == imgslist[3]) {
    date.innerHTML = "QUINZE DIAS DE PROGRAMACÃO";
    situation.innerHTML = "GANHANDO HABILIDADE E AGILIDADE";
    img.setAttribute("src", imgslist[4]);
  } else if (img.attributes.src.nodeValue == imgslist[4]) {
    date.innerHTML = "UM MES DE PROGRAMACÃO";
    situation.innerHTML = "BEM AGIL DESVIANDO DOS PROBLEMAS";
    img.setAttribute("src", imgslist[5]);
  } else if (img.attributes.src.nodeValue == imgslist[5]) {
    date.innerHTML = "TRES MESES DE PROGRAMACÃO";
    situation.innerHTML = "PARANDO OS PROBLEMAS SEM MUITO ESFORCO";
    img.setAttribute("src", imgslist[6]);
  } else if (img.attributes.src.nodeValue == imgslist[6]) {
    date.innerHTML = "UM ANO COMO PROGRAMADOR";
    situation.innerHTML = "VOANDO...";
    img.setAttribute("src", imgslist[7]);
  } else {
    date.innerHTML = "INSCRITO NO CURSO DE PROGRAMACÃO";
    situation.innerHTML = "LIKE A BOSS";
    img.setAttribute("src", imgslist[0]);
  }
}
