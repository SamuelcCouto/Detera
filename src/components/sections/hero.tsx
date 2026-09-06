import { Simbolo } from "@/components/brand/wordmark";
import { Estrelas } from "@/components/sections/estrelas";
import { Nave } from "@/components/sections/nave";
import { ButtonLink } from "@/components/ui/button";
import { BotaoNucleo } from "@/components/ui/botao-nucleo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { pilares } from "@/content/pilares";
import { site } from "@/config/site";
import { whatsappUrl } from "@/lib/utils/whatsapp";

const mensagemHero =
  "Olá! Vim pelo site da DETERA e quero conversar sobre um projeto para a minha empresa.";

/**
 * A trilha de frentes: as quatro áreas ligadas por uma linha com nós, e a
 * linha segue depois da última em vez de parar nela.
 *
 * É o argumento comercial e a filosofia da marca no mesmo desenho — e resolve
 * a primeira dobra sem depender de ilustração.
 */
function TrilhaDeFrentes() {
  return (
    <ul className="mt-14 grid gap-0 md:mt-20 md:grid-cols-4">
      {pilares.map((pilar, indice) => (
        <li
          key={pilar.id}
          className="relative border-borda border-l py-3 pl-4 md:border-l-0 md:border-t md:py-0 md:pt-5 md:pl-0"
        >
          {/* O nó sobre a linha. No mobile ele fica na vertical, à esquerda. */}
          <span
            aria-hidden="true"
            className={`bg-vazio absolute -left-[4px] top-4 h-[7px] w-[7px] rotate-45 border md:top-0 md:left-0 md:-translate-y-1/2 ${
              pilar.acento === "sistema" ? "border-sistema" : "border-determinacao"
            }`}
          />
          <a
            href={`#${pilar.id}`}
            className="hover:text-texto text-texto-suave block transition-colors md:pr-6"
          >
            <span className="text-texto font-display block text-[0.98rem] font-bold">
              {pilar.nome}
            </span>
            <span className="mt-1 block text-[0.85rem] leading-snug">
              {pilar.promessa}
            </span>
          </a>

          {/* Depois da quarta frente a linha continua. */}
          {indice === pilares.length - 1 ? (
            <span
              aria-hidden="true"
              className="from-borda absolute -top-px right-0 hidden h-px w-16 translate-x-full bg-gradient-to-r to-transparent md:block"
            />
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function Hero() {
  return (
    <Section
      id="topo"
      aria-labelledby="hero-titulo"
      tone="vazio"
      space="none"
      className="overflow-hidden"
    >
      {/*
        O fundo do hero: um céu de estrelas piscando por baixo de uma luz
        vermelha ambiente, à deriva. Nada aqui depende de mouse — funciona
        igual no celular e no desktop, e é a razão de ter substituído o
        brilho que só reagia ao cursor.
      */}
      <Estrelas />
      <div
        aria-hidden="true"
        className="aura absolute h-[40rem] w-[40rem]"
        style={
          {
            top: "-14rem",
            left: "50%",
            marginLeft: "-20rem",
            "--aura-cor": "var(--color-determinacao)",
            "--aura-opacidade": 0.16,
            "--aura-duracao": "26s",
          } as React.CSSProperties
        }
      />
      <div
        aria-hidden="true"
        className="aura absolute h-[26rem] w-[26rem]"
        style={
          {
            bottom: "-8rem",
            right: "8%",
            "--aura-cor": "var(--color-determinacao)",
            "--aura-opacidade": 0.14,
            "--aura-duracao": "19s",
          } as React.CSSProperties
        }
      />

      {/*
        A margem que sobra ao lado do conteúdo recebe o joguinho. O painel é
        ancorado ao container (`right-full`), não à janela: assim ele nunca
        invade o texto, só existe quando a margem comporta os 200px, e some
        por completo abaixo de 1620px — onde não há espaço nem teclado.
      */}
      <div className="pointer-events-none absolute inset-0 hidden justify-center [@media(min-width:1620px)]:flex">
        <div className="relative w-full max-w-[76rem]">
          <div className="pointer-events-auto absolute top-[12.5rem] right-full">
            <Nave />
          </div>
        </div>
      </div>

      <Container className="relative pt-20 pb-20 md:pt-28 md:pb-28">
        <Simbolo className="entrar text-borda-viva h-14 w-11" />

        <h1 id="hero-titulo" className="mt-8">
          <span
            className="entrar text-marca font-display block font-black"
            style={{ animationDelay: "0.05s", letterSpacing: "0.045em" }}
          >
            {site.name}
          </span>
          <span
            className="entrar text-display text-texto mt-3 block font-normal"
            style={{ animationDelay: "0.14s" }}
          >
            {site.slogan}
          </span>
        </h1>

        <p
          className="entrar text-lead text-texto-suave mt-8 max-w-[56ch]"
          style={{ animationDelay: "0.22s" }}
        >
          Toda ideia de negócio começa parecida com as outras. O nosso trabalho é
          tecnologia, estratégia e design aplicados até ela virar algo que só a
          sua empresa tem.
        </p>

        <div
          className="entrar mt-9 flex flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "0.3s" }}
        >
          <BotaoNucleo href={whatsappUrl(mensagemHero)}>Vamos construir</BotaoNucleo>
          <ButtonLink href="#solucoes" variant="contorno">
            Conhecer a DETERA
          </ButtonLink>
        </div>

        <TrilhaDeFrentes />
      </Container>
    </Section>
  );
}
