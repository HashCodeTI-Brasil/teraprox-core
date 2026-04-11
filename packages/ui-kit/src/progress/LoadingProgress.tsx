import React from 'react';
import { Spinner } from 'react-bootstrap';

export interface LoadingProgressProps {
  hidden?: boolean;
}

/**
 * Componente de indicador de carregamento (Spinner) padronizado.
 */
export const LoadingProgress: React.FC<LoadingProgressProps> = ({ hidden }) => {
  return (
    <Spinner hidden={hidden} animation="border" role="status">
      <span className="visually-hidden">Carregando...</span>
    </Spinner>
  );
};

export default LoadingProgress;
