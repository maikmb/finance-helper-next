'use client'

import { useEffect, useState } from 'react';
import Saldo from './components/Saldo';
import Lancamentos from './components/Lancamentos';
import FormularioNovaDespesa from './components/NovaDespesa';

export default function Home() {
  const [despesas, setDespesas] = useState([]);
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    setDespesas(JSON.parse(localStorage.getItem('despesas')) || [])
    setSaldo(parseFloat(localStorage.getItem('saldo')) || 0)
  }, [])

  const adicionarDespesa = ({ descricao, valor }) => {
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

  return (
    <div className="w-full">
      <Saldo saldo={saldo} mesReferencia={'Dezembro'} />
      <Lancamentos despesas={despesas} />
      <FormularioNovaDespesa limparDespesas={limparDespesas} adicionarDespesa={adicionarDespesa} />
    </div>
  );

}
