export const metadata = {
  title: "INTEGRORATES",
  description: "Official exchange rates for compliance & accounting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        <header
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <strong>INTEGRORATES</strong>
        </header>

        <main>{children}</main>

        <footer
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #e5e7eb",
            fontSize: 12,
            opacity: 0.7,
          }}
        >
          © Integro Nexus Creative Studio
        </footer>
      </body>
    </html>
  );
}