import { currencyFormat } from '@/helper/currencyFormat'
import React from 'react'

export default function Saldo({ 
    saldo,
    totalDespesas, 
    mesReferencia }) {
    return (
        <div className="flex-col justify-center text-center bg-slate-500 text-white pt-10 pb-2">
            <p className="text-sm m-3 mt-5">Total de despesas</p>
            <div className="text-4xl font-bold">R$ {currencyFormat(totalDespesas)}</div>
            <p className="text-sm m-3">{mesReferencia}</p>
            <p className="text-sm m-3 pt-2">Saldo {currencyFormat(saldo)}</p>
        </div>
    )
}
