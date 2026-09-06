# DETERA

Site institucional da DETERA — tecnologia, estratégia e crescimento digital.
Slogan e critério de entrega da marca: **nada termina aqui**.

Substitui o portfólio pessoal que existia antes neste repositório (preservado em
`legacy/`).

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · zod · Vercel.

É a mesma stack dos outros projetos da casa (`sencis`, `fidele`, `YasminGS`), de
propósito: o que se aprende em um projeto vale nos outros.

## Rodando

```bash
npm install
npm run dev
```

`npm run build` para o build de produção, `npm run typecheck` e `npm run lint`
antes de publicar.

## Variáveis de ambiente

| Variável | Para quê |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canônica do domínio final, com protocolo. **Enquanto não estiver definida, o site é publicado com `noindex`** — ver abaixo. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número do WhatsApp em formato internacional sem símbolos (`5562984750989`). Opcional: há um padrão em `src/config/site.ts`. |

### Sobre o `noindex`

`src/config/site.ts` só considera o site público quando `NEXT_PUBLIC_SITE_URL`
existe. Sem ela, `robots.ts` bloqueia os rastreadores e a página sai com
`noindex`. É proposital: uma URL de preview da Vercel indexada compete com o
domínio real depois e vira conteúdo duplicado.

Quando o domínio da DETERA entrar no ar, defina a variável na Vercel e refaça o
deploy. Só isso libera a indexação.

### O "A" de DETERA

O nome usa **A latino (U+0041)** do começo ao fim. Ele chegou escrito com um
**А cirílico (U+0410)** no último caractere — idêntico aos olhos e outra palavra
para busca, leitor de tela e copiar/colar. Se for reescrever a marca em algum
lugar, confira o caractere.

## Sistema de design

Tudo vive em `src/app/globals.css`, sob `@theme`. Os componentes leem os tokens;
nenhum valor de cor é escrito solto no JSX.

**Cor.** Preto com desvio de azul (`--color-vazio` `#07080b`, `--color-camada`
`#0e1015`) e dois acentos com significado fixo:

- **vermelho** (`--color-determinacao`) = ação, estado ativo, o núcleo da marca;
- **azul** (`--color-sistema`) = infraestrutura, dado, o que sustenta.

Acento nunca é decoração. Se um elemento não é ação nem sistema, ele é cinza.

`--color-contorno` (`#5c626d`) é separado das bordas decorativas de propósito:
limite de componente interativo precisa de 3:1 contra o fundo (WCAG 1.4.11), e o
filete que separa dois blocos não.

**Tipografia.** Uma superfamília: Chivo no display e no texto, Chivo Mono
reservada à microcopy de estado (números de etapa, rótulos de sistema). Servidas
pelo próprio domínio via `next/font`.

**Forma.** Raio curto (2px e 4px) e borda no lugar de sombra — sobre preto,
sombra não existe.

**A trilha.** O filete vertical que atravessa a página, marcado por losangos a
cada seção e sumindo por fade no rodapé em vez de bater num terminal. É o slogan
escrito na estrutura. Aparece a partir de 1280px; no mobile viraria sujeira ao
lado do texto.

## Movimento

- **Entrada do hero**: CSS puro, uma sequência só.
- **Revelação por scroll**: `animation-timeline: view()` — sem JavaScript, sem
  `IntersectionObserver`, sem biblioteca. Fica dentro de um `@supports`, então
  navegador sem suporte mostra o conteúdo normalmente.
- **Impressão**: há um `@media print` que zera as animações. Sem ele a timeline
  nunca progride e a página sairia em branco no papel.
- `prefers-reduced-motion` neutraliza tudo.

## Onde mexer no conteúdo

O texto do site não vive dentro dos componentes. Está em `src/content/`:

| Arquivo | Seção |
| --- | --- |
| `diagnostico.ts` | Os quatro sintomas de "onde o digital costuma travar" |
| `pilares.ts` | Presença digital, Crescimento, Tecnologia, Infraestrutura |
| `continuidade.ts` | O manifesto "nada termina aqui" |
| `cases.ts` | Os estudos de caso (problema, estratégia, construção, resultado) |
| `processo.ts` | As cinco etapas, de descobrir a evoluir |
| `perguntas.ts` | As perguntas frequentes |

Marca, contatos e dados institucionais ficam em `src/config/site.ts`.

## Decisões que valem saber

- **Sem backend.** O formulário de contato valida com zod no cliente e monta uma
  mensagem de WhatsApp já preenchida. Nenhum dado é armazenado. Se um dia
  precisar de e-mail transacional, o lugar é uma rota em `src/app/api/`.
- **Âncoras antigas preservadas.** `#servicos` e `#como-funciona` continuam
  existindo como alias das seções renomeadas (`#solucoes`, `#processo`), e
  `next.config.ts` redireciona as rotas equivalentes. Nenhum link já
  compartilhado quebra.
- **Referências discretas.** O losango com núcleo, os pontos de continuação da
  trilha, o laço `05 → 01` no processo, o "Continua" do rodapé, o 404 que
  convida a continuar e o recado no console são homenagens conceituais à ideia
  de determinação e de retomada. Nenhum asset, nome, texto ou interface de
  terceiros foi usado, e nada disso depende de reconhecimento para funcionar
  como design.
