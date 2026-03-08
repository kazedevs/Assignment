import { useState } from 'react';
import ProposalPage from "./pages/proposal";
import CategoryPage from "./pages/category";

function App() {
  const [currentPage, setCurrentPage] = useState<'category' | 'proposal'>('category');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-100 py-5 px-6">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <nav className="flex gap-1">
            <button
              onClick={() => setCurrentPage('category')}
              className={`px-4 py-1.5 text-sm rounded-md transition ${
                currentPage === 'category'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Category
            </button>
            <button
              onClick={() => setCurrentPage('proposal')}
              className={`px-4 py-1.5 text-sm rounded-md transition ${
                currentPage === 'proposal'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Proposal
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {currentPage === 'category' && <CategoryPage />}
        {currentPage === 'proposal' && <ProposalPage />}
      </main>
    </div>
  );
}

export default App;