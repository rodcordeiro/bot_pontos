export namespace API {
  export interface APIResponse {
    linhas: Linha[];
    pontos: Ponto[];
  }

  export interface Ponto {
    id: string;
    rythm_id: string;
    rythm_description: string;
    line_id: string;
    line_description: string;
    tipo: string;
    ponto: string;
    audio_link?: string;
  }

  export interface Linha {
    id: string;
    linha: string;
    categoria: string;
  }
}
