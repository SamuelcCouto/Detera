import type { Metadata, Viewport } from "next";
import { Chivo, Chivo_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { isPublicDomain, site } from "@/config/site";
import "./globals.css";

/**
 * Uma superfamília só: Chivo no display e no texto, Chivo Mono reservado à
 * microcopy de estado. Duas fontes que já foram desenhadas para conviver
 * evitam o par display/corpo que não tem nada a ver um com o outro.
 *
 * Servidas pelo próprio domínio via next/font: sem requisição a CDN externa,
 * sem layout shift e sem custo de terceiro no Core Web Vitals.
 */
const chivo = Chivo({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-chivo",
});

const chivoMono = Chivo_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-chivo-mono",
});

const titulo = `${site.name} — ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: titulo,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.founder, url: site.founderPortfolio }],
  creator: site.legalName,
  publisher: site.legalName,
  keywords: [
    "DETERA",
    "criação de sites Goiânia",
    "desenvolvimento de sites para empresas",
    "loja virtual sob medida",
    "landing page para campanha",
    "SEO local Goiânia",
    "sistema web sob medida",
    "automação de processos",
    "integração de sistemas",
    "infraestrutura e performance web",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: titulo,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: site.description,
  },
  // Só libera a busca quando o domínio final estiver configurado: evita a URL
  // de preview ranquear e virar conteúdo duplicado do domínio real.
  robots: isPublicDomain
    ? { index: true, follow: true }
    : { index: false, follow: false },
  alternates: { canonical: "/" },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#07080b",
  colorScheme: "dark",
};

/**
 * Recado para quem abre o console. Vai como script inline em vez de client
 * component: não custa hidratação nenhuma e roda uma vez só.
 *
 * O slogan vem de `site.slogan`, não digitado aqui de novo — assim o recado
 * nunca fica dizendo uma frase que o resto do site já trocou.
 */
const recadoConsole = ((): string => {
  const texto =
    `%c${site.name}%c  ${site.slogan}%c\n\n` +
    "Se você chegou até aqui, provavelmente também constrói coisas.\n" +
    `Quando quiser construir junto: ${site.contact.email}`;

  const argumentos = [
    texto,
    "background:#ff3b3b;color:#07080b;font-weight:700;padding:2px 8px;letter-spacing:.18em",
    "color:#9ba1ac;padding-left:8px",
    "color:#6b717c",
  ];

  /**
   * Os valores entram via `JSON.stringify`, não por interpolação direta na
   * string do script.
   *
   * Interpolando, bastaria um dia alguém pôr uma aspa em `site.slogan` para
   * quebrar o literal e fechar o script — e o que viesse depois seria
   * executado. `JSON.stringify` produz o literal já escapado, e o `<` vira
   * `<` para o texto nunca conseguir fechar a tag `</script>`.
   */
  return `console.log(${argumentos.map((a) => JSON.stringify(a)).join(",")});`.replace(
    /</g,
    "\\u003c",
  );
})();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${chivo.variable} ${chivoMono.variable}`}>
      <body className="antialiased">
        {children}
        <script dangerouslySetInnerHTML={{ __html: recadoConsole }} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
