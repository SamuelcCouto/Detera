"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const LARGURA = 200;
const ALTURA = 280;

/** Cores lidas da marca, não inventadas aqui. */
const COR = {
  fundo: "#07080b",
  nave: "#f2f3f5",
  nucleo: "#ff3b3b",
  tiro: "#ff6b6b",
  rocha: "#5c626d",
  estrela: "#363b45",
} as const;

type Corpo = { x: number; y: number; vel: number; tamanho: number };

/**
 * Um joguinho de nave escondido atrás de um botão, na margem que sobra do
 * hero em telas largas.
 *
 * Existe por um motivo só: quem constrói site para viver deveria conseguir
 * mostrar isso em vez de escrever. Fica fora do caminho — não carrega nada
 * antes do clique, não aparece no mobile (onde não há margem sobrando nem
 * teclado) e não entra no fluxo de leitura de ninguém.
 */
export function Nave() {
  const [jogando, setJogando] = useState(false);
  const [pontos, setPontos] = useState(0);
  const [perdeu, setPerdeu] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const iniciar = useCallback(() => {
    setPontos(0);
    setPerdeu(false);
    setJogando(true);
  }, []);

  useEffect(() => {
    if (!jogando) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    canvas.focus();

    // Estado do jogo vive em refs locais do efeito: um `useState` por quadro
    // re-renderizaria o React 60 vezes por segundo à toa.
    let naveX = LARGURA / 2;
    let paraEsquerda = false;
    let paraDireita = false;
    let tiros: Corpo[] = [];
    let rochas: Corpo[] = [];
    let placar = 0;
    let quadro = 0;
    let vivo = true;
    let proximaRocha = 0;
    let animacao = 0;

    const estrelas = Array.from({ length: 26 }, (_, i) => ({
      x: ((i * 97) % LARGURA) + (i % 3),
      y: ((i * 53) % ALTURA) + (i % 5),
      v: 0.15 + (i % 4) * 0.08,
    }));

    function atirar() {
      if (tiros.length >= 4) return;
      tiros.push({ x: naveX, y: ALTURA - 34, vel: 5.2, tamanho: 2 });
    }

    function tecla(evento: KeyboardEvent) {
      const t = evento.key;
      if (t === "ArrowLeft" || t === "a" || t === "A") paraEsquerda = true;
      else if (t === "ArrowRight" || t === "d" || t === "D") paraDireita = true;
      else if (t === " " || t === "Spacebar") atirar();
      else return;
      // Só engole as teclas que o jogo usa, e só com o canvas em foco: fora
      // daqui, seta e espaço continuam rolando a página normalmente.
      evento.preventDefault();
    }

    function soltou(evento: KeyboardEvent) {
      const t = evento.key;
      if (t === "ArrowLeft" || t === "a" || t === "A") paraEsquerda = false;
      if (t === "ArrowRight" || t === "d" || t === "D") paraDireita = false;
    }

    canvas.addEventListener("keydown", tecla);
    canvas.addEventListener("keyup", soltou);

    function desenharNave() {
      ctx!.fillStyle = COR.nave;
      ctx!.beginPath();
      ctx!.moveTo(naveX, ALTURA - 34);
      ctx!.lineTo(naveX - 9, ALTURA - 18);
      ctx!.lineTo(naveX - 3, ALTURA - 21);
      ctx!.lineTo(naveX + 3, ALTURA - 21);
      ctx!.lineTo(naveX + 9, ALTURA - 18);
      ctx!.closePath();
      ctx!.fill();
      // O núcleo da marca, de novo: o ponto vermelho no meio da forma.
      ctx!.fillStyle = COR.nucleo;
      ctx!.fillRect(naveX - 1.5, ALTURA - 27, 3, 3);
    }

    function laco() {
      if (!vivo) return;
      quadro += 1;

      ctx!.fillStyle = COR.fundo;
      ctx!.fillRect(0, 0, LARGURA, ALTURA);

      ctx!.fillStyle = COR.estrela;
      for (const e of estrelas) {
        e.y += e.v;
        if (e.y > ALTURA) e.y = 0;
        ctx!.fillRect(e.x, e.y, 1, 1);
      }

      if (paraEsquerda) naveX -= 3.4;
      if (paraDireita) naveX += 3.4;
      naveX = Math.max(12, Math.min(LARGURA - 12, naveX));

      if (quadro > proximaRocha) {
        const tamanho = 8 + Math.random() * 12;
        rochas.push({
          x: tamanho + Math.random() * (LARGURA - tamanho * 2),
          y: -tamanho,
          vel: 0.9 + Math.random() * 1.1 + placar * 0.02,
          tamanho,
        });
        proximaRocha = quadro + Math.max(22, 60 - placar * 1.5);
      }

      tiros = tiros.filter((t) => {
        t.y -= t.vel;
        ctx!.fillStyle = COR.tiro;
        ctx!.fillRect(t.x - 1, t.y, 2, 7);
        return t.y > -8;
      });

      for (const r of rochas) {
        r.y += r.vel;
        ctx!.fillStyle = COR.rocha;
        ctx!.fillRect(r.x - r.tamanho / 2, r.y - r.tamanho / 2, r.tamanho, r.tamanho);
      }

      // Tiro acerta rocha.
      for (const r of [...rochas]) {
        for (const t of [...tiros]) {
          if (Math.abs(t.x - r.x) < r.tamanho / 2 && Math.abs(t.y - r.y) < r.tamanho / 2) {
            rochas = rochas.filter((o) => o !== r);
            tiros = tiros.filter((o) => o !== t);
            placar += 1;
            setPontos(placar);
            break;
          }
        }
      }

      // Rocha acerta a nave, ou escapa pelo rodapé.
      for (const r of rochas) {
        const perto =
          Math.abs(r.x - naveX) < r.tamanho / 2 + 8 &&
          Math.abs(r.y - (ALTURA - 24)) < r.tamanho / 2 + 8;
        if (perto) {
          vivo = false;
          setPerdeu(true);
          setJogando(false);
          return;
        }
      }
      rochas = rochas.filter((r) => r.y < ALTURA + r.tamanho);

      desenharNave();
      animacao = requestAnimationFrame(laco);
    }

    animacao = requestAnimationFrame(laco);

    return () => {
      vivo = false;
      cancelAnimationFrame(animacao);
      canvas.removeEventListener("keydown", tecla);
      canvas.removeEventListener("keyup", soltou);
    };
  }, [jogando]);

  return (
    <div className="bloco w-[200px] overflow-hidden">
      <div className="border-borda bg-camada-alta flex items-center justify-between border-b px-3 py-2">
        <span className="estado">Intervalo</span>
        {jogando || perdeu ? (
          <span className="estado text-determinacao-viva tabular">{pontos} pts</span>
        ) : null}
      </div>

      {jogando ? (
        <canvas
          ref={canvasRef}
          width={LARGURA}
          height={ALTURA}
          tabIndex={0}
          aria-label="Joguinho de nave. Setas para mover, espaço para atirar."
          className="focus-visible:outline-determinacao block focus-visible:outline-2 focus-visible:-outline-offset-2"
        />
      ) : (
        <div
          className="flex flex-col items-center justify-center gap-3 px-5 text-center"
          style={{ height: ALTURA }}
        >
          {perdeu ? (
            <>
              <p className="font-display text-texto text-[1.05rem] font-bold">
                Acabou em {pontos} {pontos === 1 ? "ponto" : "pontos"}
              </p>
              <p className="text-texto-fraco text-[0.82rem] leading-relaxed">
                Nada que uma próxima tentativa não resolva.
              </p>
            </>
          ) : (
            <p className="text-texto-fraco text-[0.82rem] leading-relaxed">
              Sobrou espaço nesta margem. Achamos melhor colocar algo aqui do que
              deixar vazio.
            </p>
          )}

          <button
            type="button"
            onClick={iniciar}
            className="btn btn--contorno mt-1 h-9 px-4 text-[0.82rem]"
          >
            {perdeu ? "Jogar de novo" : "Clique para jogar"}
          </button>

          {!perdeu ? (
            <p className="estado text-texto-fraco/70">setas · espaço</p>
          ) : null}
        </div>
      )}
    </div>
  );
}
