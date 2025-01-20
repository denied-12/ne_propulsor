import Image from "next/image"

export default function HeroSection() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_20250118_194521_Chrome.jpg-ZVyPHeciXZd7kEPNjL8Ytjz6bky1jb.jpeg"
          alt="Person working with laptop and phone"
          fill
          className="object-cover"
          priority
        />
        {/* Pink diagonal overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="h-full w-full"
            fill="none"
          >
            <path d="M0 100 L100 30 L100 100 L0 100" fill="#E6007E" />
          </svg>
        </div>
      </div>
    </div>
  )
}

