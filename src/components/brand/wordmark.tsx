import { cn } from "@/lib/utils/cn";
import { site } from "@/config/site";

/**
 * O símbolo da DETERA: um coração construído em blocos, partido ao meio por
 * uma linha de energia que atravessa a marca inteira — dentro dele vira
 * núcleo, fora dele vira traço pontilhado, como um pulso que continua além
 * da própria forma.
 *
 * O coração é montado em grade (7 colunas × 6 linhas), não em curva —
 * mantém a linguagem de pixel art do resto da marca e evita qualquer
 * semelhança com o coração liso e simétrico de referências externas. As
 * duas metades só se tocam na ponta inferior; no resto da forma, a fresta
 * central deixa a linha aparecer.
 */
export function Simbolo({
  className,
  vivo = false,
}: {
  className?: string;
  /** Liga a respiração do núcleo. Só na marca do hero. */
  vivo?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 16 20"
      className={cn("shrink-0", className)}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {/* A linha: pontilhada fora do coração, sólida por dentro — passa por
          trás dos blocos brancos, então só aparece onde a forma abre. */}
      <rect x="7" y="0" width="2" height="1" fill="currentColor" className="text-determinacao" />
      <rect x="7" y="2" width="2" height="1" fill="currentColor" className="text-determinacao" />
      <rect x="7" y="4" width="2" height="12" fill="currentColor" className="text-determinacao" />
      <rect x="7" y="17" width="2" height="1" fill="currentColor" className="text-determinacao" />
      <rect x="7" y="19" width="2" height="1" fill="currentColor" className="text-determinacao" />

      {/* O núcleo: onde a linha se alarga, no meio da fresta. */}
      <path
        d="M8 7l2 2-2 2-2-2z"
        className={cn("fill-determinacao", vivo && "nucleo-vivo")}
      />

      {/* As duas metades do coração, em blocos — desenhadas por cima da
          linha, por isso ela só sobra na fresta central. */}
      <g fill="currentColor">
        <rect x="3" y="4" width="2" height="2" />
        <rect x="5" y="4" width="2" height="2" />
        <rect x="9" y="4" width="2" height="2" />
        <rect x="11" y="4" width="2" height="2" />

        <rect x="1" y="6" width="2" height="2" />
        <rect x="3" y="6" width="2" height="2" />
        <rect x="5" y="6" width="2" height="2" />
        <rect x="9" y="6" width="2" height="2" />
        <rect x="11" y="6" width="2" height="2" />
        <rect x="13" y="6" width="2" height="2" />

        <rect x="1" y="8" width="2" height="2" />
        <rect x="3" y="8" width="2" height="2" />
        <rect x="5" y="8" width="2" height="2" />
        <rect x="9" y="8" width="2" height="2" />
        <rect x="11" y="8" width="2" height="2" />
        <rect x="13" y="8" width="2" height="2" />

        <rect x="3" y="10" width="2" height="2" />
        <rect x="5" y="10" width="2" height="2" />
        <rect x="9" y="10" width="2" height="2" />
        <rect x="11" y="10" width="2" height="2" />

        <rect x="5" y="12" width="2" height="2" />
        <rect x="9" y="12" width="2" height="2" />

        {/* A ponta: onde as duas metades finalmente se encontram. */}
        <rect x="7" y="14" width="2" height="2" />
      </g>
    </svg>
  );
}

/**
 * Assinatura da marca. O nome vai em caixa alta com tracking aberto, fechado
 * por um ponto quadrado em determinação — o "fim de frase" que a marca
 * existe para contradizer: a frase acaba, a empresa não.
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
        className={cn("text-texto", tamanho === "sm" ? "h-5 w-6" : "h-6 w-7")}
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
