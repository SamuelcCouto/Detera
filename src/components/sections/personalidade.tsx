import { Estrelas } from "@/components/sections/estrelas";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { transformacoes } from "@/content/personalidade";
import { site } from "@/config/site";

/**
 * O manifesto. É o único lugar do site onde o slogan é explicado — depois
 * daqui ele não precisa mais ser repetido, só sustentado pelo resto.
 */
export function Personalidade() {
  return (
    <Section
      id="personalidade"
      tone="vazio"
      space="generous"
      aria-labelledby="personalidade-titulo"
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

      <Estrelas
        quantidade={64}
        semente={771}
        cadentes={4}
        cometas={1}
        nebulosa="sistema"
        className="opacity-80"
      />

      <Container className="relative">
        <div className="max-w-[60ch]">
          <h2 id="personalidade-titulo" className="text-display">
            {site.slogan}
          </h2>
          <p className="text-lead text-texto-suave mt-5">
            É a frase que orienta cada projeto. Quatro decisões que separam o
            que só funciona do que também tem cara própria.
          </p>
        </div>

        <ul className="mt-16 flex flex-col">
          {transformacoes.map((item) => (
            <li
              key={item.generico}
              data-surgir
              className="border-borda grid gap-4 border-t py-9 md:grid-cols-[minmax(0,24rem)_1fr] md:gap-14"
            >
              <div className="relative">
                {/* O nó marca o ponto onde a entrega ficaria genérica. */}
                <span
                  aria-hidden="true"
                  className="bg-determinacao absolute top-[0.6em] -left-[calc(0.75rem+3px)] hidden h-[6px] w-[6px] rotate-45 md:block"
                />
                <p className="font-display text-texto-fraco text-[1.35rem] leading-snug font-bold">
                  {item.generico}
                </p>
              </div>
              <p className="text-texto-suave max-w-[62ch] leading-relaxed">
                {item.especifico}
              </p>
            </li>
          ))}
        </ul>

        <p className="text-texto-suave mt-12 max-w-[62ch] leading-relaxed">
          Personalidade não é um efeito visual aplicado no fim. É a mesma
          decisão repetida em cada parte do projeto — até virar reconhecível.
        </p>
      </Container>
    </Section>
  );
}
