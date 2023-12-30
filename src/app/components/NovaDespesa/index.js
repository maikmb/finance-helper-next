import classNames from 'classnames';
import React, { useState } from 'react'

export default function FormularioNovaDespesa({
    mostrar,
    onAdicionarDespesaClick,
    onCancelarClick
}) {

    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');

    const onAdicionarClick = () => {
        onAdicionarDespesaClick({ descricao, valor })
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
            <button onClick={() => onCancelarClick()}>Cancelar</button>            
        </div >
    )
}