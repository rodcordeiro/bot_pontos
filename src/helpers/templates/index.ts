import { API } from "../interfaces";

export class Templates {
  static DAILY(data: API.Ponto) {
    return `*Ponto do dia!!*\n\n*Linha:* \`\`\`${
      data.line_description
    }\`\`\`\n\n${Templates.PONTO(data)}${Templates.Footer()}`;
  }

  static PONTO(data: API.Ponto) {
    return `*Ritmo:* \`\`\`${data.rythm_description}\`\`\`\n\n\`\`\`${data.ponto}\n\n\`\`\``;
  }

  static MENU(id: string, label: string) {
    return `_${id}_: ${label}`;
  }

  static Footer(search?: string) {
    return `\`\`\`~~[Mensagem automática]~~\nPara ver mais pontos acesse:\nhttps://raizes.rodrigocordeiro.com.br/${
      search ? `index.php?buscar=${search.replace(/ /gm, "%20")}` : ""
    } ou me mande /help\`\`\``;
  }
}
