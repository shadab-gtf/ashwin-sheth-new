"use client";
import Link from 'next/link'
import Pera from '../typography/Pera'

const BottomFooter = () => {
  return (
    <div className=' bg-[#08182B]'>
      <div className='flex flex-col md:flex-row justify-between md:items-center gap-[15px] wrapper text-white'>
      <div className='flex justify-center items-center gap-[5px] p-3 text-[12px] md:text-[14px] '>
        <Link href={"/privacy-policy"}>Privacy Policy</Link>
        <span>|</span>
        <Link href={"/disclaimer"}>Disclaimer</Link>
        <span>|</span>
        <Link href={"/terms-condition"}>Term & Conditions</Link>
      </div>
      <div><Pera className='text-white text-center'>Copyright © 2025 - <Link href={"/"} className='text-[#f07d00]'>Ashwin Sheth Group</Link> | All Rights Reserved</Pera></div>
      <div><Pera className='text-white'>Created BY: GTF Technologies</Pera></div>
      </div>
    </div>
  )
}

export default BottomFooter