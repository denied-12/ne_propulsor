import React, { useState } from 'react';
import Image from "next/image"
export default function NequiLanding() {
    return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4 md:p-8">
        <div className="relative w-full max-w-[1200px] min-h-[600px] bg-[#ECE7F5] rounded-3xl overflow-hidden">

             {/* Magenta Background Shape */}
            <div className='absolute left-0 top-0 h-full w-full md:w-[60%] clip-diagonal'>
            <Image
        src="img/pathGroup.svg"
        alt="Background Design"
        fill
        className="object-cover pointer-events-none w-[44px] h-[44px] right-0"
        priority/>
    </div>

        <div className="relative z-10 container mx-auto h-full md:h-[137%] flex flex-col md:flex-row items-center justify-between px-4 md:px-20 py-8 md:py-0 md:ml-[2%] gap-8">
            {/* Phone Component */}
            <div className="flex-shrink-0 md:-ml-20 mt-8 md:mt-0">
            <div className="relative w-[280px] md:w-[320px] h-[560px] md:h-[640px] bg-[#1D1125] rounded-[3rem] overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[#2D1935]">
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#1D1125] to-transparent" />
                </div>

                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[44px] bg-black rounded-[24px] flex items-center justify-between px-4 mt-2">
                <div className="w-[12px] h-[12px] rounded-full bg-[#1D1125] flex items-center justify-center">
                <div className="w-[8px] h-[8px] rounded-full bg-[#1D1125] border-2 border-black" />
                </div>
                <div className="w-[48px] h-[4px] bg-[#1D1125] rounded-full" />
                <div className="w-[12px] h-[12px] rounded-full bg-[#1D1125] flex items-center justify-center">
                <div className="w-[8px] h-[8px] rounded-full bg-[#1D1125]" />
                </div>
                </div>

                {/* Side Buttons */}
                <div className="absolute left-[-2px] top-[100px] space-y-6">
                <div className="w-[4px] h-[40px] bg-black rounded-r-md" />
                <div className="w-[4px] h-[40px] bg-black rounded-r-md" />
                <div className="w-[4px] h-[40px] bg-black rounded-r-md" />
                </div>

                {/* Status Bar */}
                <div className="absolute top-[40px] w-full px-6 flex justify-between items-center mt-4">
                <span className="text-white/80 text-lg">?</span>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/20 backdrop-blur-sm rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-[#E20F96] flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-white" />
                    </div>
                    <div className="text-white text-sm">
                    <span className="opacity-80">Clave</span>
                    <br />
                    <span className="opacity-80">dinámica</span>
                    </div>
                    <span className="text-white/80 ml-1">201909</span>
                    <span className="text-white text-xl">□</span>
                </div>
                </div>

                {/* Nequi Logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[160px] w-auto">
                <img src="/logo-footer.png"
                alt="Nequi Logo" 
                />
            </div>

                {/* Input Field */}
                <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-4/5">
                <div className="bg-white/10 rounded-lg px-4 py-3">
                    <span className="text-white/60 text-lg">+57</span>
                    <span className="text-white/60 text-2xl ml-2">|</span>
                </div>
                </div>
            </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col items-center md:items-start gap-6 max-w-xl text-center md:text-left">
            <h2 className="text-[#1D1125] text-3xl md:text-5xl font-bold">¿Leyendo sobre Nequi?</h2>
            <p className="text-[#1D1125] text-xl md:text-2xl">Descarga la app y prueba todas las ventajas</p>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mt-4">
                <img
                src="/qr-propulsor.svg"
                alt="QR Code"
                className="w-28 md:w-32 h-28 md:h-32 bg-white p-2 rounded-xl"
                />
                <p className="text-[#1D1125] text-base md:text-lg max-w-[280px]">
                Escanea este QR con tu celular y disfruta la facilidad que te entrega Nequi
                </p>
            </div>
            </div>
        </div>
        </div>
    </div>
    )
} 