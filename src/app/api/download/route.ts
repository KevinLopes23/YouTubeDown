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

    // Redirecionamento para serviços alternativos confiáveis
    // Esta é uma solução não ideal, mas que funciona em ambientes hospedados
    const serviceUrl =
      format === "mp3"
        ? `https://api.vevioz.com/api/button/mp3/${encodeURIComponent(url)}`
        : `https://api.vevioz.com/api/button/mp4/${encodeURIComponent(url)}`;

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
