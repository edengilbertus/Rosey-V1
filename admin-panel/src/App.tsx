import React from 'react';
import { Router } from './Router';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">ROSEY GEMS Admin Panel</h1>
        </div>
      </header>
      <main className="flex-grow">
        <Router />
      </main>
    </div>
  );
}

export default App;