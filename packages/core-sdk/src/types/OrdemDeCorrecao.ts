export type StatusOrdemDeCorrecao =
  | 'ABERTA'
  | 'EM_EXECUCAO'
  | 'CONCLUIDA'
  | 'CANCELADA'
  | 'PENDENTE_AUTORIZACAO';

export interface TarefaDeCorrecao {
  id?: string | number;
  localId?: string;
  descricao: string;
  responsavel?: string;
  responsavelId?: string | number;
  status?: string;
  removed?: boolean;
  tarefasUnidadeMaterial?: TarefaUnidadeMaterial[];
}

export interface TarefaUnidadeMaterial {
  id?: string | number;
  unidadeMaterialId?: string | number | null;
  unidadeMaterial?: any;
  quantidade: number;
  userId: string;
  dataDoApontamento: string;
  removed?: boolean;
}

export interface OrdemDeCorrecao {
  id: string | number;
  status: StatusOrdemDeCorrecao;
  ordemDeServicoId?: string | number;
  registroDeCampoId?: string | number;
  recursoNome?: string;
  recursoId?: string | number;
  observacao?: string;
  dataDeAbertura?: string | null;
  dataDeEncerramento?: string | null;
  tarefas: TarefaDeCorrecao[];
  solicitante?: {
    id: string | number;
    nome: string;
  };
  recurso?: {
    id: string | number;
    nome: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface OrdemDeCorrecaoFormState {
  ordemDeServicoId: string;
  registroDeCampoId: string;
  recursoNome: string;
  recursoId: string;
  observacao: string;
  tarefas: TarefaDeCorrecao[];
  dataDeAbertura?: string | null;
  dataDeEncerramento?: string | null;
}
