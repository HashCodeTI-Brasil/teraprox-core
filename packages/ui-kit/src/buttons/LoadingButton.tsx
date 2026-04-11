import React from "react";
import { Button, Spinner, ButtonProps } from "react-bootstrap";
import "../styles/LoadingButton.css";

export interface LoadingButtonProps extends ButtonProps {
  /** Função de clique */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Estado de carregamento */
  loading?: boolean;
  /** Label do botão (string ou ReactNode) */
  label?: React.ReactNode;
  /** Ícone opcional */
  icon?: React.ReactNode;
  /** Texto exibido durante o loading */
  loadingLabel?: string;
}

/**
 * Botão com estado de carregamento integrado e suporte a ícones.
 */
export const LoadingButton: React.FC<LoadingButtonProps> = ({
  onClick,
  loading = false,
  label = "Enviar",
  variant = "primary",
  size,
  disabled = false,
  icon = null,
  className = "",
  loadingLabel = "Carregando...",
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled || loading}
      onClick={onClick}
      className={`loading-button ${className}`}
      style={{ cursor: loading ? "not-allowed" : "pointer" }}
      {...props}
    >
      {loading ? (
        <div className="align-items-center">
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="me-2"
          />
          <span>{loadingLabel}</span>
        </div>
      ) : (
        <div className="align-items-center">
          {icon && <span className="me-2 d-flex">{icon}</span>}
          <span>{label}</span>
        </div>
      )}
    </Button>
  );
};

export default LoadingButton;
