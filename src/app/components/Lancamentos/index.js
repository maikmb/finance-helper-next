import React from 'react'
import ItemDespesa from '../ItemDespesa'
import { TipoLancamento } from '@/domain/enums/tipoLancamento'

export default function Lancamentos({ despesas }) {
    return (
        <>
            <p className='p-2 text-sm font-bold'>Receitas</p>
            <ul className="lista-despesas">
                {despesas
                    .filter(args => args.tipoLancamento === TipoLancamento.Receita)
                    .map((despesa) => (
                        <li key={despesa.id}>
                            <ItemDespesa
                                descricao={despesa.descricao}
                                categoria={despesa.categoria}
                                valor={despesa.valor}
                                tipoLancamento={despesa.tipoLancamento}
                            />
                        </li>
                    ))}
            </ul>
            <p className='p-2 text-sm font-bold'>Despesas</p>
            <ul className="lista-despesas">
                {despesas
                    .filter(args => args.tipoLancamento === TipoLancamento.Despesa)
                    .map((despesa) => (
                        <li key={despesa.id}>
                            <ItemDespesa
                                descricao={despesa.descricao}
                                categoria={despesa.categoria}
                                valor={despesa.valor}
                                tipoLancamento={despesa.tipoLancamento}
                            />
                        </li>
                    ))}
            </ul>
        </>

    )
}
