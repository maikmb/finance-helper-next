export const obterNomeMesAtual = () => {
    const dataAtual = new Date();
    const indiceMesAtual = dataAtual.getMonth();
    return meses[indiceMesAtual];
}

export const meses = [
    "Janeiro", "Fevereiro", "Março",
    "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro",
    "Outubro", "Novembro", "Dezembro"
];