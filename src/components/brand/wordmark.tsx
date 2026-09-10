import {
  MARCA_LINHA,
  MARCA_METADE,
  MARCA_NUCLEO,
  MARCA_TRACOS,
  NOME_DETERA,
  NOME_DETERA_BARRA,
  NOME_DETERA_VIEWBOX,
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
 * O nome "DETERA" desenhado — não é fonte, são os seis caminhos de
 * `NOME_DETERA`. É o que dá o chanfro exato dos terminais e o "A" de topo
 * reto com a tarja vermelha, coisa que fonte nenhuma entrega.
 *
 * Com `animado`, cada letra cai como um meteoro (a mesma coreografia do
 * `TextoMeteoro`, agora em `<path>`) e uma luz vermelha atravessa o nome
 * depois que ele pousa. Sem `animado`, é estático — o uso do rodapé.
 *
 * A palavra vai como `aria-label`: o leitor de tela diz "DETERA", não
 * soletra os caminhos.
 */
export function Letreiro({
  className,
  animado = false,
  atraso = 0,
  passo = 0.06,
}: {
  className?: string;
  /** Liga a queda em meteoro letra a letra e a luz que atravessa depois. */
  animado?: boolean;
  /** Segundos antes de a primeira letra cair. */
  atraso?: number;
  /** Intervalo entre uma letra e a seguinte. */
  passo?: number;
}) {
  return (
    <svg
      viewBox={NOME_DETERA_VIEWBOX}
      className={cn("block h-auto", className)}
      role="img"
      aria-label={site.name}
    >
      <g fill="currentColor" fillRule="evenodd">
        {NOME_DETERA.map((letra, indice) => {
          const ultima = indice === NOME_DETERA.length - 1;
          return (
            <g
              key={indice}
              className={animado ? "letra-meteoro" : undefined}
              style={
                animado
                  ? { animationDelay: `${(atraso + indice * passo).toFixed(3)}s` }
                  : undefined
              }
            >
              <path d={letra.d} />
              {/* A tarja vermelha do "A" cai junto com a letra que a carrega. */}
              {ultima ? (
                <rect
                  className="fill-determinacao"
                  x={NOME_DETERA_BARRA.x}
                  y={NOME_DETERA_BARRA.y}
                  width={NOME_DETERA_BARRA.largura}
                  height={NOME_DETERA_BARRA.altura}
                />
              ) : null}
            </g>
          );
        })}
      </g>

      {/* A luz que atravessa o nome depois que ele pousa: uma faixa vermelha
          recortada nas próprias letras, deslizando da esquerda para a
          direita. Só existe quando `animado`. */}
      {animado ? (
        <>
          <defs>
            <clipPath id="letreiro-detera">
              {NOME_DETERA.map((letra, indice) => (
                <path key={indice} d={letra.d} />
              ))}
            </clipPath>
            <linearGradient id="letreiro-varredura" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="var(--color-determinacao-viva)" stopOpacity="0" />
              <stop offset="0.5" stopColor="var(--color-determinacao-viva)" stopOpacity="0.85" />
              <stop offset="1" stopColor="var(--color-determinacao-viva)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g className="marca-varredura" clipPath="url(#letreiro-detera)" aria-hidden="true">
            <rect x="-280" y="0" width="280" height="128" fill="url(#letreiro-varredura)" />
          </g>
        </>
      ) : null}
    </svg>
  );
}

/**
 * Assinatura completa: símbolo mais o nome desenhado. Usada onde a marca
 * precisa se apresentar por extenso — o cabeçalho carrega só o símbolo.
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
      <Letreiro
        className={cn("text-texto", tamanho === "sm" ? "h-[0.72rem]" : "h-[0.82rem]")}
      />
    </span>
  );
}
