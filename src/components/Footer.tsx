import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex p-10 lg:px-0 lg:py-12 bg-black justify-center">
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-10 lg:max-w-[653px] items-center">
        <Link href="https://www.pycon.jp/" target="_blank" rel="noopener noreferrer">
          <Image
            src='/association-logo.svg'
            alt="Pycon JP Association Logo"
            height={143}
            width={85}
            className="bg-white w-32 p-2"
          />
        </Link>
        <div className="text-white">
          主催: 一般社団法人PyCon JP Association PyCon JP 2024 is a production
          of the PyCon JP Association
        </div>
      </div>
    </footer>
  );
}
