import Navbar from './Navbar';
import OldNavbar from './OldNavbar';

export default function Header() {
  return (
    <header className="h-full max-w-[1150px] mx-auto">
      {/* <OldNavbar /> */}
      <Navbar />
    </header>
  );
}
