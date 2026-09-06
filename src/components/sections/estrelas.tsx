import { cn } from "@/lib/utils/cn";

type Estrela = { x: number; y: number; tamanho: number; atraso: number; duracao: number };

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

function gerarEstrelas(quantidade: number, semente: number): Estrela[] {
  const aleatorio = criarGerador(semente);
  return Array.from({ length: quantidade }, () => ({
    x: aleatorio() * 100,
    y: aleatorio() * 100,
    tamanho: aleatorio() < 0.15 ? 2 : 1,
    atraso: aleatorio() * 6,
    duracao: 3 + aleatorio() * 4,
  }));
}

const estrelas = gerarEstrelas(70, 20260906);

/**
 * O céu por trás da marca: pontos que piscam em ritmos levemente diferentes
 * entre si, para o conjunto nunca parecer sincronizado — e portanto nunca
 * parecer programado.
 *
 * Puro CSS: sem canvas, sem observer, sem uma linha de JavaScript no
 * cliente. Funciona exatamente igual no celular e no desktop, que é
 * justamente o que a luz que só respondia ao mouse não fazia.
 */
export function Estrelas({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
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
  );
}
