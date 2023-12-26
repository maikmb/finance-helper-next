import React, { useState } from 'react'

export default function FormularioNovaDespesa({ adicionarDespesa, limparDespesas }) {

    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');

    return (
        <div className='flex flex-col p-3'>
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
            <button onClick={() => adicionarDespesa({ descricao, valor })}>Adicionar</button>
            <button onClick={() => limparDespesas()}>Limpar Despesas</button>
        </div>
    )
}