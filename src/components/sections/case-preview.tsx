"use client";

import { useState } from "react";

/**
 * A moldura de navegador em volta da imagem do projeto: pontos, barra de
 * endereço com o domínio real, e a prévia dentro.
 *
 * A imagem é hotlink para um arquivo que já vive no site do próprio projeto
 * — não uma cópia salva aqui (ver `imagemUrl` em `content/cases.ts` e
 * `content/em-construcao.ts`). Isso tem um efeito colateral bom: a prévia
 * acompanha se o arquivo for trocado lá. E um risco conhecido: se o arquivo
 * sumir, `onError` troca o quadro por um aviso em vez de deixar o ícone de
 * imagem quebrada aparecer. Quando não existe imagem nenhuma para mostrar
 * (`imagemUrl` ausente), o mesmo aviso aparece direto, sem tentar carregar
 * nada.
 */
export function PreviaCase({
  href,
  dominio,
  imagemUrl,
  imagemAlt,
  emConstrucao = false,
}: {
  href: string;
  dominio: string;
  imagemUrl?: string;
  imagemAlt?: string;
  /** Marca o projeto como ainda em obra — a barra de endereço ganha um selo. */
  emConstrucao?: boolean;
}) {
  const [falhou, setFalhou] = useState(!imagemUrl);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir ${dominio} em uma nova aba`}
      className="bloco bloco--vivo group block overflow-hidden"
    >
      <div className="border-borda bg-camada-alta flex items-center gap-1.5 border-b px-3.5 py-2.5">
        <span aria-hidden="true" className="border-contorno h-2 w-2 rounded-full border" />
        <span aria-hidden="true" className="border-contorno h-2 w-2 rounded-full border" />
        <span aria-hidden="true" className="border-contorno h-2 w-2 rounded-full border" />
        <span className="text-texto-fraco font-mono ml-2 truncate text-[0.8rem]">
          {dominio}
        </span>
        {emConstrucao ? (
          <span className="estado text-sistema-viva ml-auto shrink-0 pl-2">
            <span aria-hidden="true" className="bg-sistema h-[5px] w-[5px] rotate-45" />
            Em obra
          </span>
        ) : null}
      </div>

      <div className="bg-camada-alta relative aspect-[16/9] overflow-hidden">
        {falhou || !imagemUrl ? (
          <span className="text-texto-fraco absolute inset-0 flex items-center justify-center p-6 text-center text-[0.85rem]">
            Pré-visualização indisponível — clique para ver o site ao vivo
          </span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- hotlink externo, fora do domínio configurado para next/image
          <img
            src={imagemUrl}
            alt={imagemAlt}
            loading="lazy"
            onError={() => setFalhou(true)}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>
    </a>
  );
}
