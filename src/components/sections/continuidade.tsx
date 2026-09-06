import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { continuacoes } from "@/content/continuidade";
import { site } from "@/config/site";

/**
 * O manifesto. É o único lugar do site onde o slogan é explicado — depois
 * daqui ele não precisa mais ser repetido, só sustentado pelo resto.
 */
export function Continuidade() {
  return (
    <Section
      id="continuidade"
      tone="camada"
      space="generous"
      aria-labelledby="continuidade-titulo"
      className="overflow-hidden"
    >
      {/* O manifesto também respira — mais contido que o hero, azul de
          sistema, quase imperceptível, apenas para a seção não ficar
          plana entre dois blocos que já têm brilho. */}
      <div
        aria-hidden="true"
        className="aura absolute h-[24rem] w-[24rem]"
        style={
          {
            right: "-6rem",
            bottom: "-6rem",
            "--aura-cor": "var(--color-sistema)",
            "--aura-opacidade": 0.09,
            "--aura-duracao": "26s",
          } as React.CSSProperties
        }
      />

      <Container className="relative">
        <div className="max-w-[60ch]">
          <h2 id="continuidade-titulo" className="text-display">
            {site.slogan}
          </h2>
          <p className="text-lead text-texto-suave mt-5">
            É o nome da empresa levado a sério. Quatro situações que o mercado
            costuma tratar como ponto final — e que, para a gente, são exatamente
            onde o trabalho começa a valer.
          </p>
        </div>

        <ul className="mt-16 flex flex-col">
          {continuacoes.map((item) => (
            <li
              key={item.fim}
              data-surgir
              className="border-borda grid gap-4 border-t py-9 md:grid-cols-[minmax(0,24rem)_1fr] md:gap-14"
            >
              <div className="relative">
                {/* O nó marca o ponto onde a frase pararia. */}
                <span
                  aria-hidden="true"
                  className="bg-determinacao absolute top-[0.6em] -left-[calc(0.75rem+3px)] hidden h-[6px] w-[6px] rotate-45 md:block"
                />
                <p className="font-display text-texto-fraco text-[1.35rem] leading-snug font-bold">
                  {item.fim}
                </p>
              </div>
              <p className="text-texto-suave max-w-[62ch] leading-relaxed">
                {item.continuacao}
              </p>
            </li>
          ))}
        </ul>

        <p className="text-texto-suave mt-12 max-w-[62ch] leading-relaxed">
          Por isso todo projeto sai fechado e pensado aberto: pronto para hoje,
          preparado para a próxima versão. O contrato termina; a construção, não.
        </p>
      </Container>
    </Section>
  );
}
