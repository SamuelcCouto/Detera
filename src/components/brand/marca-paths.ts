/**
 * A geometria da marca, em um lugar só.
 *
 * O símbolo aparece em três lugares que não compartilham runtime — o site
 * (SVG no DOM), o favicon e a imagem de compartilhamento (ambos desenhados
 * pelo `next/og`). Com os caminhos duplicados em cada arquivo, bastava
 * ajustar um deles para a marca ficar diferente de si mesma sem ninguém
 * notar. Todos leem daqui.
 *
 * Sistema de coordenadas do símbolo: `viewBox="0 0 32 40"`, centro em x = 16.
 */

/**
 * O nome "DETERA" desenhado — não é fonte, são seis letras vetorizadas,
 * do jeito que wordmark de verdade se constrói. O que uma fonte não dá:
 * o chanfro a 45° em cada terminal, a proporção larga, o "A" de topo
 * reto com a tarja vermelha da marca no lugar da barra.
 *
 * Sistema de coordenadas: `viewBox="0 0 676 128"`, altura de caixa = 128.
 * Cada letra é um caminho fechado; D, R e A carregam o contador como
 * segundo subcaminho, então precisam de `fill-rule: evenodd`.
 */
export const NOME_DETERA_VIEWBOX = "0 0 676 128" as const;

export const NOME_DETERA = [
  { nome: "D", d: "M0 0 H64 L92 28 V100 L64 128 H0 Z M20 20 V108 H56 L72 92 V36 L56 20 Z" },
  { nome: "E", d: "M116 0 H196 V20 H136 V54 H188 V74 H136 V108 H196 V128 H116 Z" },
  { nome: "T", d: "M216 0 H316 V20 H276 V128 H256 V20 H216 Z" },
  { nome: "E", d: "M340 0 H420 V20 H360 V54 H412 V74 H360 V108 H420 V128 H340 Z" },
  {
    nome: "R",
    d: "M444 0 H508 L536 28 V56 L516 76 L540 128 H516 L494 80 H464 V128 H444 Z M464 20 V60 H500 L512 48 V32 L500 20 Z",
  },
  {
    nome: "A",
    d: "M560 128 L588 0 H636 L664 128 H640 L634 100 H590 L584 128 Z M596 62 H628 L618 20 H606 Z",
  },
] as const;

/** A tarja da marca, no lugar da barra do "A". Cai junto com a última letra. */
export const NOME_DETERA_BARRA = { x: 590, y: 72, largura: 30, altura: 16 } as const;

/** Metade esquerda do coração, em placa chanfrada. A direita é espelhada. */
export const MARCA_METADE =
  "M14.6 14.2 L12.8 11.4 L10.8 11.4 L9.2 12.8 L6.6 12.8 L6.6 15.2 " +
  "L5 15.2 L5 19 L6.6 19 L6.6 20.6 L9.6 23.6 L9.6 24.8 L14.6 29.8 Z";

/**
 * O núcleo: cruz de braços escalonados, larga o bastante para atravessar as
 * duas placas. Braço fino demais vira bolinha quando a marca encolhe para o
 * tamanho do cabeçalho — a cruz precisa continuar legível em 40px.
 */
export const MARCA_NUCLEO =
  "M14.6 15.4 L17.4 15.4 L17.4 17 L18.8 17 L18.8 18.2 L20.6 18.2 " +
  "L20.6 21.8 L18.8 21.8 L18.8 23 L17.4 23 L17.4 24.6 L14.6 24.6 " +
  "L14.6 23 L13.2 23 L13.2 21.8 L11.4 21.8 L11.4 18.2 L13.2 18.2 " +
  "L13.2 17 L14.6 17 Z";

/** A linha de energia que atravessa a marca, e os traços que a continuam. */
export const MARCA_LINHA = { x: 15.35, largura: 1.3 } as const;

export const MARCA_TRACOS = [
  { y: 1.4, altura: 1.4 },
  { y: 3.9, altura: 1.4 },
  { y: 34.7, altura: 1.4 },
  { y: 37.2, altura: 1.4 },
] as const;
