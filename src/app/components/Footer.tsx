export function Footer() {
  return (
    <footer className="border-t border-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Nikolai Grigorev</p>
          <p>Designed & Built with care</p>
        </div>
      </div>
    </footer>
  );
}