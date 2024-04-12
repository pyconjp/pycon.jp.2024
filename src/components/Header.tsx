import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky z-40 shadow-md">
      <div className="mx-auto h-12 w-11/12 flex items-center justify-between gap-10">
        <div>
          ロゴ
        </div>
        <div className='hidden lg:block flex-1'>
          <nav>
            <ul className="flex gap-4 flex-row justify-between">
              <li>
                <Link href="/">
                  メニュー1
                </Link>
              </li>
              <li>
                <Link href="/">
                  メニュー2
                </Link>
              </li>
              <li>
                <Link href="/">
                  メニュー3
                </Link>
              </li>
              <li>
                <Link href="/">
                  メニュー4
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className='hidden lg:block'>
          言語切り替え
        </div>
      </div>
    </header>
  );
}
