import { z } from "zod";

export const tiposDeProjeto = [
  "Presença digital (site, loja ou página)",
  "Crescimento (busca, anúncios e conversão)",
  "Tecnologia e automação (sistema ou integração)",
  "Manutenção de um site que já existe",
  "Ainda não sei — quero conversar",
] as const;

/**
 * Validação no cliente porque o envio é no cliente: a mensagem sai montada
 * para o WhatsApp, sem passar por servidor nenhum. Isso mantém o site sem
 * backend e sem guardar dado de ninguém — e o único custo é que a checagem
 * vale como ajuda de preenchimento, não como barreira de segurança.
 */
export const contatoSchema = z.object({
  nome: z.string().trim().min(2, "Escreva seu nome."),
  empresa: z.string().trim().optional(),
  email: z.email("Confira o e-mail: parece incompleto."),
  tipo: z.enum(tiposDeProjeto),
  mensagem: z
    .string()
    .trim()
    .min(10, "Conte um pouco mais — dez caracteres não dão para entender o projeto."),
});

export type DadosContato = z.infer<typeof contatoSchema>;

/** Monta a mensagem já formatada, para a conversa começar com contexto. */
export function mensagemDeContato(dados: DadosContato): string {
  const linhas = [
    "Olá! Vim pelo site da DETERA.",
    "",
    `Nome: ${dados.nome}`,
    dados.empresa ? `Empresa: ${dados.empresa}` : null,
    `E-mail: ${dados.email}`,
    `Assunto: ${dados.tipo}`,
    "",
    dados.mensagem,
  ];

  return linhas.filter((linha) => linha !== null).join("\n");
}
