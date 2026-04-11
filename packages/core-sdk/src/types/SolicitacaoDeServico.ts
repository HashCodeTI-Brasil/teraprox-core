export type StatusSolicitacao = 'PENDENTE' | 'APROVADO' | 'REPROVADO' | 'CANCELADO' | 'EM_EXECUCAO';

export interface SolicitacaoDeServico {
  id: string | number;
  status: StatusSolicitacao;
  dataDeAbertura: string;
  descricaoDoProblema: string;
  solicitante: {
    id: string | number;
    nome: string;
  };
  recurso?: {
    id: string | number;
    nome: string;
  };
  recursoNome?: string;
  prioridade?: 'BAIXA' | 'MEDIA' | 'ALTA' | 'URGENTE';
  setor?: string;
  equipamento?: string;
}
