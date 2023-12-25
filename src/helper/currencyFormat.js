export const currencyFormat = (value) => {
    if(!value) return 0
    return new Intl.NumberFormat('pt-BR', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    })
    .format(value)
}