'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer id="contact" className="bg-[#FFFBF7] border-t border-[#EAE0D5] py-[40px]">
            <div className=" px-[7%]">

                {/* Top Section with QR and Partner Logo */}
                <div className="flex flex-col md:flex-row justify-between items-center  gap-8">
                    <div className="flex items-center gap-6">
                        {/* QR Code Placeholder */}
                        <div className="bg-white p-2 border border-gray-200">
                           <img src="/images/micro/qr.png" alt="qr" className='w-[150px] h-[150px] object-contain'/>
                        </div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest ">
                            MahaRERA No. P51800053546
                        </div>
                    </div>

                    {/* Partner Logo */}
                    <div className="flex flex-col items-center">
                        <div>
                            <img src="/images/micro/logo.png" alt="logo" className='w-[150px] h-[150px] object-contain'/>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}
