'use client'

import { useEffect, useState } from 'react';
import Saldo from './components/Saldo';
import Lancamentos from './components/Lancamentos';
import FormularioNovaDespesa from './components/NovaDespesa';
import { IoAdd } from "react-icons/io5";
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { TiDocumentDelete } from "react-icons/ti";
import { obterLancamentos, salvarLancamentos, salvarSaldo } from '@/repositories/lancamentosRepository';
import { TipoLancamento } from '@/domain/enums/tipoLancamento';
import { sumBy } from 'lodash';
import { obterNomeMesAtual } from '@/helper/obterMesAtual';

export default function Home() {
  const [lancamentos, setLancamentos] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [tipoNovoLancamento, setTipoNovoLancamento] = useState();
  const [mostraFormularioNovoLancamento, setMostraFormularioNovoLancamento] = useState(0);

  const mesReferencia = obterNomeMesAtual();

  useEffect(() => {
    const lancamentosAtuais = obterLancamentos();
    setLancamentos(lancamentosAtuais);
    calcularSaldo(lancamentosAtuais);
  }, [])

  const onAdicionarLancamentoClick = ({ descricao, tipoLancamento, valor }) => {
    if (descricao && valor) {
      const novaDespesa = {
        id: lancamentos.length + 1,
        descricao,
        tipoLancamento,
        valor: parseFloat(valor),
      };

      const despesasAtuais = [...lancamentos, novaDespesa];
      setLancamentos(despesasAtuais);
      calcularSaldo(despesasAtuais);
      salvarLancamentos(despesasAtuais);
      setMostraFormularioNovoLancamento(false);
    }
  }

  const calcularSaldo = (lancamentos) => {
    const totalReceitas = sumBy(lancamentos.filter(args => args.tipoLancamento === TipoLancamento.Receita), 'valor');
    const totalDespesas = sumBy(lancamentos.filter(args => args.tipoLancamento === TipoLancamento.Despesa), 'valor');
    const saldoAtual = totalReceitas - totalDespesas;
    setSaldo(saldoAtual);
    setTotalDespesas(totalDespesas);
    setTotalReceitas(totalReceitas);
    salvarSaldo(saldoAtual);
  }

  const onLimparDespesasClick = () => {
    if (confirm('Deseja realmente apagar todos os seus lançamentos?')) {
      setLancamentos([]);
      setSaldo(0);
      salvarLancamentos([]);
      salvarSaldo(0);
      setMostraFormularioNovoLancamento(false);
    }
  }

  const onLimparUltimarDespesaClick = () => {
    if (confirm('Deseja apagar o último lançamento?')) {
      const saldoAtualizado = saldo - lancamentos[lancamentos.length - 1].valor
      const despesasAtualizadas = lancamentos.slice(0, lancamentos.length - 1);
      setLancamentos(despesasAtualizadas);
      setSaldo(saldoAtualizado);
      salvarLancamentos(despesasAtualizadas);
      salvarSaldo(saldoAtualizado);
      setMostraFormularioNovoLancamento(false);
    }
  }

  const onDespesaClick = () => {
    setMostraFormularioNovoLancamento(true);
    setTipoNovoLancamento(TipoLancamento.Despesa);
  }

  const onReceitaClickClick = () => {
    setMostraFormularioNovoLancamento(true);
    setTipoNovoLancamento(TipoLancamento.Receita);
  }

  const onCancelarClick = () => {
    setMostraFormularioNovoLancamento(false);
  }

  const OpcoesFloatButton = () => {
    if (typeof window === "undefined")  return;

    return (
      <Fab
        icon={<IoAdd />}
        alwaysShowTitle={true}
        style={{ bottom: 0, right: 0 }}
      >
        <Action
          text="Receita"
          onClick={onReceitaClickClick}
          style={{ backgroundColor: 'green' }}
        >
          <FaLongArrowAltUp />
        </Action>
        <Action
          text="Despesa"
          onClick={onDespesaClick}
          style={{ backgroundColor: 'red' }}
        >
          <FaLongArrowAltDown />
        </Action>
        <Action
          text="Exluir todos lancamentos"
          onClick={onLimparDespesasClick}
        >
          <MdOutlineDeleteSweep />
        </Action>
        <Action
          text="Apagar útimo lançamento"
          onClick={onLimparUltimarDespesaClick}
        >
          <TiDocumentDelete />
        </Action>
      </Fab>
    )
  }

  return (
    <>
      <div className="w-full">
        <Saldo saldo={saldo} totalDespesas={totalDespesas} mesReferencia={mesReferencia} />
        <Lancamentos despesas={lancamentos} />
        <FormularioNovaDespesa
          mostrar={mostraFormularioNovoLancamento}
          tipoLancamento={tipoNovoLancamento}
          onAdicionarLancamentoClick={onAdicionarLancamentoClick}
          onCancelarClick={onCancelarClick}
        />
      </div>
      <OpcoesFloatButton />
    </>
  );

}
