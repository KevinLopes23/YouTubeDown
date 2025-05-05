"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface DownloadFormProps {
  onDownload: (url: string, format: "mp3" | "mp4") => Promise<void>;
  isLoading: boolean;
  error: string;
}

const DownloadForm: React.FC<DownloadFormProps> = ({
  onDownload,
  isLoading,
  error,
}) => {
  const [url, setUrl] = useState("");
  const [formatSelected, setFormatSelected] = useState<"mp3" | "mp4" | null>(
    null
  );

  const handleSubmit = async (format: "mp3" | "mp4") => {
    setFormatSelected(format);
    await onDownload(url, format);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:translate-y-[-2px]">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Baixar Vídeos do YouTube
        </h2>

        <div className="mb-6">
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            URL do YouTube
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </div>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              aria-describedby={error ? "url-error" : undefined}
              disabled={isLoading}
              required
            />
          </div>
          {error && (
            <p
              id="url-error"
              className="mt-2 text-sm text-red-600 dark:text-red-400"
              aria-live="polite"
            >
              {error}
            </p>
          )}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Cole a URL do vídeo e escolha o formato desejado para iniciar o
          download.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSubmit("mp3")}
            disabled={isLoading || !url}
            className={`flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white shadow-sm ${
              formatSelected === "mp3" && isLoading
                ? "bg-yellow-400 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            } transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed`}
            aria-busy={formatSelected === "mp3" && isLoading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            {formatSelected === "mp3" && isLoading
              ? "Processando..."
              : "Baixar como MP3"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSubmit("mp4")}
            disabled={isLoading || !url}
            className={`flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white shadow-sm ${
              formatSelected === "mp4" && isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            } transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed`}
            aria-busy={formatSelected === "mp4" && isLoading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                clipRule="evenodd"
              />
            </svg>
            {formatSelected === "mp4" && isLoading
              ? "Processando..."
              : "Baixar como MP4"}
          </motion.button>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-100 dark:border-gray-600">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Este serviço é apenas para uso pessoal. Baixe apenas conteúdos que
          você tem permissão para acessar.
        </p>
      </div>
    </div>
  );
};

export default DownloadForm;
