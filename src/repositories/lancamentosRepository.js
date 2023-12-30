const lancamentosCacheKey = "financework.lancamentos"

export const obterLancamentos = () => {
    return JSON.parse(localStorage.getItem(lancamentosCacheKey)) || [];
}

export const salvarLancamentos = (lancamentos) => {
    localStorage.setItem(lancamentosCacheKey, JSON.stringify(lancamentos));
}