export const metadata = {
  title: "Lagu Ini Untukmu",
  description: "Buat lagu kustom spesial untuk orang tersayang",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-slate-50">{children}</body>
    </html>
  );
}
