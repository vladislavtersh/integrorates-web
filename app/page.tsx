export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 space-y-12">
      
      {/* 1. HERO / INTRO */}
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold">
          INTEGRORATES
        </h1>
        <p className="text-sm text-zinc-500">
          Official exchange rates for accounting & compliance.
          Multiple central banks. One canonical view.
        </p>
      </section>

      {/* 2. RATES TABLE */}
      <section>
        <h2 className="mb-4 text-lg font-medium">
          Exchange Rates
        </h2>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-100 dark:bg-zinc-900">
              <tr>
                <th className="px-4 py-2 text-left">Currency</th>
                <th className="px-4 py-2 text-left">Rate</th>
                <th className="px-4 py-2 text-left">Base</th>
                <th className="px-4 py-2 text-left">Source</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-zinc-200 dark:border-zinc-800">
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. SOURCE STATUS */}
      <section>
        <h2 className="mb-3 text-lg font-medium">
          Data Sources
        </h2>

        <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
          <li>ECB — status: unknown</li>
          <li>CBR — status: unknown</li>
          <li>CBUAE — status: unknown</li>
        </ul>
      </section>

      {/* 4. DISCLAIMER */}
      <section className="pt-8 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500">
        <p>
          Rates provided for informational and accounting purposes only.
          Not financial advice.
        </p>
        <p className="mt-1">
          © Integro Nexus Creative Studio
        </p>
      </section>

    </main>
  );
}