"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async (format: "mp3" | "mp4") => {
    if (!url) {
      setError("Por favor, insira uma URL do YouTube");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // Redireciona para a API de download
      window.location.href = `/api/download?url=${encodeURIComponent(
        url
      )}&format=${format}`;

      // Reseta o estado após um curto período
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (_) {
      setError("Ocorreu um erro ao processar o download");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-800 text-white">
      <div className="container mx-auto py-16 px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">YouTubeDown</h1>
          <p className="text-xl md:text-2xl opacity-90">
            Baixe vídeos do YouTube em MP3 ou MP4 gratuitamente
          </p>
        </header>

        <main className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
            <div className="mb-6">
              <label htmlFor="url" className="block text-lg mb-2 font-medium">
                URL do Vídeo
              </label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60"
              />
              {error && <p className="mt-2 text-red-300">{error}</p>}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleDownload("mp3")}
                disabled={isLoading}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? (
                  "Processando..."
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                      />
                    </svg>
                    Baixar MP3
                  </>
                )}
              </button>
              <button
                onClick={() => handleDownload("mp4")}
                disabled={isLoading}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? (
                  "Processando..."
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Baixar MP4
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-12 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Como usar:</h2>
            <ol className="list-decimal list-inside space-y-3">
              <li>Cole a URL do vídeo do YouTube no campo acima</li>
              <li>
                Escolha o formato desejado (MP3 para áudio, MP4 para vídeo)
              </li>
              <li>Clique no botão correspondente para iniciar o download</li>
              <li>
                Aguarde o processamento e o download irá começar automaticamente
              </li>
            </ol>
          </div>
        </main>

        <footer className="mt-16 text-center opacity-80 text-sm">
          <p>
            © {new Date().getFullYear()} YouTubeDown - Baixe vídeos do YouTube
            facilmente
          </p>
        </footer>
      </div>
    </div>
  );
}
