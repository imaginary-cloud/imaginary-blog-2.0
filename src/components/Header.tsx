import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="py-4 bg-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center max-w-6xl">
        <div className="mb-4 md:mb-0">
          <Link href="/">
            <Image src="logo.svg" alt="Logo" width={250} height={250} />
          </Link>
        </div>

        <nav className="flex flex-col md:flex-row md:space-x-4">
          <div className="group py-2 px-4 relative md:hover:block">
            <span className="hover:text-blue-500 hover:cursor-pointer">
              SERVICES
            </span>
            <div className="absolute hidden bg-white mt-5 p-4 space-y-2 w-full md:w-screen left-0 border-t-1 border-neutral-950 md:border-none md:relative md:mt-0">
              <div className="grid grid-cols-4 place-items-center">
                <div>
                  <a className="font-semibold">All Services</a>
                </div>

                {/* Column 2 */}
                <div>
                  <h3 className="font-semibold">Column 2</h3>
                  <a href="#" className="block">
                    Link 1
                  </a>
                  <a href="#" className="block">
                    Link 2
                  </a>
                  <a href="#" className="block">
                    Link 3
                  </a>
                </div>

                {/* Column 3 */}
                <div>
                  <h3 className="font-semibold">Column 3</h3>
                  <a href="#" className="block">
                    Link 1
                  </a>
                  <a href="#" className="block">
                    Link 2
                  </a>
                  <a href="#" className="block">
                    Link 3
                  </a>
                </div>

                {/* Column 4 */}
                <div>
                  <h3 className="font-semibold">Column 4</h3>
                  <a href="#" className="block">
                    Link 1
                  </a>
                  <a href="#" className="block">
                    Link 2
                  </a>
                  <a href="#" className="block">
                    Link 3
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Add similar dropdowns for other menu items */}

          <span className="hover:text-blue-500 hover:cursor-pointer px-4 py-2 rounded">
            PORTFOLIO
          </span>

          <span className="hover:text-blue-500 hover:cursor-pointer px-4 py-2 rounded">
            FOR CTOs
          </span>

          <span className="hover:text-blue-500 hover:cursor-pointer px-4 py-2 rounded">
            COMPANY
          </span>

          <a
            href="#"
            className="hover:text-blue-500 hover:cursor-pointer px-4 py-2 rounded"
          >
            CAREERS
          </a>

          <button className="bg-blue-500 text-white px-4 py-2">CONTACT US</button>
        </nav>
      </div>
    </header>
  );
}
