interface FooterProps {
  companyName: string;
  footerText?: string;
}

export default function Footer({
  companyName,
  footerText,
}: FooterProps) {
  return (
    <footer className="bg-gray-950 px-6 py-8 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 md:flex-row">
        <p className="font-semibold">{companyName}</p>

        <p className="text-sm text-gray-400">
          {footerText}
        </p>
      </div>
    </footer>
  );
}