import { TextoMeteoro } from "@/components/brand/texto-meteoro";
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

/** Segundo em que a última letra do nome termina de pousar. */
const FIM_DO_NOME = 0.15 + 5 * 0.075 + 0.78;

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
        vermelha ambiente, à deriva, com cadentes e cometas cruzando. Nada
        aqui depende de mouse — funciona igual no celular e no desktop, e é a
        razão de ter substituído o brilho que só reagia ao cursor.
      */}
      <Estrelas quantidade={96} cadentes={5} cometas={2} />
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
        A margem esquerda inteira é a área de jogo.

        A largura sai de conta, não de palpite: `100%` aqui é a seção (a
        largura da janela) e `76rem` é o container do conteúdo, então
        `(100% - 76rem) / 2` é exatamente a sobra de um lado. Somam-se os
        `2.5rem` de respiro interno do container, que também são espaço vazio,
        e o painel encosta no texto sem nunca invadi-lo — em qualquer
        resolução, sem media query de largura fixa.

        O recuo da direita não é folga estética: a página tem uma trilha
        vertical correndo rente ao container, e a área de jogo encostada nela
        viraria um traço grosso só. Os 3rem separam as duas coisas.

        Some por completo abaixo de 1680px: ali a sobra não comporta a área de
        jogo, e quem entra pelo celular não tem teclado nem margem nenhuma.
      */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden [@media(min-width:1680px)]:block"
        style={{ width: "calc((100% - 76rem) / 2 + 2.5rem)" }}
      >
        <div className="pointer-events-auto absolute inset-y-12 right-12 left-8">
          <Nave />
        </div>
      </div>

      <Container className="relative pt-20 pb-20 md:pt-28 md:pb-28">
        <Simbolo className="entrar text-borda-viva h-14 w-11" />

        <h1 id="hero-titulo" className="mt-8">
          {/*
            `w-fit` faz a caixa do nome parar onde a palavra para. É o que
            mantém a luz vermelha atravessando "DETERA" e não a largura
            inteira do container — a passagem tem que durar o nome.
          */}
          <span
            className="text-marca font-display relative block w-fit font-black"
            style={{ letterSpacing: "0.045em" }}
          >
            <TextoMeteoro texto={site.name} atraso={0.15} passo={0.075} />

            {/* A cópia que carrega a luz. Mesma estrutura de letras da de
                baixo, de propósito: qualquer outra montagem desalinharia as
                duas por causa do espacejamento. */}
            <span className="marca-luz absolute inset-0" aria-hidden="true">
              <TextoMeteoro texto={site.name} animar={false} mudo />
            </span>
          </span>

          <span className="text-display text-texto mt-3 block font-normal">
            <TextoMeteoro texto={site.slogan} atraso={FIM_DO_NOME - 0.34} passo={0.018} />
          </span>
        </h1>

        <p
          className="entrar text-lead text-texto-suave mt-8 max-w-[56ch]"
          style={{ animationDelay: "1.35s" }}
        >
          Toda ideia de negócio começa parecida com as outras. O nosso trabalho é
          tecnologia, estratégia e design aplicados até ela virar algo que só a
          sua empresa tem.
        </p>

        <div
          className="entrar mt-9 flex flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "1.5s" }}
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
