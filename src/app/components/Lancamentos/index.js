import React from 'react'
import ItemDespesa from '../ItemDespesa'

export default function Lancamentos({ despesas }) {
    return (
        <>
            <ul className="lista-despesas pt-3">
                {despesas.map((despesa) => (
                    <li key={despesa.id}>
                        <ItemDespesa descricao={despesa.descricao} categoria={despesa.categoria} valor={despesa.valor} />
                    </li>
                ))}
            </ul>
        </>

    )
}
