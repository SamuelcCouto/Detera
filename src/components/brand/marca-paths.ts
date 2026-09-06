/**
 * A geometria da marca, em um lugar só.
 *
 * O símbolo aparece em três lugares que não compartilham runtime — o site
 * (SVG no DOM), o favicon e a imagem de compartilhamento (ambos desenhados
 * pelo `next/og`). Com os caminhos duplicados em cada arquivo, bastava
 * ajustar um deles para a marca ficar diferente de si mesma sem ninguém
 * notar. Todos leem daqui.
 *
 * Sistema de coordenadas: `viewBox="0 0 32 40"`, centro em x = 16.
 */

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
