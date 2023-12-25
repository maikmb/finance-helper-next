'use client'

import { useEffect, useState } from 'react';
import Saldo from './components/Saldo';

export default function Home() {
  const [despesas, setDespesas] = useState([]);
  const [saldo, setSaldo] = useState(0);

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  useEffect(() => {
    setDespesas(JSON.parse(localStorage.getItem('despesas')) || [])
    setSaldo(parseFloat(localStorage.getItem('saldo')) || 0)
  }, [])

  const adicionarDespesa = () => {
    if (descricao && valor) {
      const novaDespesa = {
        id: despesas.length + 1,
        descricao,
        valor: parseFloat(valor),
      };

      const saldoAtual = saldo + parseFloat(valor);
      const despesasAtuais = [...despesas, novaDespesa]

      setDespesas(despesasAtuais);
      setSaldo(saldoAtual);

      localStorage.setItem('despesas', JSON.stringify(despesasAtuais));
      localStorage.setItem('saldo', saldoAtual);

      setDescricao('');
      setValor('');
    }
  };

  const limparDespesas = () => {
    setDespesas([]);
    setSaldo(0);
    localStorage.setItem('despesas', JSON.stringify([]));
    localStorage.setItem('saldo', 0);
  }

  const Lancamentos = () => {
    return (
      <>
        <div className="formulario">
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
          <button onClick={adicionarDespesa}>Adicionar</button>
          <button onClick={limparDespesas}>Limpar Despesas</button>
        </div><ul className="lista-despesas">
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
      </>
    )
  }

  return (
    <div className="w-full">
      <Saldo saldo={saldo} mesReferencia={'Dezembro'} />
    </div>
  );
}
