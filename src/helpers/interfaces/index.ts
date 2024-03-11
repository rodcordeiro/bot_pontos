export namespace API {
  export type APIResponse = {
    linhas: Linha[];
    pontos: Ponto[];
  };

  export type Ponto = {
    id: string;
    rythm_id: string;
    rythm_description: string;
    line_id: string;
    line_description: string;
    tipo: string;
    ponto: string;
    audio_link?: string;
  };

  export type Linha = {
    id: string;
    linha: string;
    categoria: string;
  };
}
