
import { useState } from "react";

export default function Gerar() {
  const [tema, setTema] = useState("");
  const [roteiro, setRoteiro] = useState("");
  const [audio, setAudio] = useState("");
  const [video, setVideo] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);

  async function gerarRoteiro() {
    setLoading(true);
    setStatus("⏳ Gerando roteiro com IA...");
    setRoteiro("");
    setAudio("");
    setVideo("");

    try {
      const res = await fetch("/api/gerar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tema }),
      });

      const data = await res.json();
      if (res.ok && data.roteiro) {
        setRoteiro(data.roteiro);
        setStatus("✅ Roteiro pronto!");
      } else {
        setStatus("❌ Erro ao gerar roteiro.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Falha ao conectar com servidor.");
    }

    setLoading(false);
  }

  async function gerarAudio() {
    setLoadingAudio(true);
    setStatus("🔊 Gerando áudio com IA...");

    try {
      const res = await fetch("/api/gerar-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roteiro }),
      });

      const data = await res.json();
      if (res.ok && data.audio) {
        setAudio(data.audio);
        setStatus("✅ Áudio gerado!");
      } else {
        setStatus("❌ Erro ao gerar áudio.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Falha ao conectar com servidor.");
    }

    setLoadingAudio(false);
  }

  async function gerarVideo() {
    setLoadingVideo(true);
    setStatus("🎞️ Gerando vídeo com roteiro e áudio...");

    try {
      const res = await fetch("/api/gerar-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roteiro, audioBase64: audio }),
      });

      const data = await res.json();
      if (res.ok && data.video) {
        setVideo(data.video);
        setStatus("✅ Vídeo pronto!");
      } else {
        setStatus("❌ Erro ao gerar vídeo.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Falha ao conectar com servidor.");
    }

    setLoadingVideo(false);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>🎬 Gerar Vídeo com IA</h1>
      <p>
        <strong>Tema:</strong>{" "}
        <input
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          placeholder="Digite um tema..."
        />
        <button onClick={gerarRoteiro} disabled={loading}>
          {loading ? "Gerando..." : "Gerar"}
        </button>
      </p>

      {status && <p><strong>Status:</strong> {status}</p>}

      {roteiro && typeof roteiro === "string" && (
        <div style={{ marginTop: 20 }}>
          <h3>📜 Roteiro:</h3>
          <pre>{roteiro}</pre>

          <button onClick={gerarAudio} disabled={loadingAudio}>
            {loadingAudio ? "🔊 Gerando áudio..." : "🔈 Gerar Áudio"}
          </button>

          {audio && (
            <div style={{ marginTop: 20 }}>
              <audio controls src={audio} />
              <br />
              <button onClick={gerarVideo} disabled={loadingVideo}>
                {loadingVideo ? "🎬 Gerando vídeo..." : "🎞️ Gerar Vídeo"}
              </button>
            </div>
          )}

          {video && (
            <div style={{ marginTop: 20 }}>
              <video controls width="500" src={video} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
