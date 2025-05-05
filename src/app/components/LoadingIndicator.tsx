"use client";

import React, { useEffect, useState } from "react";

interface LoadingIndicatorProps {
  isLoading: boolean;
  progress?: number;
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  isLoading,
  progress = 0,
  message = "Baixando o vídeo...",
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // Animar o progresso suavemente
  useEffect(() => {
    if (isLoading) {
      const diff = progress - animatedProgress;
      const step = Math.max(1, Math.floor(diff / 10));

      if (diff > 0) {
        const timer = setTimeout(() => {
          setAnimatedProgress((prev) => Math.min(progress, prev + step));
        }, 50);
        return () => clearTimeout(timer);
      }
    } else {
      setAnimatedProgress(0);
    }
  }, [isLoading, progress, animatedProgress]);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="loading-title"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-2xl transform transition-all duration-300 ease-in-out scale-100">
        <h3
          id="loading-title"
          className="text-xl font-medium text-gray-900 dark:text-white mb-4 flex items-center"
        >
          {progress === 100 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {message}
        </h3>

        <div
          className="w-full bg-gray-200 rounded-full h-3 mb-4 dark:bg-gray-700 overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={animatedProgress}
        >
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${animatedProgress}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span className="font-semibold">{animatedProgress}%</span>
          {animatedProgress < 100 ? (
            <span className="italic">Por favor aguarde...</span>
          ) : (
            <span className="text-green-600 dark:text-green-400 font-medium">
              Finalizando...
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
