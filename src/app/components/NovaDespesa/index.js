import classNames from 'classnames';
import React, { useState } from 'react'

export default function FormularioNovaDespesa({
    mostrar,
    adicionarDespesa,
    limparDespesas,
    limparUltimarDespesa
}) {

    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');

    const onAdicionarClick = () => {
        adicionarDespesa({ descricao, valor })
        setDescricao('')
        setValor('')
    }

    return (
        <div className={classNames({
            'flex flex-col p-3': mostrar,
            'hidden p-3': !mostrar
        })}>
            <input
                type="text"
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)} />
            <input
                type="number"
                placeholder="Valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)} />
            <button onClick={() => onAdicionarClick()}>Adicionar</button>
            <button onClick={() => limparDespesas()}>Apagar todas as despesas</button>
            <button onClick={() => limparUltimarDespesa()}>Apagar último lançamento</button>
        </div >
    )
}