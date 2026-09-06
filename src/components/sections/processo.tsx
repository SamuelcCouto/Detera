import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { etapas } from "@/content/processo";

export function Processo() {
  return (
    <Section
      id="processo"
      alias="como-funciona"
      tone="camada"
      aria-labelledby="processo-titulo"
    >
      <Container>
        <div className="grid gap-10 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            <h2 id="processo-titulo" className="text-display max-w-[12ch]">
              Como trabalhamos
            </h2>
            <p className="text-lead text-texto-suave mt-5 max-w-[38ch]">
              Do primeiro contato até bem depois da entrega. Sem etapa surpresa e
              sem começar nada antes de estar escrito.
            </p>
          </div>

          {/* A linha que liga as etapas fica no container e não em cada item:
              assim ela é contínua e não se quebra no espaço entre uma e outra. */}
          <div className="relative">
            <span
              aria-hidden="true"
              className="from-borda via-borda absolute top-2 bottom-0 left-[3px] w-px bg-gradient-to-b to-transparent"
            />

            <ol className="flex flex-col">
              {etapas.map((etapa) => (
                <li
                  key={etapa.numero}
                  data-surgir
                  className="relative grid gap-x-6 gap-y-1.5 py-6 pl-8 sm:grid-cols-[3rem_1fr] sm:pl-10"
                >
                  <span
                    aria-hidden="true"
                    className="bg-camada border-borda-viva absolute top-[1.85rem] left-0 h-[7px] w-[7px] rotate-45 border"
                  />
                  <span
                    aria-hidden="true"
                    className="estado pt-1 sm:justify-end sm:pr-2"
                  >
                    {etapa.numero}
                  </span>
                  <div>
                    <h3 className="text-heading">{etapa.titulo}</h3>
                    <p className="text-texto-suave mt-2 max-w-[54ch] leading-relaxed">
                      {etapa.texto}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {/*
              O processo não fecha na quinta etapa: ele devolve para a primeira.
              O nó final é vermelho porque é o único ponto vivo da sequência —
              e é ele que explica por que "evoluir" não é uma etapa opcional.
            */}
            <div className="relative pt-2 pl-8 sm:pl-10">
              <span
                aria-hidden="true"
                className="bg-determinacao absolute top-[1.1rem] left-0 h-[7px] w-[7px] rotate-45"
              />
              <p className="text-texto-suave text-[0.95rem]">
                <span className="estado text-determinacao-viva mr-2">05 → 01</span>
                Cada ciclo de evolução recomeça em descobrir. É por isso que a
                conta de manutenção não é um custo solto no fim do projeto.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
