import { NextRequest, NextResponse } from "next/server";
import ytdl from "@distube/ytdl-core";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");
  const format = searchParams.get("format");

  if (!url) {
    return NextResponse.json({ error: "URL não fornecida" }, { status: 400 });
  }

  try {
    if (!ytdl.validateURL(url)) {
      return NextResponse.json(
        { error: "URL do YouTube inválida" },
        { status: 400 }
      );
    }

    // Definir as opções apropriadas para cada formato
    const options = {
      quality: format === "mp3" ? "highestaudio" : "highest",
      filter: format === "mp3" ? "audioonly" : "audioandvideo",
    };

    try {
      // Buscar informações do vídeo
      const info = await ytdl.getInfo(url);
      const title = info.videoDetails.title.replace(/[^\w\s]/gi, "") || "video";

      // Escolher o formato correto baseado no request
      let contentType = format === "mp3" ? "audio/mpeg" : "video/mp4";
      let filename = `${title}.${format}`;

      // Iniciar o download
      const stream = ytdl(url, options);

      // Usar headers para definir o arquivo para download
      const headers = new Headers();
      headers.set("Content-Disposition", `attachment; filename="${filename}"`);
      headers.set("Content-Type", contentType);

      // Retornar o stream como resposta
      return new Response(stream as any, {
        headers: headers,
      });
    } catch (downloadError) {
      console.error("Erro detalhado:", downloadError);
      return NextResponse.json(
        { error: `Erro ao processar o vídeo: ${downloadError.message}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erro ao baixar vídeo:", error);
    return NextResponse.json(
      { error: "Falha ao processar o vídeo. Verifique se a URL é válida." },
      { status: 500 }
    );
  }
}
