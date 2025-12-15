import React, { useState, useEffect } from "react";
import styles from "./home.module.css";

import {
  NotificationFailure,
  NotificationSuccess,
  NotificationWarning,
} from "../components/notification";

const generos = [
  "Afrobeats",
  "Ambient",
  "Arrocha",
  "Axé",
  "Bachata",
  "Baião",
  "Bebop",
  "Blues",
  "Bossa_Nova",
  "BragFunk",
  "Brega",
  "Bregadeira",
  "Calypso",
  "Carimbó",
  "Choro",
  "Country",
  "Cumbia",
  "Disco",
  "Downtempo",
  "Drill",
  "Dub",
  "EDM_Dubstep",
  "EDM_House",
  "EDM_Techno",
  "EDM_Trance",
  "Eletro_Funk",
  "Folk",
  "Forró",
  "Frevo",
  "Funk_Carioca",
  "Funk_Melody",
  "Funk_Brasileiro",
  "Funk_Pop",
  "Garage_Rock",
  "Gospel_Worship",
  "Gothic_Rock",
  "Grindcore",
  "Groove_Soul",
  "Hip_Hop",
  "Indie_Rock",
  "Industrial",
  "Jazz_Cool",
  "Jazz_Fusion",
  "Jazz_Hard_Bop",
  "Jazz_Smooth",
  "K_Pop",
  "Lambadinha_Cuiabana",
  "Lo_fi",
  "MPB",
  "Maracatu",
  "Merengue",
  "Metal_Black",
  "Metal_Death",
  "Metal_Heavy_Power",
  "Metal_Thrash",
  "Musica_Classica_Barroco",
  "Musica_Classica_Romantico",
  "New_Wave",
  "Oracao",
  "Orquestral_Trailer",
  "Pagode",
  "Pagode_Baiano",
  "Pentecostal",
  "Phonk",
  "Piseiro",
  "Pop",
  "Pop_Sinfonico_Funk_Jazz_Fusion",
  "Punk_Rock",
  "ReB",
  "Rasqueado_Cuiabano",
  "Reggae",
  "Reggaeton",
  "Rock_Alternativo",
  "Rock_Classico",
  "Rock_Hard",
  "Samba",
  "Samba_de_Raiz",
  "Samba_Enredo",
  "Seresta",
  "Sertanejo",
  "Sertanejo_Universitario",
  "Ska",
  "Soul",
  "Swingueira",
  "Synthwave",
  "Tango",
  "Tecnomelody",
  "Trap",
  "Vaneira_Xote_Gaucho",
  "Xote",
];

const efeitos = [
  "Romântico",
  "Animado",
  "Melancólico",
  "Nostálgico",
  "Festivo",
  "Reflexivo",
  "Energético",
  "Intimista",
  "Esperançoso",
  "Dramático",
];

