export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to My Portfolio
        </h1>
        <p className="text-lg mb-8">
          Built with Next.js and Express in a Turborepo monorepo
        </p>
        <div className="space-x-4">
          <a
            href="/about"
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            About Me
          </a>
          <a
            href="/projects"
            className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Projects
          </a>
        </div>
      </main>
    </div>
  );
}
