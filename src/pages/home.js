import React, { useState, useEffect } from "react";
import styles from "./home.module.css";

import {
  NotificationFailure,
  NotificationSuccess,
  NotificationWarning,
} from "../components/notification";

const generos = [
  "Rock",
  "Pop",
  "Eletrônica",
  "Trap",
  "Rap",
  "Funk",
  "Samba",
  "Reggae",
  "Jazz",
  "Blues",
  "Forró",
  "MPB",
  "Clássica",
  "Lo-fi",
  "Metal",
  "House",
];

const efeitos = [
  "Animado",
  "Dramático",
  "Épico",
  "Triste",
  "Futurista",
  "Sombrio",
  "Minimalista",
];

const instrumentosPorGenero = {
  Rock: ["Guitarra", "Baixo", "Bateria", "Guitarra Solo"],
  Pop: ["Sintetizador", "Bateria Eletrônica", "Pads", "Bass Synth"],
  Eletrônica: ["Synth Lead", "Kick", "Hi-Hats", "Pads Atmosféricos"],
  Trap: ["808 Grave", "Hi-Hats Tripletados", "Snare Seco", "Clap"],
  Rap: ["Beat Lo-Fi", "Kick", "Snare", "Hi-Hats"],
  Funk: ["Beat 130bpm", "808 Grave", "Caixa Funk", "Synth Melody"],
  Samba: ["Pandeiro", "Surdo", "Cavaquinho", "Reco-reco"],
  Reggae: [
    "Guitarra Delay",
    "Baixo Marcante",
    "Bateria One Drop",
    "Órgão Hammond",
  ],
  Jazz: ["Saxofone", "Contrabaixo", "Piano", "Bateria Jazz"],
  Blues: ["Guitarra Blues", "Harmônica", "Baixo", "Bateria Leve"],
  Forró: ["Sanfona", "Triângulo", "Zabumba"],
  MPB: ["Violão", "Piano", "Pandeiro", "Percussão Suave"],
  Clássica: ["Violino", "Piano", "Cello", "Viola"],
  "Lo-fi": ["Sample Lo-Fi", "Bateria Suave", "Piano Quente", "Vinyl Noise"],
  Metal: [
    "Guitarra Distortion",
    "Duplo Pedal",
    "Baixo Pesado",
    "Guitarra Solo",
  ],
  House: ["Bass House", "Kick 4x4", "Synth Lead", "Hi-Hats Abertos"],
};

function Home() {
  const [genero, setGenero] = useState("");
  const [efeitosSelecionados, setEfeitosSelecionados] = useState([]);
  const [instrumentos, setInstrumentos] = useState([]);
  const [novoInstrumento, setNovoInstrumento] = useState("");
  const [promptGerado, setPromptGerado] = useState("");
  const [timeMusic, setTimeMusic] = useState(0);

  const [notification, setNotification] = useState("");

  const [timeRender, setTimeRender] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRender((prev) => prev + 1);
      setNotification("");
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (genero && instrumentosPorGenero[genero]) {
      setInstrumentos(instrumentosPorGenero[genero]);
    }
  }, [genero]);

  function toggleEfeito(efeito) {
    if (efeitosSelecionados.includes(efeito)) {
      setEfeitosSelecionados(efeitosSelecionados.filter((e) => e !== efeito));
    } else {
      setEfeitosSelecionados([...efeitosSelecionados, efeito]);
    }
  }

  function adicionarInstrumento() {
    if (novoInstrumento.trim() !== "") {
      setInstrumentos([...instrumentos, novoInstrumento.trim()]);
      setNovoInstrumento("");
    }
  }

  function removerInstrumento(index) {
    setInstrumentos(instrumentos.filter((_, i) => i !== index));
  }

  function gerarPrompt() {
    if (
      genero === "" ||
      timeMusic === 0 ||
      efeitosSelecionados == [] ||
      instrumentos == []
    ) {
      setNotification("Verificar filtros antes de prosseguir.");
    } else {
      setNotification("Prompt gerado com sucesso!");
      const prompt = `
Crie uma música no gênero ${genero}, utilizando os instrumentos: ${instrumentos.join(
        ", "
      )},
- O clima utilizado deve ser do tipo: ${efeitosSelecionados.join(", ")}.
A música deve seguir as características tradicionais do gênero e manter coerência emocional. O tempo da musica deve ser de ${timeMusic} segundos.
`.trim();

      setPromptGerado(prompt);
    }
  }

  function copy() {
    navigator.clipboard.writeText(promptGerado);
    if (promptGerado === "") {
      setNotification("Não há nada para colar.");
    }
  }

  return (
    <div className={styles.painelContainer}>
      <title>PromptTune</title>

      <h1 className={styles.tituloPainel}>PromptTune</h1>

      {/* CARD FILTROS */}
      <section className={styles.cardFiltros}>
        <h3 className={styles.tituloSessao}>Filtros</h3>

        {/* GÊNERO */}
        <div className={styles.filtroItem}>
          <label>Gênero Musical</label>
          <select
            className={styles.inputSelect}
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          >
            <option value="">Selecione</option>
            {generos.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* EFEITOS */}
        <div className={styles.filtroItem}>
          <label>Efeitos</label>
          <div className={styles.checkboxGroup}>
            {efeitos.map((ef) => (
              <p key={ef} className={styles.checkboxItem}>
                <input
                  type="checkbox"
                  checked={efeitosSelecionados.includes(ef)}
                  onChange={() => toggleEfeito(ef)}
                />
                {ef}
              </p>
            ))}
          </div>
        </div>

        {/* INSTRUMENTOS */}
        <div className={styles.filtroItem}>
          <label>Instrumentos</label>

          <div className={styles.instrumentosLista}>
            {instrumentos.map((inst, index) => (
              <div className={styles.instrumentoItem} key={index}>
                <span>{inst}</span>
                <button
                  className={styles.btnRemover}
                  onClick={() => removerInstrumento(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className={styles.addInstrumento}>
            <input
              type="text"
              placeholder="Novo instrumento"
              className={styles.inputText}
              value={novoInstrumento}
              onChange={(e) => setNovoInstrumento(e.target.value)}
            />
            <button
              className={styles.btnAdicionar}
              onClick={adicionarInstrumento}
            >
              Adicionar
            </button>
          </div>
        </div>

        {/* TEMPO MUSICA */}
        <div className={styles.timeMusic}>
          <label>Tempo da musica (segundos)</label>
          <input
            type="number"
            className={styles.inputText}
            onChange={(e) => setTimeMusic(e.target.value)}
          ></input>
        </div>

        <button className={styles.btnGerar} onClick={gerarPrompt}>
          Gerar Prompt
        </button>
      </section>

      {/* CARD PROMPT */}
      <section className={styles.cardPrompt}>
        <h4 className={styles.tituloSessao}>Prompt para IA</h4>
        <textarea
          readOnly
          value={promptGerado}
          className={styles.textareaPrompt}
          rows={8}
        ></textarea>
        <button onClick={copy} className={styles.btnAdicionar}>
          Copiar
        </button>
      </section>

      {notification === "Prompt gerado com sucesso!" ? (
        <NotificationSuccess message={notification} />
      ) : notification ? (
        <NotificationFailure message={notification} />
      ) : null}
    </div>
  );
}

export default Home;
