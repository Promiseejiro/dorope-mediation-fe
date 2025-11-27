export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="bg-gray-50 min-h-screen flex flex-col">{children}</div>
    </main>
  );
}
