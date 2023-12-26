import { currencyFormat } from '@/helper/currencyFormat';
import React from 'react'
import { CiShop } from "react-icons/ci";


export default function ItemDespesa({ descricao, categoria, valor }) {
    return (
        <div className='flex flex-row p-2'>
            <div className='w-10'>
                <div className='flex rounded-full bg-red-400 w-7 h-7 justify-center items-center'>
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
