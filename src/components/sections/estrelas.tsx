import { cn } from "@/lib/utils/cn";

type Estrela = { x: number; y: number; tamanho: number; atraso: number; duracao: number };
type Cadente = { x: number; y: number; atraso: number; duracao: number; comprimento: number };

/**
 * Gerador determinístico (xorshift). Nunca `Math.random()`: isto roda no
 * servidor a cada requisição, e uma sequência diferente a cada carregamento
 * faria o céu "pular" de posição sem motivo nenhum para quem está vendo —
 * pior ainda, divergiria entre o HTML do servidor e a re-execução no
 * cliente. Com semente fixa, o resultado é sempre o mesmo em qualquer
 * ambiente.
 */
function criarGerador(semente: number) {
  let estado = semente || 1;
  return () => {
    estado ^= estado << 13;
    estado ^= estado >>> 17;
    estado ^= estado << 5;
    estado |= 0;
    return (estado >>> 0) / 4294967295;
  };
}

function gerarCeu(quantidade: number, semente: number) {
  const aleatorio = criarGerador(semente);

  const estrelas: Estrela[] = Array.from({ length: quantidade }, () => ({
    x: aleatorio() * 100,
    y: aleatorio() * 100,
    tamanho: aleatorio() < 0.14 ? 2 : 1,
    atraso: aleatorio() * 7,
    duracao: 3 + aleatorio() * 5,
  }));

  // Duas cadentes por céu, com ciclos longos e primos entre si: quase nunca
  // cruzam a tela juntas, então a página nunca parece um protetor de tela.
  const cadentes: Cadente[] = Array.from({ length: 2 }, (_, indice) => ({
    x: 8 + aleatorio() * 70,
    y: aleatorio() * 55,
    atraso: 3 + indice * 11 + aleatorio() * 6,
    duracao: indice === 0 ? 19 : 27,
    comprimento: 70 + aleatorio() * 60,
  }));

  return { estrelas, cadentes };
}

/**
 * O céu por trás do conteúdo: pontos que piscam em ritmos levemente
 * diferentes entre si, a camada inteira derivando devagar para cima, e uma
 * cadente de vez em quando.
 *
 * Puro CSS: sem canvas, sem observer, sem uma linha de JavaScript no cliente.
 * Funciona exatamente igual no celular e no desktop — que é justamente o que
 * a luz presa ao cursor não fazia.
 */
export function Estrelas({
  className,
  quantidade = 70,
  semente = 20260906,
}: {
  className?: string;
  quantidade?: number;
  /** Muda o desenho do céu entre seções, para não repetir o mesmo padrão. */
  semente?: number;
}) {
  const { estrelas, cadentes } = gerarCeu(quantidade, semente);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="ceu-deriva absolute inset-0">
        {estrelas.map((estrela, indice) => (
          <span
            key={indice}
            className="estrela bg-texto absolute rounded-full"
            style={
              {
                left: `${estrela.x}%`,
                top: `${estrela.y}%`,
                width: `${estrela.tamanho}px`,
                height: `${estrela.tamanho}px`,
                "--estrela-atraso": `${estrela.atraso}s`,
                "--estrela-duracao": `${estrela.duracao}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {cadentes.map((cadente, indice) => (
        <span
          key={`cadente-${indice}`}
          className="cadente absolute"
          style={
            {
              left: `${cadente.x}%`,
              top: `${cadente.y}%`,
              width: `${cadente.comprimento}px`,
              "--cadente-atraso": `${cadente.atraso}s`,
              "--cadente-duracao": `${cadente.duracao}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
