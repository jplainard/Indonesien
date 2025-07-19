'use client';

import { useState } from 'react';

export default function TestAuth() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testRegister = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: `test${Date.now()}@example.com`,
          password: 'MotDePasseSecurise123!',
          firstName: 'Test',
          lastName: 'User'
        }),
      });

      const data = await response.json();
      setResult(`Inscription: ${response.status} - ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setResult(`Erreur: ${error}`);
    }
    setLoading(false);
  };

  const testLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'MotDePasseSecurise123!'
        }),
      });

      const data = await response.json();
      setResult(`Connexion: ${response.status} - ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setResult(`Erreur: ${error}`);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Test d'authentification</h2>
      
      <div className="space-x-4 mb-4">
        <button
          onClick={testRegister}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Tester Inscription
        </button>
        
        <button
          onClick={testLogin}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          Tester Connexion
        </button>
      </div>
      
      {result && (
        <pre className="p-4 bg-gray-100 dark:bg-gray-700 rounded text-sm overflow-auto">
          {result}
        </pre>
      )}
    </div>
  );
}
