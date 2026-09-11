import { MARCA_LINHA, MARCA_METADE, MARCA_NUCLEO, MARCA_TRACOS } from "@/components/brand/marca-paths";
import { cn } from "@/lib/utils/cn";
import { site } from "@/config/site";

/**
 * O símbolo da DETERA: um coração de placas partido ao meio por uma linha de
 * energia — dentro dele vira núcleo, fora dele vira traço pontilhado, um
 * pulso que continua além da própria forma.
 *
 * A marca não fica parada: as duas metades respiram, o núcleo pulsa e os
 * traços piscam em sequência, como carga subindo e descendo pela linha. Tudo
 * em CSS, sem JavaScript — e o `prefers-reduced-motion` congela tudo.
 */
export function Simbolo({
  className,
  vivo = true,
}: {
  className?: string;
  /** Desliga o movimento onde a marca deve ficar quieta. */
  vivo?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 32 40"
      className={cn("shrink-0", vivo && "marca-viva", className)}
      aria-hidden="true"
    >
      {/* Placas: a esquerda desenhada, a direita espelhada no eixo central —
          refletir garante a simetria que a olho nu nunca sai exata. */}
      <g fill="currentColor">
        <path className="marca-placa marca-placa--esq" d={MARCA_METADE} />
        <g transform="translate(32 0) scale(-1 1)">
          <path className="marca-placa marca-placa--dir" d={MARCA_METADE} />
        </g>
      </g>

      {/* A linha e os traços que continuam fora do coração. */}
      <g className="marca-energia fill-determinacao">
        {MARCA_TRACOS.map((traco) => (
          <rect
            key={traco.y}
            className="marca-traco"
            x={MARCA_LINHA.x}
            y={traco.y}
            width={MARCA_LINHA.largura}
            height={traco.altura}
          />
        ))}
        <rect
          className="marca-linha"
          x={MARCA_LINHA.x}
          y="6.6"
          width={MARCA_LINHA.largura}
          height="26.6"
        />
        <path className="marca-nucleo" d={MARCA_NUCLEO} />
      </g>
    </svg>
  );
}

/** Proporção real do recorte em `public/brand/detera-wordmark.png` — usada
 *  para reservar a altura certa antes da imagem carregar, sem pulo de
 *  layout (a largura vem de `className`, a altura sai daqui). */
const PROPORCAO_MARCA_IMAGEM = 1600 / 169;

/**
 * O nome "DETERA", recortado direto do render que o Samuel mandou — não é
 * mais o desenho vetorial, é a arte final dele mesmo, com fundo removido.
 *
 * Com `animado`, a palavra inteira cai como um meteoro (uma imagem não dá
 * para animar letra a letra) e a luz vermelha atravessa depois, recortada
 * na própria transparência do PNG via `mask-image` — o mesmo recurso que a
 * versão em SVG usava com `clipPath`, só que a máscara aqui é a arte real.
 */
export function MarcaImagem({
  className,
  animado = false,
  atraso = 0,
}: {
  className?: string;
  /** Liga a queda em meteoro e a luz que atravessa depois. */
  animado?: boolean;
  /** Segundos antes de a imagem cair. */
  atraso?: number;
}) {
  const mascara = {
    maskImage: "url(/brand/detera-wordmark.png)",
    WebkitMaskImage: "url(/brand/detera-wordmark.png)",
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "left center",
    WebkitMaskPosition: "left center",
  } as const;

  return (
    <span className={cn("relative block", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- é um recorte
          fixo de 61KB, não uma foto de conteúdo: next/image existe para
          otimizar o que ainda não foi otimizado, e isso já foi. */}
      <img
        src="/brand/detera-wordmark.png"
        alt={site.name}
        width={1600}
        height={169}
        style={{
          aspectRatio: `${PROPORCAO_MARCA_IMAGEM}`,
          ...(animado ? { animationDelay: `${atraso}s` } : null),
        }}
        className={cn("block h-full w-auto", animado && "wordmark-meteoro")}
      />

      {animado ? (
        <span
          aria-hidden="true"
          className="wordmark-varredura pointer-events-none absolute inset-0"
          style={mascara}
        />
      ) : null}
    </span>
  );
}

/**
 * Assinatura completa: símbolo mais o nome. Usada onde a marca precisa se
 * apresentar por extenso — o cabeçalho carrega só o símbolo.
 */
export function Wordmark({
  className,
  tamanho = "md",
}: {
  className?: string;
  tamanho?: "sm" | "md";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Simbolo
        className={cn("text-texto", tamanho === "sm" ? "h-6 w-[1.2rem]" : "h-7 w-[1.4rem]")}
      />
      <MarcaImagem className={tamanho === "sm" ? "h-[0.72rem]" : "h-[0.82rem]"} />
    </span>
  );
}
