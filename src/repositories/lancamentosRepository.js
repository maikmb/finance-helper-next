const lancamentosCacheKey = "financework.lancamentos"

export const obterLancamentos = () => {
    return JSON.parse(localStorage.getItem(lancamentosCacheKey)) || [];
}

export const salvarLancamentos = (lancamentos) => {
    localStorage.setItem(lancamentosCacheKey, JSON.stringify(lancamentos));
}

export const salvarSaldo = (saldo) => {
    localStorage.setItem('saldo', saldo);
}