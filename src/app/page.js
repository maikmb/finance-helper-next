'use client'

import { useEffect, useState } from 'react';

export default function Home() {
  const [despesas, setDespesas] = useState(
    JSON.parse(localStorage.getItem('despesas')) || []
  );
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [saldo, setSaldo] = useState(
    parseFloat(localStorage.getItem('saldo')) || 0
  );

  useEffect(() => {
    debugger
    localStorage.setItem('despesas', JSON.stringify(despesas));
    localStorage.setItem('saldo', saldo);
  }, [despesas, saldo]);

  const adicionarDespesa = () => {
    if (descricao && valor) {
      const novaDespesa = {
        id: despesas.length + 1,
        descricao,
        valor: parseFloat(valor),
      };
      setDespesas([...despesas, novaDespesa]);
      setSaldo(saldo + parseFloat(valor));
      setDescricao('');
      setValor('');
    }
  };

  return (
    <div className="App">
      <h1>Gerenciador de Despesas</h1>
      <div className="saldo">Saldo: {saldo.toFixed(2)}</div>
      <div className="formulario">
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <button onClick={adicionarDespesa}>Adicionar</button>
      </div>
      <ul className="lista-despesas">
        {despesas.map((despesa) => (
          <li key={despesa.id}>
            <p>
              {despesa.descricao}
            </p>
            <p>
              R$ {despesa.valor.toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
