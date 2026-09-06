import { ImageResponse } from "next/og";

import { site } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.slogan}`;

const frentes = ["Presença digital", "Crescimento", "Tecnologia", "Infraestrutura"];

/**
 * O compartilhamento repete a primeira dobra: marca, slogan e as quatro
 * frentes ligadas por uma linha que continua depois da última.
 *
 * Sem fonte customizada de propósito — carregar o arquivo da Chivo em tempo de
 * build acrescenta uma requisição de rede que pode derrubar o deploy inteiro
 * por um motivo cosmético.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#07080b",
          color: "#f2f3f5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 78px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <svg width="40" height="40" viewBox="0 0 16 16" fill="none">
            <g fill="#f2f3f5">
              <rect x="3" y="3" width="2" height="2" />
              <rect x="5" y="3" width="2" height="2" />
              <rect x="9" y="3" width="2" height="2" />
              <rect x="11" y="3" width="2" height="2" />
              <rect x="1" y="5" width="2" height="2" />
              <rect x="3" y="5" width="2" height="2" />
              <rect x="5" y="5" width="2" height="2" />
              <rect x="7" y="5" width="2" height="2" />
              <rect x="9" y="5" width="2" height="2" />
              <rect x="11" y="5" width="2" height="2" />
              <rect x="13" y="5" width="2" height="2" />
              <rect x="1" y="7" width="2" height="2" />
              <rect x="3" y="7" width="2" height="2" />
              <rect x="5" y="7" width="2" height="2" />
              <rect x="7" y="7" width="2" height="2" />
              <rect x="9" y="7" width="2" height="2" />
              <rect x="11" y="7" width="2" height="2" />
              <rect x="13" y="7" width="2" height="2" />
              <rect x="3" y="9" width="2" height="2" />
              <rect x="5" y="9" width="2" height="2" />
              <rect x="7" y="9" width="2" height="2" />
              <rect x="9" y="9" width="2" height="2" />
              <rect x="11" y="9" width="2" height="2" />
              <rect x="5" y="11" width="2" height="2" />
              <rect x="7" y="11" width="2" height="2" />
              <rect x="9" y="11" width="2" height="2" />
              <rect x="7" y="13" width="2" height="2" />
            </g>
            <path d="M8 6l2 2-2 2-2-2z" fill="#ff3b3b" />
          </svg>

          <div
            style={{
              marginTop: 30,
              fontSize: 104,
              fontWeight: 900,
              letterSpacing: "0.05em",
              lineHeight: 1,
              display: "flex",
              alignItems: "baseline",
            }}
          >
            {site.name}
            <div
              style={{ width: 16, height: 16, background: "#ff3b3b", marginLeft: 12 }}
            />
          </div>

          <div
            style={{
              marginTop: 14,
              fontSize: 44,
              color: "#9ba1ac",
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            {site.slogan}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          {frentes.map((frente, indice) => (
            <div
              key={frente}
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 23,
                color: "#9ba1ac",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  background: indice === 3 ? "#4c7dff" : "#ff3b3b",
                  transform: "rotate(45deg)",
                  marginRight: 12,
                }}
              />
              {frente}
              <div
                style={{
                  width: indice === 3 ? 70 : 46,
                  height: 1,
                  background: "#23262e",
                  marginLeft: 16,
                  marginRight: indice === 3 ? 0 : 16,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
