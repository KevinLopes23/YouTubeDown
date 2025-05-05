# YouTubeDown

Um aplicativo web moderno para baixar vídeos do YouTube em formato MP3 ou MP4.

## 📋 Descrição

YouTubeDown é uma aplicação web construída com Next.js que permite aos usuários baixar vídeos do YouTube em formato de áudio (MP3) ou vídeo (MP4). O aplicativo possui uma interface moderna e intuitiva, facilitando o processo de download.

## ✨ Funcionalidades

- Interface moderna com design responsivo
- Baixar vídeos em formato MP3 (apenas áudio)
- Baixar vídeos em formato MP4 (vídeo + áudio)
- Validação de URL do YouTube
- Mensagens de erro claras para o usuário

## 🛠️ Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) - Framework React para aplicações web
- [React](https://reactjs.org/) - Biblioteca JavaScript para interfaces de usuário
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [ytdl-core](https://github.com/fent/node-ytdl-core) - Biblioteca para baixar vídeos do YouTube
- [@distube/ytdl-core](https://github.com/distubejs/ytdl-core) - Fork alternativo para download de vídeos

## 🚀 Instalação e Execução Local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/youtubedown.git
cd youtubedown

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

O aplicativo estará disponível em [http://localhost:3000](http://localhost:3000).

## 📝 Como Usar

1. Acesse a aplicação em seu navegador
2. Cole a URL do vídeo do YouTube que deseja baixar
3. Selecione o formato desejado (MP3 ou MP4)
4. Clique no botão de download correspondente
5. Aguarde o processamento e o download começará automaticamente

## ⚠️ Limitações e Considerações

- **Política do YouTube**: O YouTube tem políticas contra download automatizado de conteúdo. Esta ferramenta deve ser usada apenas para baixar conteúdo que você tem permissão para acessar ou que está sob licença livre.
- **Restrições do YouTube**: O YouTube frequentemente altera seus sistemas para bloquear ferramentas de download. Algumas URLs podem resultar em erro 403 (Forbidden).
- **Compatibilidade de URLs**: Nem todos os formatos de URL funcionam igualmente bem. Experimente com formatos diferentes:
  - ✅ Funciona melhor: `https://www.youtube.com/watch?v=VIDEO_ID`
  - ⚠️ Pode falhar: URLs curtas como `https://youtu.be/VIDEO_ID`
- **Vídeos Populares**: Vídeos muito populares ou com restrições podem ser mais difíceis de baixar.
- **Vídeos Regionais**: Vídeos com restrições regionais podem não funcionar corretamente.
- **Compatibilidade**: As bibliotecas de download precisam ser atualizadas periodicamente devido a mudanças na API do YouTube.

## 🔄 Solução de Problemas

Se encontrar erros ao baixar vídeos, tente:

1. Usar o formato completo da URL (`https://www.youtube.com/watch?v=VIDEO_ID`)
2. Tentar vídeos diferentes (alguns têm mais restrições que outros)
3. Verificar se o vídeo não tem restrições de idade ou geográficas
4. Reiniciar o servidor de desenvolvimento
5. Atualizar as bibliotecas de download com `npm update ytdl-core @distube/ytdl-core`

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests para melhorar este projeto.

---

⭐ Criado com ❤️ para facilitar o download de conteúdo do YouTube.

_Nota: Use esta ferramenta com responsabilidade e respeite os direitos autorais dos criadores de conteúdo._
