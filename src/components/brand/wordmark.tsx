import {
  MARCA_LINHA,
  MARCA_METADE,
  MARCA_NUCLEO,
  MARCA_TRACOS,
} from "@/components/brand/marca-paths";
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

/**
 * Assinatura completa: símbolo mais o nome, fechado por um ponto quadrado em
 * determinação. Usada onde a marca precisa se apresentar por extenso — o
 * cabeçalho carrega só o símbolo.
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
      <span
        className={cn(
          "font-display inline-flex items-baseline leading-none font-black",
          tamanho === "sm"
            ? "text-[1.02rem] tracking-[0.16em]"
            : "text-[1.15rem] tracking-[0.17em]",
        )}
      >
        {site.name}
        <span
          aria-hidden="true"
          className="bg-determinacao ml-[0.14em] inline-block h-[0.16em] w-[0.16em] translate-y-[-0.02em]"
        />
      </span>
    </span>
  );
}
