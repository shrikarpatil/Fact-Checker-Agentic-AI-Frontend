"use client";

import { useEffect, useState } from "react";
import { checkFact } from "@/actions/fact-actions";
import { getEnvVariable } from "@/actions/getEnvVariable";
import  io  from "socket.io-client";

export default function Homepage() {
  const [claim, setClaim] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Check Fact");
  const [socket,setSocket]=useState<any>(null);
 
  useEffect(() => { 
    const connectSocket = async () => {
     const backendUrl = await getEnvVariable('BACKEND_BASE_URL');
      const socket = io(backendUrl!);
      socket.on("status", (data: any) => {
        setStatus(data.message);
      });
    }
    connectSocket();   
      
  },[])

  const handleCheck = async () => {
    if (!claim.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await checkFact(claim);
      setResult(res);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          🔎 Fact Checker
        </h1>

        <textarea
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
          placeholder="Enter a claim to verify..."
          className="w-full text-gray-900 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          rows={3}
        />

        <button
          onClick={handleCheck}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {status}
        </button>

        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

        {result && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded-lg">
              <h2 className="text-lg text-gray-900 font-bold">Verdict</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {result.verdict}
              </p>
            </div>

            <div className="p-4 bg-gray-50 border rounded-lg max-h-64 overflow-y-auto">
              <h2 className="text-lg text-gray-900 font-bold mb-2">Sources</h2>
              <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                {result.searchResults}
              </pre>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
