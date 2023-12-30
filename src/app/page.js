'use client'

import { useEffect, useState } from 'react';
import Saldo from './components/Saldo';
import Lancamentos from './components/Lancamentos';
import FormularioNovaDespesa from './components/NovaDespesa';
import { IoAdd } from "react-icons/io5";
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { obterLancamentos, salvarLancamentos } from '@/repositories/lancamentosRepository';
import { TipoLancamento } from '@/domain/enums/tipoLancamento';


export default function Home() {
  const [lancamentos, setLancamentos] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [tipoLancamento, setTipoLancamento] = useState();
  const [mostraFormularioNovoLancamento, setMostraFormularioNovoLancamento] = useState(0);

  useEffect(() => {
    setLancamentos(obterLancamentos())
    setSaldo(parseFloat(localStorage.getItem('saldo')) || 0)
  }, [])

  const adicionarDespesa = ({ descricao, valor }) => {
    if (descricao && valor) {
      const novaDespesa = {
        id: lancamentos.length + 1,
        descricao,
        valor: parseFloat(valor),
      };

      const saldoAtual = saldo + parseFloat(valor);
      const despesasAtuais = [...lancamentos, novaDespesa]

      setLancamentos(despesasAtuais);
      setSaldo(saldoAtual);

      salvarLancamentos(despesasAtuais);
      localStorage.setItem('saldo', saldoAtual);
      setMostraFormularioNovoLancamento(false);
    }
  }

  const limparDespesas = () => {
    setLancamentos([]);
    setSaldo(0);
    salvarLancamentos([]);
    localStorage.setItem('saldo', 0);
    setMostraFormularioNovoLancamento(false);
  }

  const limparUltimarDespesa = () => {
    const saldoAtualizado = saldo - lancamentos[lancamentos.length - 1].valor
    const despesasAtualizadas = lancamentos.slice(0, lancamentos.length - 1);
    setLancamentos(despesasAtualizadas);
    setSaldo(saldoAtualizado);
    salvarLancamentos(despesasAtualizadas);
    localStorage.setItem('saldo', saldoAtualizado);
    setMostraFormularioNovoLancamento(false);
  }

  const onDespesaClick = () => {
    debugger
    setMostraFormularioNovoLancamento(true);
    setTipoLancamento(TipoLancamento.Despesa);
  }

  const onReceitaClickClick = () => {
    setMostraFormularioNovoLancamento(true);
    setTipoLancamento(TipoLancamento.Receita);
  }

  const OpcoesFloatButton = () => {
    return (
      <Fab
        icon={<IoAdd />}
        alwaysShowTitle={true}
      >
        <Action
          text="Receita"
          onClick={onReceitaClickClick}
        >
          <FaLongArrowAltUp />
        </Action>
        <Action
          text="Despesa"
          onClick={onDespesaClick}
        >
          <FaLongArrowAltDown />
        </Action>
      </Fab>
    )
  }

  return (
    <div className="w-full">
      <Saldo saldo={saldo} mesReferencia={'Dezembro'} />
      <Lancamentos despesas={lancamentos} />
      <FormularioNovaDespesa mostrar={mostraFormularioNovoLancamento} limparDespesas={limparDespesas} adicionarDespesa={adicionarDespesa} limparUltimarDespesa={limparUltimarDespesa} />
      <OpcoesFloatButton />
    </div>
  );

}
