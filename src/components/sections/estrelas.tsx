import { cn } from "@/lib/utils/cn";

type Estrela = {
  x: number;
  y: number;
  tamanho: number;
  atraso: number;
  duracao: number;
  quente: boolean;
};

type Risco = {
  x: number;
  y: number;
  atraso: number;
  duracao: number;
  comprimento: number;
  dx: number;
  dy: number;
  angulo: number;
};

type Cometa = Risco & { escala: number; quente: boolean };

/** Nebulosa: o borrão de cor que dá profundidade ao fundo da seção. */
type Nebulosa = { x: number; y: number; tamanho: number; cor: string; opacidade: number };

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

/**
 * Rabisco que atravessa o céu — cadente e cometa saem daqui.
 *
 * O ângulo não é escolhido: ele é derivado do deslocamento, com `atan2`. Se
 * fosse um número solto, o risco apontaria para um lado e andaria para outro,
 * que é exatamente o defeito que denuncia efeito improvisado.
 */
function criarRisco(
  aleatorio: () => number,
  { comprimento, distancia }: { comprimento: [number, number]; distancia: number },
): Omit<Risco, "atraso" | "duracao"> {
  // Sempre descendo para a direita, com inclinação entre ~14° e ~38°: é o
  // ângulo em que a queda parece queda, e não diagonal de protetor de tela.
  const dx = distancia * (0.7 + aleatorio() * 0.6);
  const dy = dx * (0.25 + aleatorio() * 0.53);

  return {
    x: -6 + aleatorio() * 74,
    y: aleatorio() * 62,
    comprimento: comprimento[0] + aleatorio() * (comprimento[1] - comprimento[0]),
    dx,
    dy,
    angulo: (Math.atan2(dy, dx) * 180) / Math.PI,
  };
}

function gerarCeu(
  quantidade: number,
  semente: number,
  quantosCadentes: number,
  quantosCometas: number,
) {
  const aleatorio = criarGerador(semente);

  const estrelas: Estrela[] = Array.from({ length: quantidade }, () => ({
    x: aleatorio() * 100,
    y: aleatorio() * 100,
    tamanho: aleatorio() < 0.14 ? 2 : 1,
    atraso: aleatorio() * 7,
    duracao: 3 + aleatorio() * 5,
    // Uma em cada oito puxa para o vermelho da marca. Não é enfeite: é o que
    // impede o céu de ser um céu genérico de template.
    quente: aleatorio() < 0.13,
  }));

  /**
   * Cadentes: riscos curtos e rápidos. Cada uma tem ciclo próprio, sem
   * divisor comum óbvio com as vizinhas, então elas quase nunca cruzam a tela
   * juntas — o céu fica movimentado sem virar chuva de meteoros.
   */
  const ciclos = [17, 23, 29, 37, 43, 53];
  const cadentes: Risco[] = Array.from({ length: quantosCadentes }, (_, indice) => ({
    ...criarRisco(aleatorio, { comprimento: [64, 132], distancia: 150 }),
    atraso: 2 + indice * 5 + aleatorio() * 7,
    duracao: ciclos[indice % ciclos.length],
  }));

  /**
   * Cometas: maiores, mais lentos e com cabeça acesa. Passam de longe em
   * longe — é o evento raro que faz valer a pena continuar olhando o fundo.
   */
  const cometas: Cometa[] = Array.from({ length: quantosCometas }, (_, indice) => ({
    ...criarRisco(aleatorio, { comprimento: [180, 300], distancia: 520 }),
    atraso: 6 + indice * 19 + aleatorio() * 14,
    duracao: 61 + indice * 24,
    escala: 0.85 + aleatorio() * 0.7,
    quente: aleatorio() < 0.5,
  }));

  return { estrelas, cadentes, cometas, aleatorio };
}

/**
 * O céu por trás do conteúdo: pontos que piscam em ritmos levemente
 * diferentes entre si, a camada inteira derivando devagar, riscos de cadente
 * cruzando e, de tempos em tempos, um cometa inteiro com cauda.
 *
 * Puro CSS: sem canvas, sem observer, sem uma linha de JavaScript no cliente.
 * Funciona exatamente igual no celular e no desktop — que é justamente o que
 * a luz presa ao cursor não fazia.
 */
export function Estrelas({
  className,
  quantidade = 70,
  semente = 20260906,
  cadentes: quantosCadentes = 3,
  cometas: quantosCometas = 1,
  nebulosa,
}: {
  className?: string;
  quantidade?: number;
  /** Muda o desenho do céu entre seções, para não repetir o mesmo padrão. */
  semente?: number;
  cadentes?: number;
  cometas?: number;
  /**
   * Dois borrões de cor ao fundo. Sem eles a seção fica preta e chapada; com
   * eles ganha a profundidade que faz o céu parecer um lugar, e não um papel
   * de parede.
   */
  nebulosa?: "determinacao" | "sistema" | "mista";
}) {
  const { estrelas, cadentes, cometas, aleatorio } = gerarCeu(
    quantidade,
    semente,
    quantosCadentes,
    quantosCometas,
  );

  const nebulosas: Nebulosa[] = nebulosa
    ? Array.from({ length: 2 }, (_, indice) => ({
        x: 6 + aleatorio() * 74,
        y: 4 + aleatorio() * 62,
        tamanho: 22 + aleatorio() * 20,
        cor:
          nebulosa === "sistema" || (nebulosa === "mista" && indice === 1)
            ? "var(--color-sistema)"
            : "var(--color-determinacao)",
        opacidade: 0.06 + aleatorio() * 0.05,
      }))
    : [];

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {nebulosas.map((nuvem, indice) => (
        <span
          key={`nebulosa-${indice}`}
          className="aura"
          style={
            {
              left: `${nuvem.x}%`,
              top: `${nuvem.y}%`,
              width: `${nuvem.tamanho}rem`,
              height: `${nuvem.tamanho}rem`,
              "--aura-cor": nuvem.cor,
              "--aura-opacidade": nuvem.opacidade,
              "--aura-duracao": `${24 + indice * 9}s`,
            } as React.CSSProperties
          }
        />
      ))}

      <div className="ceu-deriva absolute inset-0">
        {estrelas.map((estrela, indice) => (
          <span
            key={indice}
            className={cn(
              "estrela absolute rounded-full",
              estrela.quente ? "bg-determinacao-viva" : "bg-texto",
            )}
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
              "--risco-atraso": `${cadente.atraso}s`,
              "--risco-duracao": `${cadente.duracao}s`,
              "--risco-dx": `${cadente.dx}px`,
              "--risco-dy": `${cadente.dy}px`,
              "--risco-angulo": `${cadente.angulo}deg`,
            } as React.CSSProperties
          }
        />
      ))}

      {cometas.map((cometa, indice) => (
        <span
          key={`cometa-${indice}`}
          className="cometa absolute"
          style={
            {
              left: `${cometa.x}%`,
              top: `${cometa.y}%`,
              "--risco-atraso": `${cometa.atraso}s`,
              "--risco-duracao": `${cometa.duracao}s`,
              "--risco-dx": `${cometa.dx}px`,
              "--risco-dy": `${cometa.dy}px`,
              "--risco-angulo": `${cometa.angulo}deg`,
              "--cometa-cauda": `${cometa.comprimento}px`,
              "--cometa-escala": cometa.escala,
              "--cometa-cor": cometa.quente
                ? "var(--color-determinacao-viva)"
                : "var(--color-texto)",
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
