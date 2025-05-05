import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                />
              </svg>
              <span className="ml-2 text-white text-xl font-bold">
                YTDownloader
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-400 max-w-xs">
              Faça o download de vídeos do YouTube em formatos MP3 e MP4 de
              forma rápida e simples.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                Recursos
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Início
                  </Link>
                </li>
                <li>
                  <Link
                    href="#como-usar"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Como Usar
                  </Link>
                </li>
                <li>
                  <Link
                    href="#sobre"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Sobre
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#termos"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link
                    href="#privacidade"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                Desenvolvedor
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/KevinLopes23"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/kevin-lopes-151797221/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} YTDownloader. Desenvolvido por{" "}
              <a
                href="https://github.com/KevinLopes23"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Kevin Lopes
              </a>
              . Todos os direitos reservados.
            </p>
            <p className="text-sm text-gray-400 mt-2 md:mt-0">
              Desenvolvido para uso pessoal e não comercial. Não baixe conteúdo
              protegido por direitos autorais sem permissão.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