const instrumentosPorGenero = {
  Afrobeats: ["Drum Kit", "Percussion", "Synth Lead", "Bass Groove"],
  Ambient: [
    "Ambient Pads",
    "Drones",
    "Soft Synth Textures",
    "Field Recordings",
  ],
  Arrocha: ["Keyboard", "Bass", "Percussion", "Acoustic Guitar"],
  Axé: ["Percussion", "Bass", "Electric Guitar", "Brass Section"],
  Bachata: ["Requinto Guitar", "Rhythm Guitar", "Bass", "Bongos"],
  Baião: ["Accordion", "Triangle", "Zabumba", "Acoustic Guitar"],
  Bebop: ["Saxophone", "Double Bass", "Piano", "Jazz Drums"],
  Blues: ["Blues Guitar", "Harmonica", "Bass", "Light Drums"],
  Bossa_Nova: ["Nylon Guitar", "Soft Drums", "Bass", "Piano"],
  BragFunk: ["808 Bass", "Funk Drums", "Synth Lead", "Percussion"],
  Brega: ["Keyboard", "Electric Guitar", "Bass", "Electronic Drums"],
  Bregadeira: ["Percussion", "Bass", "Synth Melody", "Drum Machine"],
  Calypso: ["Electric Guitar", "Bass", "Percussion", "Drum Set"],
  Carimbó: ["Percussion", "Maracas", "Flute", "Bass Drum"],
  Choro: ["Cavaquinho", "Mandolin", "Flute", "Acoustic Guitar"],
  Country: ["Acoustic Guitar", "Banjo", "Pedal Steel", "Fiddle"],
  Cumbia: ["Accordion", "Bass", "Percussion", "Guacharaca"],
  Disco: [
    "Bass Groove",
    "Rhythm Guitar",
    "Synth Pads",
    "Four-on-the-Floor Drums",
  ],
  Downtempo: ["Soft Pads", "Chill Beats", "Ambient Synths", "Deep Bass"],
  Drill: ["808 Glide Bass", "Slide Hi-Hats", "Snappy Snare", "Dark Pads"],
  Dub: ["Bassline", "Delay Guitar", "Synth FX", "Reggae Drums"],
  EDM_Dubstep: ["Heavy Bass", "Growl Synths", "Kick", "Snare"],
  EDM_House: ["4x4 Kick", "Open Hi-Hats", "Bass House", "Synth Lead"],
  EDM_Techno: ["Synth Arps", "Kick 4x4", "Percussive Loops", "Bass Drone"],
  EDM_Trance: ["Arpeggiated Synths", "Pads", "Sidechain Bass", "Kick"],
  Eletro_Funk: ["Synth Bass", "Drum Machine", "Talkbox Lead", "Funk Guitar"],
  Folk: ["Acoustic Guitar", "Banjo", "Mandolin", "Harmonica"],
  Forró: ["Accordion", "Triangle", "Zabumba"],
  Frevo: ["Trumpet", "Trombone", "Saxophone", "Snare Drums"],
  Funk_Carioca: ["808 Bass", "Tamborzão Drums", "Clap", "Synth Lead"],
  Funk_Melody: ["Melodic Synth", "808 Bass", "Electronic Drums", "Pads"],
  Funk_Brasileir: ["808 Bass", "Drum Machine", "Percussion", "Synth Melody"],
  Funk_Pop: ["Synth Lead", "Pop Bass", "Electronic Drums", "Pads"],
  Garage_Rock: ["Electric Guitar", "Bass", "Drums", "Distorted Vocals"],
  Gospel_Worship: ["Piano", "Organ", "Electric Guitar", "Drums"],
  Gothic_Rock: ["Distorted Guitar", "Bass", "Dark Synth Pads", "Drums"],
  Grindcore: [
    "Blast Beat Drums",
    "Distorted Guitar",
    "Heavy Bass",
    "Screamed Vocals",
  ],
  Groove_Soul: ["Electric Bass", "Rhodes Piano", "Clean Guitar", "Soft Drums"],
  Hip_Hop: ["Kick", "Snare", "Hi-Hats", "Sampled Melodies"],
  Indie_Rock: ["Electric Guitar", "Bass", "Indie Drums", "Synth Textures"],
  Industrial: ["Distorted Synths", "Heavy Drums", "Metallic FX", "Bass Synth"],
  Jazz_Cool: ["Saxophone", "Double Bass", "Piano", "Brush Drums"],
  Jazz_Fusion: ["Electric Bass", "Synth Lead", "Electric Piano", "Drums"],
  Jazz_Hard_Bop: ["Saxophone", "Piano", "Double Bass", "Acoustic Drums"],
  Jazz_Smooth: ["Saxophone", "Electric Piano", "Soft Bass", "Smooth Drums"],
  K_Pop: ["Synth Lead", "Electronic Drums", "Pop Bass", "Pads"],
  Lambadinha_Cuiabana: ["Guitar", "Bass", "Keyboards", "Percussion"],
  Lo_fi: ["Lo-fi Samples", "Soft Drums", "Warm Piano", "Vinyl Noise"],
  MPB: ["Acoustic Guitar", "Piano", "Soft Percussion", "Bass"],
  Maracatu: ["Alfaia Drums", "Gonguê", "Percussion", "Snare Drum"],
  Merengue: ["Accordion", "Tambora", "Guira", "Bass"],
  Metal_Black: ["Distorted Guitar", "Fast Drums", "Bass", "Harsh Vocals"],
  Metal_Death: ["Heavy Guitar", "Double Kick Drums", "Bass", "Growl Vocals"],
  Metal_Heavy_Power_: ["Power Guitar", "Double Pedal", "Bass", "Lead Guitar"],
  Metal_Thrash: ["Thrash Guitar", "Fast Drums", "Bass", "Lead Guitar"],
  Música_Clássica_Barroco: ["Harpsichord", "Violin", "Cello", "Viola"],
  Música_Clássica_Romântico: ["Violin", "Piano", "Cello", "Orchestral Brass"],
  New_Wave: ["Synth Bass", "Electric Guitar", "Electronic Drums", "Pads"],
  Oração: ["Pad Textures", "Soft Piano", "Choir", "Atmospheric Strings"],
  Orquestral_Trailer: ["Brass", "Strings", "Percussion", "Choir"],
  Pagode: ["Cavaquinho", "Pandeiro", "Banjo", "Percussion"],
  Pagode_Baiano: ["Percussion", "Bass", "Cavaquinho", "Drum Kit"],
  Pentecostal: ["Organ", "Piano", "Choir", "Drums"],
  Phonk: ["Cowbell", "Distorted 808", "Memphis Samples", "Snare"],
  Piseiro: ["Accordion", "Kick", "Percussion", "Bass"],
  Pop: ["Synth", "Electronic Drums", "Pads", "Bass Synth"],
  Pop_Sinfônico_Funk_Jazz_Fusion: [
    "Orchestra Strings",
    "Brass",
    "Synth Lead",
    "Fusion Drums",
  ],
  Punk_Rock: ["Distorted Guitar", "Fast Drums", "Bass", "Raw Vocals"],
  ReB: ["Rhodes", "Soft Bass", "Drum Machine", "Synth Pads"],
  Rasqueado_Cuiabano: ["Guitar", "Bass", "Percussion", "Accordion"],
  Reggae: ["Delay Guitar", "Deep Bass", "One Drop Drums", "Hammond Organ"],
  Reggaeton: ["DemBow Drums", "808 Bass", "Synth Lead", "Claps"],
  Rock_Alternativo: ["Electric Guitar", "Bass", "Drums", "Ambient Synths"],
  Rock_Classico: ["Electric Guitar", "Bass", "Drums", "Lead Guitar"],
  Rock_Hard: ["Distortion Guitar", "Heavy Drums", "Bass", "Lead Guitar"],
  Samba: ["Pandeiro", "Surdo", "Cavaquinho", "Reco-reco"],
  Samba_de_Raiz: ["Cavaquinho", "Tamborim", "Surdo", "Pandeiro"],
  Samba_Enredo: ["Surdo", "Tamborim", "Caixa", "Repinique"],
  Seresta: ["Acoustic Guitar", "Keyboard", "Light Drums", "Bass"],
  Sertanejo: ["Acoustic Guitar", "Accordion", "Bass", "Drums"],
  Sertanejo_Universitário: ["Acoustic Guitar", "Bass", "Drums", "Keyboard"],
  Ska: ["Electric Guitar", "Bass", "Brass Section", "Upbeat Drums"],
  Soul: ["Bass", "Organ", "Electric Guitar", "Soft Drums"],
  Swingueira: ["Percussion", "Bass", "Drums", "Synth"],
  Synthwave: ["Analog Synths", "Retro Drums", "Bass Synth", "Pads"],
  Tango: ["Bandoneon", "Violin", "Piano", "Double Bass"],
  Tecnomelody: ["Synth Lead", "Electronic Drums", "Bass", "Pads"],
  Trap: ["808 Bass", "Triplet Hi-Hats", "Dry Snare", "Clap"],
  Vaneira_Xote_Gaúcho: ["Accordion", "Guitar", "Bass", "Percussion"],
  Xote: ["Accordion", "Triangle", "Zabumba", "Acoustic Guitar"],
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

  // CSS - Campos de inputs
  const [notNullInstument, setNotNullInstrument] = useState("");

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
      setNotification("Instrumento adicionado!");
      setNotNullInstrument("");
    } else {
      setNotification("Nada para adicionar");
      setNotNullInstrument("erro");
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
      setNotification("Requisição efetuada com sucesso!");
      const prompt = `
  Create a song in the ${genero}, genre, using the following instruments: ${instrumentos.join(
        ", "
      )},
- The song should have a more: ${efeitosSelecionados.join(", ")}.
The song should follow the traditional characteristics of the genre and maintain emotional coherence. The song should be ${timeMusic} seconds long.
`.trim();

      setPromptGerado(prompt);
    }
  }

  function copy() {
    if (promptGerado === "") {
      setNotification("Não há nada para colar.");
    } else {
      navigator.clipboard.writeText(promptGerado);
      setNotification("Copiado para área de transferência");
    }
  }

  function fantasma(){
    window.alert("Fantasma")
  }

  function clear() {
    setNotification("Resetado");
    setGenero([]);
    setEfeitosSelecionados([]);
    setInstrumentos([]);
    setPromptGerado("");
    setTimeMusic(0);
    setNotNullInstrument("");
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
              className={notNullInstument ? styles.failure : styles.inputText}
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
            value={timeMusic}
            type="number"
            className={styles.inputText}
            onChange={(e) => setTimeMusic(e.target.value)}
          ></input>
        </div>

        <div className={styles.d_buttons}>
          <button className={styles.btnGerar} onClick={gerarPrompt}>
            Gerar Prompt
          </button>

          <button className={styles.btnClear} onClick={clear}>
            Limpar
          </button>
        </div>
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

      {notification === "Requisição efetuada com sucesso!" ? (
        <NotificationSuccess message={notification} />
      ) : notification ? (
        <NotificationFailure message={notification} />
      ) : null}
    </div>
  );
}

export default Home;
