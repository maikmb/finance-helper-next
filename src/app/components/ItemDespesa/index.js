import { TipoLancamento } from '@/domain/enums/tipoLancamento';
import { currencyFormat } from '@/helper/currencyFormat';
import classNames from 'classnames';
import React from 'react'
import { CiShop } from "react-icons/ci";


export default function ItemDespesa({ descricao, tipoLancamento, valor }) {
    return (
        <div className='flex flex-row p-2'>
            <div className='w-10'>
                <div className={classNames('flex rounded-full w-7 h-7 justify-center items-center', {
                    'bg-red-400': tipoLancamento === TipoLancamento.Despesa,
                    'bg-green-700': tipoLancamento === TipoLancamento.Receita
                })}>
                    <CiShop />
                </div>
            </div>
            <div className='flex flex-row justify-between w-full'>
                <div className='flex items-center'>
                    <p className='text-sm'>{descricao}</p>
                    {/* <p className='text-sm'>{categoria}</p> */}
                </div>
                <div className='flex items-center'>
                    <p className='text-sm'>{currencyFormat(valor)}</p>
                </div>
            </div>
        </div>
    )
}
