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

    try {
      // Buscar informações do vídeo
      const info = await ytdl.getInfo(url);
      const title = info.videoDetails.title.replace(/[^\w\s]/gi, "") || "video";

      // Escolher o formato correto baseado no request
      const contentType = format === "mp3" ? "audio/mpeg" : "video/mp4";
      const filename = `${title}.${format}`;

      // Iniciar o download com opções tipadas corretamente
      const stream =
        format === "mp3"
          ? ytdl(url, { quality: "highestaudio", filter: "audioonly" })
          : ytdl(url, { quality: "highest" });

      // Usar headers para definir o arquivo para download
      const headers = new Headers();
      headers.set("Content-Disposition", `attachment; filename="${filename}"`);
      headers.set("Content-Type", contentType);

      // Retornar o stream como resposta
      return new Response(stream as unknown as ReadableStream, {
        headers: headers,
      });
    } catch (downloadError: unknown) {
      console.error("Erro detalhado:", downloadError);
      let errorMessage = "Erro ao processar o vídeo";

      // Verificar se o erro tem uma propriedade 'message'
      if (downloadError instanceof Error) {
        errorMessage = `${errorMessage}: ${downloadError.message}`;
      }

      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  } catch (error) {
    console.error("Erro ao baixar vídeo:", error);
    return NextResponse.json(
      { error: "Falha ao processar o vídeo. Verifique se a URL é válida." },
      { status: 500 }
    );
  }
}
