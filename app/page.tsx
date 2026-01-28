import { MOCK_RATES } from "@/lib/rates";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <header className="border-b border-zinc-200 px-8 py-4">
        <div className="text-sm font-semibold tracking-wide">
          INTEGRORATES
        </div>
      </header>

      <section className="px-8 py-12">
        <h1 className="text-4xl font-bold tracking-tight">
          INTEGRORATES
        </h1>
        <p className="mt-2 text-zinc-600">rates.integro.tech</p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left">
                <th className="px-4 py-2 font-medium">Currency</th>
                <th className="px-4 py-2 font-medium">Rate</th>
                <th className="px-4 py-2 font-medium">Base</th>
                <th className="px-4 py-2 font-medium">Source</th>
                <th className="px-4 py-2 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_RATES.map((r) => (
                <tr
                  key={r.currency}
                  className="border-t border-zinc-200"
                >
                  <td className="px-4 py-2 font-medium">
                    {r.currency}
                  </td>
                  <td className="px-4 py-2">{r.rate}</td>
                  <td className="px-4 py-2">{r.base}</td>
                  <td className="px-4 py-2">{r.source}</td>
                  <td className="px-4 py-2">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="border-t border-zinc-200 px-8 py-4 text-sm text-zinc-500">
        © Integro Nexus Creative Studio
      </footer>
    </main>
  );
}