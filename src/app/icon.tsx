import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * O coração da marca reduzido ao que ainda se lê em 32px: a silhueta cheia,
 * sem a fresta central do símbolo grande — nesse tamanho ela viraria ruído,
 * não desenho. O núcleo vermelho continua visível, encravado no meio.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#07080b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="19" height="24" viewBox="0 0 16 16" fill="none">
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
      </div>
    ),
    size,
  );
}
