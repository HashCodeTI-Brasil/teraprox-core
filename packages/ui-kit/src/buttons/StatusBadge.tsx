import React from "react";
import { Form, Spinner } from "react-bootstrap";

export interface StatusBadgeProps {
  /** Texto do status */
  status: string;
  /** Se deve exibir um checkbox de seleção ao lado */
  showCheckbox?: boolean;
  /** Estado do checkbox */
  checked?: boolean;
  /** Callback para alteração do checkbox */
  onToggle?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Estado de carregamento */
  loading?: boolean;
  /** Mapeamento customizado de classes de status (padrão: PENDENTE, EXECUTANDO, CONCLUIDO, CANCELED) */
  customStatusClasses?: Record<string, string>;
}

/**
 * Badge de Status com suporte opcional a checkbox e spinner.
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showCheckbox = false,
  checked = false,
  onToggle = () => {},
  loading = false,
  customStatusClasses,
}) => {
  const statusClasses: Record<string, string> = customStatusClasses || {
    PENDENTE: "bg-warning text-dark",
    EXECUTANDO: "bg-success text-white",
    CONCLUIDO: "bg-secondary text-white",
    CANCELED: "bg-danger text-white",
  };

  const badgeClass = statusClasses[status] || "bg-secondary text-white";

  return (
    <div className="d-flex align-items-center gap-2">
      {loading ? (
        <Spinner animation="border" size="sm" />
      ) : (
        <>
          {showCheckbox && (
            <Form.Check
              type="checkbox"
              checked={checked}
              onChange={onToggle}
              className="me-1"
            />
          )}
          <span className={`badge ${badgeClass}`}>{status}</span>
        </>
      )}
    </div>
  );
};

export default StatusBadge;
