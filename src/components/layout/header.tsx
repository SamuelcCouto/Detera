"use client";

import { useEffect, useState } from "react";

import { Simbolo } from "@/components/brand/wordmark";
import { ButtonLink } from "@/components/ui/button";
import { navLinks } from "@/config/nav";
import { cn } from "@/lib/utils/cn";
import { whatsappUrl } from "@/lib/utils/whatsapp";

const mensagemTopo =
  "Olá! Vim pelo site da DETERA e quero conversar sobre um projeto para a minha empresa.";

export function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  /**
   * Trava o scroll do corpo enquanto o menu ocupa a tela: sem isso o fundo
   * rola por baixo do painel no iOS e a pessoa perde o lugar da leitura.
   */
  useEffect(() => {
    if (!menuAberto) return;

    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const fecharComEsc = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") setMenuAberto(false);
    };
    window.addEventListener("keydown", fecharComEsc);

    return () => {
      document.body.style.overflow = anterior;
      window.removeEventListener("keydown", fecharComEsc);
    };
  }, [menuAberto]);

  return (
    <header className="border-borda bg-vazio/85 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[76rem] items-center justify-between gap-6 px-6 md:px-10">
        {/* Só o símbolo no cabeçalho: o nome aparece inteiro logo abaixo, no
            hero, e em tamanho que nenhuma marca de menu alcança. A marca não
            fica parada — e no hover ela acelera. */}
        <a
          href="#topo"
          className="group text-texto shrink-0"
          aria-label="DETERA, ir para o início do site"
        >
          <Simbolo className="h-10 w-8" />
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-texto-suave hover:text-texto decoration-determinacao text-[0.92rem] underline-offset-[7px] transition-colors hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {/* No celular o rótulo encurta para caber ao lado do menu: sem isso o
              único CTA fixo sumia justamente onde a maior parte da visita
              acontece. */}
          <ButtonLink href={whatsappUrl(mensagemTopo)} size="sm">
            <span className="lg:hidden">Começar</span>
            <span className="hidden lg:inline">Começar um projeto</span>
          </ButtonLink>

          <button
            type="button"
            onClick={() => setMenuAberto((aberto) => !aberto)}
            aria-expanded={menuAberto}
            aria-controls="menu-mobile"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            className="border-contorno text-texto hover:border-determinacao flex h-11 w-11 items-center justify-center rounded-[2px] border transition-colors lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden="true" className="flex w-4 flex-col gap-[5px]">
              <span
                className={cn(
                  "h-px bg-current transition-transform duration-200",
                  menuAberto && "translate-y-[6px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-px bg-current transition-opacity duration-200",
                  menuAberto && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-px bg-current transition-transform duration-200",
                  menuAberto && "-translate-y-[6px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* `hidden` em vez de desmontar: os links continuam no HTML entregue,
          então o rastreador enxerga a navegação sem executar o menu. */}
      <div
        id="menu-mobile"
        hidden={!menuAberto}
        className="border-borda bg-vazio border-t lg:hidden"
      >
        <nav aria-label="Navegação principal, versão compacta">
          <ul className="flex flex-col px-6 py-2">
            {navLinks.map((link) => (
              <li key={link.href} className="border-borda border-b last:border-b-0">
                <a
                  href={link.href}
                  onClick={() => setMenuAberto(false)}
                  className="text-texto font-display block py-4 text-[1.15rem] font-bold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-6 pt-2 pb-6">
          <ButtonLink
            href={whatsappUrl(mensagemTopo)}
            className="w-full"
            onClick={() => setMenuAberto(false)}
          >
            Começar um projeto
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
