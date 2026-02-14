// Aqui terá apenas a lógica dos cálculos e não telas

// Total de todas as despesas
//o export permite usar essa função em outros arquivos
export function calcularTotalDespesas(despesas) {
  /*(despesas) é um array de despesas,ex:
    { valor: "20", categoria: "Transporte", data: "2026-02-05" }*/

  return despesas.reduce((total, despesa) => {
    //reduce --> percorre o array SOMANDO TUDO
    //total --> acumulador (começa em 0)
    //despesa --> cada item do arry

    return total + Number(despesa.valor);
    //se não tivesse o Number, o JS poderia concatenar os valores, pois despesa.valor vem como string
  }, 0); //0 porque esse é o valor inicial
}

// Gasto do dia (data atual)
export function calcularGastoDoDia(despesas) {

  const hoje = new Date().toISOString().split("T")[0];
  /*
  new Date() --> pega a data
  toISOString() --> converte para o padrão internacional
  split("T") --> divide a string em duas partes, usando o "T" como separador
  [0] --> pega só a parte da data
  posição 0: A DATA
  posição 1: A HORA
  resultado final: a data do dia
  */

  return despesas

    .filter((d) => d.data === hoje) //filtra só despesas do dia atual

    .reduce((total, d) => total + Number(d.valor), 0); //soma só as depesas filtradas, começando em 0
}

// Total por Categoria
export function calcularPorCategoria(despesas) {
  const categorias = {}; //criando um objeto

  despesas.forEach((d) => {
    //percorre cada despesa

    //SE a categoria não exisitir, ela é criada
    if (!categorias[d.categoria]) {
      categorias[d.categoria] = 0;
    }
    categorias[d.categoria] += Number(d.valor); //Soma o valor da despesa na categoria correta
  });
  return categorias;
}

export function calcularSaldoGeral(contas){
  return contas.reduce((total, conta) => {

    const saldoFormatado = parseFloat(
      String(conta.saldo)
        .replace(/\./g, "")   // remove ponto de milhar
        .replace(",", ".")    // troca vírgula por ponto
    ) || 0;

    return total + saldoFormatado;

  }, 0)
}

