import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Diretório onde os downloads são armazenados
const downloadsDir = path.join(process.cwd(), "downloads");

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const fileId = searchParams.get("fileId");
  const format = searchParams.get("format");
  const fileName = searchParams.get("fileName") || `download.${format}`;

  if (!fileId || !format) {
    return NextResponse.json(
      { error: "Parâmetros inválidos" },
      { status: 400 }
    );
  }

  try {
    // Caminho do arquivo baixado
    const filePath = path.join(downloadsDir, `${fileId}.${format}`);

    // Verificar se o arquivo existe
    if (!fs.existsSync(filePath)) {
      // Se não existir, verificar se está em download
      return NextResponse.json(
        {
          error: "Arquivo ainda não está pronto",
          isDownloading: true,
        },
        { status: 202 }
      );
    }

    // Verificar o tamanho do arquivo (para ter certeza que o download terminou)
    const stats = fs.statSync(filePath);
    if (stats.size === 0) {
      return NextResponse.json(
        {
          error: "O download ainda está em andamento",
          isDownloading: true,
        },
        { status: 202 }
      );
    }

    // Obter bytes do arquivo
    const fileBuffer = fs.readFileSync(filePath);

    // Define o tipo de conteúdo baseado no formato
    const contentType = format === "mp3" ? "audio/mpeg" : "video/mp4";

    // Retorna o arquivo como download
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Type": contentType,
        "Content-Length": stats.size.toString(),
      },
    });
  } catch (error) {
    console.error("Erro ao processar stream:", error);
    return NextResponse.json(
      { error: "Falha ao processar o stream" },
      { status: 500 }
    );
  }
}
