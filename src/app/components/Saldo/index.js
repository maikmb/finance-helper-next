import { currencyFormat } from '@/helper/currencyFormat'
import React from 'react'

export default function Saldo({ saldo, mesReferencia }) {
    return (
        <div className="flex-col justify-center text-center bg-slate-500 text-white py-10">
            <p className="text-sm m-3 mt-5">Total de despesas</p>
            <div className="text-4xl font-bold">R$ {currencyFormat(saldo)}</div>
            <p className="text-sm m-3">{mesReferencia}</p>
        </div>
    )
}
