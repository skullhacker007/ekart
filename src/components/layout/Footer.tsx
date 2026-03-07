import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#172337] text-white pt-12 pb-8 mt-12 w-full">
      <div className="container-custom grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-gray-400 font-semibold mb-4 text-sm uppercase">About</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:underline">Contact Us</Link></li>
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/about" className="hover:underline">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-gray-400 font-semibold mb-4 text-sm uppercase">Help</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/help" className="hover:underline">Payments</Link></li>
            <li><Link href="/help" className="hover:underline">Shipping</Link></li>
            <li><Link href="/help" className="hover:underline">Cancellation & Returns</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-gray-400 font-semibold mb-4 text-sm uppercase">Policy</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/policy" className="hover:underline">Return Policy</Link></li>
            <li><Link href="/policy" className="hover:underline">Terms of Use</Link></li>
            <li><Link href="/policy" className="hover:underline">Security</Link></li>
            <li><Link href="/policy" className="hover:underline">Privacy</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-gray-400 font-semibold mb-4 text-sm uppercase">Social</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:underline">Twitter</Link></li>
            <li><Link href="#" className="hover:underline">Facebook</Link></li>
            <li><Link href="#" className="hover:underline">YouTube</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container-custom mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
        <p>&copy; {new Date().getFullYear()} E-Kart. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
