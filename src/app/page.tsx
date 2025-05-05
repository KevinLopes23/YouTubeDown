"use client";

import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DownloadForm from "./components/DownloadForm";
import LoadingIndicator from "./components/LoadingIndicator";
import HowToUse from "./components/HowToUse";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [fileName, setFileName] = useState("");

  const handleDownload = async (url: string, format: "mp3" | "mp4") => {
    if (!url) {
      setError("Por favor, insira uma URL do YouTube");
      return;
    }

    try {
      setIsLoading(true);
      setProgress(10);
      setError("");
      setDownloadLink("");

      // Timer para simular progresso enquanto o servidor está processando
      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressTimer);
            return 90;
          }
          return prev + 10;
        });
      }, 1000);

      const response = await fetch(
        `/api/download?url=${encodeURIComponent(url)}&format=${format}`
      );

      clearInterval(progressTimer);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao baixar vídeo");
      }

      const data = await response.json();

      if (data.success) {
        setProgress(100);
        setDownloadLink(data.downloadUrl);
        setFileName(data.fileName);

        // Inicie o download automaticamente
        const link = document.createElement("a");
        link.href = data.downloadUrl;
        link.download = data.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
          setIsLoading(false);
          setProgress(0);
        }, 2000);
      } else {
        throw new Error(data.error || "Falha ao processar o download");
      }
    } catch (error: any) {
      setError(error.message || "Ocorreu um erro ao processar seu pedido");
      setIsLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-500 pt-16 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl text-center mb-6">
              Baixe vídeos do YouTube
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl text-center mb-10">
              Baixe seus vídeos favoritos do YouTube em formato MP3 ou MP4
              rápido e fácil.
            </p>

            <div className="w-full max-w-2xl">
              <DownloadForm
                onDownload={handleDownload}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>
        </div>

        {/* Como usar section */}
        <HowToUse />

        {/* Sobre section */}
        <section id="sobre" className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Sobre o YTDownloader
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 lg:mx-auto">
                Uma ferramenta para download de vídeos do YouTube
              </p>
            </div>

            <div className="mt-10">
              <div className="prose prose-lg dark:prose-invert mx-auto">
                <p>
                  O YTDownloader é uma aplicação web feita para facilitar o
                  download de conteúdos do YouTube para seu dispositivo. A
                  ferramenta permite baixar vídeos em formato MP4 (vídeo +
                  áudio) ou extrair apenas o áudio em formato MP3.
                </p>
                <p>
                  Desenvolvida com tecnologias modernas como Next.js, React e
                  Tailwind CSS, a aplicação roda completamente no seu
                  computador, utilizando o utilitário yt-dlp para processar os
                  downloads de maneira eficiente.
                </p>
                <p>
                  <strong>Importante:</strong> Esta ferramenta foi criada apenas
                  para fins educacionais e pessoais. Respeite os direitos
                  autorais e só baixe conteúdos que você tenha permissão para
                  acessar.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <LoadingIndicator
        isLoading={isLoading}
        progress={progress}
        message={
          progress === 100 ? "Download concluído!" : "Baixando o vídeo..."
        }
      />
    </div>
  );
}
