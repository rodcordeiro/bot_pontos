declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      readonly DISCORD_WEBHOOK: string;
      readonly GRUPO_PONTOS_ID: string;
      readonly RAIZES_ID: string;
    }
  }
}

export {};
