"use strict";

const tela = document.getElementById("tela");
const numeros = document.querySelectorAll("[id*=numero]");
const operadores = document.querySelectorAll("[id*=operacao]");
const teclaLimpar = document.getElementById("limpar");

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador != undefined;

const calcula = () => {
    if (operacaoPendente()){
        const numeroAtual = parseFloat(tela.textContent.replace(",", "."));
        novoNumero = true;

        if (operador == "+"){
            atualizaTela(numeroAnterior + numeroAtual)
        } else if (operador == "-"){
            atualizaTela(numeroAnterior - numeroAtual)
        } else if (operador == "÷"){
            atualizaTela(numeroAnterior / numeroAtual)
        } else if (operador == "x"){
            atualizaTela(numeroAnterior * numeroAtual)
        }
    }
}

// a arrow function recebe o evento e envia para o atualizatela o textContent do alvo do clique
const insereNumero = (evento) => {
    atualizaTela (evento.target.textContent);
    teclaLimpar.textContent = "C";
}

// forEach varre os elementos do array. O forEach vai pegar um número e adicionar o evento clique e mandar para a callback insereNumero
numeros.forEach (numero => numero.addEventListener("click", insereNumero));

function insereZero(){
    if (tela.textContent != "0"){
        atualizaTela("0");
    }
}

document.getElementById("zero").addEventListener("click", insereZero);

// se for um novo número, irá limpar a tela, do contrário irá concatenar
function atualizaTela(texto) {
    if (novoNumero) {
        tela.textContent = texto.toLocaleString("BR");
        novoNumero = false;
    } else {
        tela.textContent += texto.toLocaleString("BR");
    }
}

const selecionaOperador = (evento) => {
    if (!novoNumero){
        calcula();
        novoNumero = true;
        operador = evento.target.textContent; // guarda na variável o textContent do alvo
        numeroAnterior = parseFloat(tela.textContent.replace(",", ".")); // guarda na variável o que está na tela
    }
}

operadores.forEach (operador => operador.addEventListener("click", selecionaOperador));

const chamaResultado = () => {
    calcula();
    operador = undefined; // deixa sem operador, não deixando conta pendente
}

document.getElementById("resultado").addEventListener("click", chamaResultado);


const limpaTela = () => {
    if (tela.textContent != "0"){
        novoNumero = true;
        tela.textContent = "0";
        teclaLimpar.textContent = "AC";
    } else {
        novoNumero = true;
        tela.textContent = "0";
        operador = undefined;
        numeroAnterior = undefined;

    }
}

// quando clicar em limpar, irá chamar a função de limpar tela
document.getElementById("limpar").addEventListener("click", limpaTela);

const inverteValor = () => tela.textContent = tela.textContent * -1;

document.getElementById("inverter").addEventListener("click", inverteValor);

// procura se existe a virgula e se não existir traz -1
const existeDecimal = () => tela.textContent.indexOf(",") != -1;
const existeNumero = () => tela.textContent != "0";

const insereVirgula = () =>{
    if (!existeDecimal()){
        teclaLimpar.textContent = "C";
        if (existeNumero()){
            tela.textContent += ",";
        } else {
            tela.textContent = "0,";
            novoNumero = false;
        }
    }
}

document.getElementById("virgula").addEventListener("click", insereVirgula);

function aplicaPorcentagem(){
    var numeroConvertido = tela.textContent.replace(",", ".");
    tela.textContent = (numeroConvertido * 0.01).toLocaleString("BR");
}

document.getElementById("porcentagem").addEventListener("click", aplicaPorcentagem);

const mapaTeclado = {
    "0" : "zero",
    "1" : "numeroUm",
    "2" : "numeroDois",
    "3" : "numeroTres",
    "4" : "numeroQuatro",
    "5" : "numeroCinco",
    "6" : "numeroSeis",
    "7" : "numeroSete",
    "8" : "numeroOito",
    "9" : "numeroNove",

    "/" : "operacaoDividir",
    "*" : "operacaoMultiplicar",
    "-" : "operacaoSubtrair",
    "+" : "operacaoSomar",
    "." : "virgula",
    "," : "virgula",
    "%" : "porcentagem",

    "Enter" : "resultado",
    "Backspace" : "limpar",
    "Delete" : "limpar"
}

const mapeiaTeclado = (evento) => {
    const tecla = evento.key; 
    
    // o método keys extrai de um objeto somente as chaves, indexOf vai verificar se existe a tecla
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf (tecla) != -1;

    if(teclaPermitida()){
    document.getElementById(mapaTeclado[tecla]).click();
    }
}

document.addEventListener("keydown", mapeiaTeclado);
