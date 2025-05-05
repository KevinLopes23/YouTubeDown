import { NextRequest, NextResponse } from "next/server";
// Vamos remover a dependência ytdl-core e usar uma solução alternativa
// Primeiro instale com: npm install youtube-dl-exec

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");
  const format = searchParams.get("format");

  if (!url) {
    return NextResponse.json({ error: "URL não fornecida" }, { status: 400 });
  }

  // Função para validar URL do YouTube
  const validateYouTubeUrl = (url: string) => {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return pattern.test(url);
  };

  try {
    if (!validateYouTubeUrl(url)) {
      return NextResponse.json(
        { error: "URL do YouTube inválida" },
        { status: 400 }
      );
    }

    // Usando serviços alternativos mais confiáveis
    // Y2mate é uma alternativa popular para download do YouTube
    const videoId = extractVideoId(url);
    if (!videoId) {
      return NextResponse.json(
        { error: "Não foi possível extrair o ID do vídeo" },
        { status: 400 }
      );
    }

    // Usando o serviço yout-ube que é mais confiável
    const serviceUrl =
      format === "mp3"
        ? `https://www.y2mate.com/youtube-mp3/${videoId}`
        : `https://www.y2mate.com/youtube/${videoId}`;

    return NextResponse.json({
      success: true,
      redirectUrl: serviceUrl,
    });
  } catch (error) {
    console.error("Erro ao processar URL:", error);
    return NextResponse.json(
      { error: "Falha ao processar o vídeo. Verifique se a URL é válida." },
      { status: 500 }
    );
  }
}

// Função para extrair o ID do vídeo do YouTube
function extractVideoId(url: string): string | null {
  // Para URLs no formato: https://www.youtube.com/watch?v=VIDEO_ID
  let match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\?]*)/);
  return match ? match[1] : null;
}
