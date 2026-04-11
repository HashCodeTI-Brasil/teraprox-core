import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { GrCheckmark, GrClose } from "react-icons/gr";

export interface ApproveAndReproveButtonsProps {
  /** Tamanho dos ícones (padrão: 25) */
  buttonSize?: number;
  /** Callback para aprovação */
  approveCallback: () => void;
  /** Callback para reprovação */
  reproveCallback: () => void;
  /** Callback para cancelamento (ao pressionar ESC) */
  cancelCallback: () => void;
  /** Texto opcional do cabeçalho */
  headerText?: string;
  /** Texto opcional do botão de aprovação */
  approveText?: string;
  /** Texto opcional do botão de reprovação */
  repproveText?: string;
}

/**
 * Componente de botões de Aprovação e Reprovação (Check e Close).
 */
export const ApproveAndReproveButtons: React.FC<ApproveAndReproveButtonsProps> = ({
  buttonSize = 25,
  approveCallback,
  reproveCallback,
  cancelCallback,
  headerText = "Aprovar?",
  approveText,
  repproveText,
}) => {
  useEffect(() => {
    const keyboardHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cancelCallback();
      }
    };
    window.document.addEventListener("keydown", keyboardHandler);
    return () => window.document.removeEventListener("keydown", keyboardHandler);
  }, [cancelCallback]);

  return (
    <div>
      <strong>{headerText}</strong>
      <br />
      <Button onClick={approveCallback} variant="success" className="me-1">
        {approveText ? approveText : <GrCheckmark size={buttonSize} />}
      </Button>
      <Button onClick={reproveCallback} variant="danger">
        {repproveText ? repproveText : <GrClose size={buttonSize} />}
      </Button>
    </div>
  );
};

export default ApproveAndReproveButtons;
