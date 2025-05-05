# YouTubeDown

Um aplicativo web moderno para baixar vídeos do YouTube em formato MP3 ou MP4.

![YouTubeDown Screenshot](https://user-images.githubusercontent.com/example/youtubedown-screenshot.png)

## 📋 Descrição

YouTubeDown é uma aplicação web construída com Next.js que permite aos usuários baixar vídeos do YouTube em formato de áudio (MP3) ou vídeo (MP4). O aplicativo possui uma interface moderna e intuitiva, facilitando o processo de download.

## ✨ Funcionalidades

- Interface moderna com design responsivo
- Download de vídeos em formato MP3 (apenas áudio)
- Download de vídeos em formato MP4 (vídeo + áudio)
- Validação de URL do YouTube
- Integração com serviços de terceiros para evitar bloqueios do YouTube

## 🛠️ Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) - Framework React para aplicações web
- [React](https://reactjs.org/) - Biblioteca JavaScript para interfaces de usuário
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- API de Serviços Externos para processamento de vídeo

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
3. Selecione o formato desejado (MP3 para áudio, MP4 para vídeo)
4. Clique no botão de download correspondente
5. O sistema redirecionará para um serviço de processamento e o download começará automaticamente

## ⚠️ Limitações e Considerações

- **Política do YouTube**: O YouTube tem políticas contra download automatizado de conteúdo. Esta ferramenta deve ser usada apenas para baixar conteúdo que você tem permissão para acessar ou que está sob licença livre.
- **Serviços de Terceiros**: Esta aplicação depende de serviços externos para evitar bloqueios. Se esses serviços mudarem sua API, será necessário atualizar o aplicativo.
- **Compatibilidade de URLs**: Nem todos os formatos de URL funcionam igualmente bem. Experimente com formatos diferentes:
  - ✅ Funciona melhor: `https://www.youtube.com/watch?v=VIDEO_ID`
  - ⚠️ Pode falhar: URLs curtas como `https://youtu.be/VIDEO_ID`
- **Vídeos Protegidos**: Vídeos com restrições podem não funcionar com os serviços externos.

## 🔄 Solução de Problemas

Se encontrar erros ao baixar vídeos, tente:

1. Usar o formato completo da URL (`https://www.youtube.com/watch?v=VIDEO_ID`)
2. Tentar vídeos diferentes (alguns têm mais restrições que outros)
3. Verificar se o vídeo não tem restrições de idade ou geográficas

## 🌐 Hospedagem

### ✅ Opções de Hospedagem Recomendadas

Este projeto está otimizado para ser hospedado em:

1. **[Vercel](https://vercel.com/)** - Criada pelos desenvolvedores do Next.js
2. **[Netlify](https://www.netlify.com/)** - Suporta funções serverless
3. **[Railway](https://railway.app/)** - Plataforma para implantar aplicações full-stack
4. **[Render](https://render.com/)** - Oferece serviços web gratuitos com suporte a Next.js

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🔄 Atualizações Recentes

- Migração para uma abordagem baseada em redirecionamento para APIs de terceiros
- Remoção da dependência de bibliotecas que são bloqueadas pelo YouTube
- Melhoria no tratamento de erros e feedback ao usuário

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests para melhorar este projeto.

---

⭐ Criado com ❤️ para facilitar o download de conteúdo do YouTube.

_Nota: Use esta ferramenta com responsabilidade e respeite os direitos autorais dos criadores de conteúdo._
