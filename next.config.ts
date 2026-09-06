import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },

  /**
   * O site anterior era uma página única com estas âncoras. Quem tiver o link
   * antigo salvo cai na seção equivalente em vez de num 404.
   *
   * `#servicos` virou a seção de pilares e `#projetos` virou a de cases: os ids
   * foram preservados de propósito, para não quebrar link nenhum já publicado.
   *
   * Temporário (307) enquanto a estrutura ainda está em ajuste — um 308 fica
   * cacheado no navegador e trava a decisão.
   */
  async redirects() {
    return [
      { source: "/sobre", destination: "/#sobre", permanent: false },
      { source: "/servicos", destination: "/#solucoes", permanent: false },
      { source: "/solucoes", destination: "/#solucoes", permanent: false },
      { source: "/projetos", destination: "/#projetos", permanent: false },
      { source: "/como-funciona", destination: "/#processo", permanent: false },
      { source: "/processo", destination: "/#processo", permanent: false },
      { source: "/contato", destination: "/#contato", permanent: false },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
