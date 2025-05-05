import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Promisificar exec para usar async/await
const execAsync = promisify(exec);

// Diretório para armazenar os downloads
const downloadsDir = path.join(process.cwd(), "downloads");

// Caminho para o executável yt-dlp
const ytDlpPath = path.join(process.cwd(), "yt-dlp.exe");
// Caminho para o executável ffmpeg
const ffmpegPath = path.join(process.cwd(), "ffmpeg.exe");

// Criar diretório de downloads se não existir
try {
  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
  }
} catch (err) {
  console.error("Erro ao criar diretório de downloads:", err);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");
  const format = searchParams.get("format");

  if (!url) {
    return NextResponse.json({ error: "URL não fornecida" }, { status: 400 });
  }

  // Verificar se o arquivo yt-dlp.exe existe
  if (!fs.existsSync(ytDlpPath)) {
    return NextResponse.json(
      {
        error:
          "yt-dlp.exe não encontrado. Por favor, baixe-o e coloque na pasta raiz do projeto.",
      },
      { status: 500 }
    );
  }

  // Verificar se o ffmpeg existe
  if (!fs.existsSync(ffmpegPath)) {
    return NextResponse.json(
      {
        error:
          "ffmpeg.exe não encontrado. Por favor, baixe-o e coloque na pasta raiz do projeto.",
      },
      { status: 500 }
    );
  }

  // Função para validar URL do YouTube
  const validateYouTubeUrl = (url: string) => {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return pattern.test(url);
  };

  if (!validateYouTubeUrl(url)) {
    return NextResponse.json(
      { error: "URL do YouTube inválida" },
      { status: 400 }
    );
  }

  try {
    // Gerar ID único para o arquivo
    const fileId = uuidv4();
    const outputPath = path.join(downloadsDir, fileId);

    let ytdlpCommand = "";
    let outputFile = "";
    let outputFormat = "";

    if (format === "mp3") {
      outputFormat = "mp3";
      outputFile = `${outputPath}.${outputFormat}`;
      // Comando para baixar apenas áudio em formato mp3 com ffmpeg explícito
      ytdlpCommand = `"${ytDlpPath}" -x --audio-format mp3 --ffmpeg-location "${ffmpegPath}" --no-part --audio-quality 0 -o "${outputFile}" ${url}`;
    } else {
      outputFormat = "mp4";
      outputFile = `${outputPath}.${outputFormat}`;
      // Comando para baixar vídeo em formato mp4 com ffmpeg explícito
      ytdlpCommand = `"${ytDlpPath}" -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" --ffmpeg-location "${ffmpegPath}" --no-part --remux-video mp4 -o "${outputFile}" ${url}`;
    }

    try {
      // Obter o título do vídeo
      const { stdout: title } = await execAsync(
        `"${ytDlpPath}" --get-title ${url}`
      );
      const sanitizedTitle = title
        .trim()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "_");

      console.log(`Iniciando download com comando: ${ytdlpCommand}`);

      // Iniciar download de forma síncrona para garantir conclusão
      await execAsync(ytdlpCommand);

      // Verificar se o arquivo foi criado corretamente
      if (!fs.existsSync(outputFile) || fs.statSync(outputFile).size < 1000) {
        return NextResponse.json(
          { error: "Falha ao baixar o arquivo. Tente novamente." },
          { status: 500 }
        );
      }

      console.log(`Download concluído: ${outputFile}`);

      // Retornar resposta com o arquivo já baixado
      return NextResponse.json({
        success: true,
        message: "Download concluído",
        fileId: fileId,
        fileName: `${sanitizedTitle}.${outputFormat}`,
        downloadUrl: `/api/stream?fileId=${fileId}&format=${outputFormat}&fileName=${encodeURIComponent(
          `${sanitizedTitle}.${outputFormat}`
        )}`,
      });
    } catch (downloadError: any) {
      console.error("Erro ao processar download:", downloadError);
      return NextResponse.json(
        { error: downloadError.message || "Falha ao processar o vídeo" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Erro ao processar URL:", error);
    return NextResponse.json(
      { error: error.message || "Ocorreu um erro inesperado" },
      { status: 500 }
    );
  }
}
