export interface RegraDeCorrecao {
  id?: string | number;
  acao?: any;
  acaoId?: string | number;
  parametro?: any;
  parametroId?: string | number;
  campoDeVerificacao?: any;
  campoDeVerificacaoId?: string | number;
  tipoDeCorrecao?: string;
  calculosDeCorrecao?: CalculoDeCorrecao[];
}

export interface CalculoDeCorrecao {
  id?: string | number;
  material?: any;
  materialId?: string | number;
  formula?: string;
  unidade?: string;
}

export interface RegraDeCorrecaoFormState {
  acao: any;
  acaoId: string;
  parametro: any;
  parametroId: string;
  campoDeVerificacao: any;
  campoDeVerificacaoId: string;
  tipoDeCorrecao: string;
  calculosDeCorrecao: CalculoDeCorrecao[];
}
