import React from 'react';
import { FloatingLabel, Form, InputGroup, FormControlProps } from 'react-bootstrap';

export interface FormFieldProps {
  /** Valor do campo */
  val?: string | number;
  /** Callback quando o valor muda */
  onValueUpdate?: (val: string, event: React.ChangeEvent<any>) => void;
  /** Callback no blur */
  onBlur?: (val: string, event: React.FocusEvent<any>) => void;
  /** Label exibida acima do input (top) ou dentro como FloatingLabel */
  label?: string;
  /**
   * Posicao da label:
   *  - 'top'      (default): label como elemento separado acima do control
   *  - 'floating'          : comportamento Bootstrap FloatingLabel wrapping
   * Default 'top' alinhado com auditoria browser /os/form (Wave 5A fix).
   */
  labelPosition?: 'top' | 'floating';
  /** Tipo do input (text, number, password, etc) */
  ty?: string;
  /** Callback para botão de ação à direita */
  actionClick?: () => React.ReactNode;
  /** Callback para segundo botão de ação à direita */
  actionClick2?: () => React.ReactNode;
  /** Referência para o input */
  reference?: React.Ref<any>;
  /** Outros props para o Form.Control */
  others?: any;
  /** Objeto de estilo customizado para o container */
  styleObj?: React.CSSProperties;
  /** Se o campo está bloqueado/desabilitado */
  locked?: boolean;
  /** Se o campo deve ser escondido */
  hide?: boolean;
  /** Callback no mouse leave */
  onMouseLv?: () => void;
  /** Callback ao pressionar Enter */
  onEnterPress?: (val: string) => void;
  /** Classe CSS customizada */
  className?: string;
  /** Se o estado é inválido */
  isInvalid?: boolean;
  /** Mensagem de erro/feedback */
  feedback?: string;
  /** Callback no foco */
  onFocus?: (val: string) => void;
  /** Número de linhas para textarea */
  rows?: number;
  /** Se deve renderizar como textarea */
  asTextArea?: boolean;
  /** ID único para o controle */
  controlId?: string;
}

/**
 * Campo de formulário padronizado com suporte a label-top (default) ou
 * FloatingLabel, mais botões de ação laterais.
 *
 * Wave 5A fix (sprint 2026-04-21-ui-kit-domain-split-wave0): default de
 * `labelPosition` e 'top' para alinhar com padrao visual auditado no browser.
 * Callers que dependem explicitamente de FloatingLabel devem passar
 * `labelPosition="floating"`.
 */
export const FormField: React.FC<FormFieldProps> = ({
  val,
  onValueUpdate,
  onBlur,
  label,
  labelPosition = 'top',
  ty,
  actionClick,
  actionClick2,
  reference,
  others,
  styleObj,
  locked,
  hide,
  onMouseLv,
  onEnterPress,
  className,
  isInvalid,
  feedback,
  onFocus,
  rows,
  asTextArea,
  controlId,
}) => {
  const onKeyDownHandler = (event: React.KeyboardEvent<any>) => {
    if (event.code === 'Enter' || event.key === 'Enter') {
      onEnterPress && onEnterPress((event.target as HTMLInputElement).value);
    }
  };

  const onFocusHandler = (value: string) => {
    onFocus && onFocus(value);
  };

  const renderField = () => {
    const fieldProps: any = {
      autoComplete: 'off',
      isInvalid,
      className,
      ...others,
      onBlur: (event: React.FocusEvent<HTMLInputElement>) => onBlur && onBlur(event.target.value, event),
      disabled: locked,
      style: styleObj,
      ref: reference,
      placeholder: others?.placeholder || label,
      type: ty || 'text',
      value: val ?? '',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => onValueUpdate && onValueUpdate(event.target.value, event),
    };

    if (asTextArea) {
      fieldProps.as = 'textarea';
      fieldProps.rows = rows || 3;
    }

    return <Form.Control {...fieldProps} />;
  };

  if (hide) return null;

  // Textarea nunca envolveu com FloatingLabel; respeita apenas 'top' label.
  const useFloating = labelPosition === 'floating' && !asTextArea;

  return (
    <Form.Group
      onFocusCapture={(e) => onFocusHandler((e.target as HTMLInputElement).value)}
      onMouseLeave={onMouseLv}
      onKeyDown={onKeyDownHandler}
      style={{ marginTop: 4, marginBottom: 4, width: '100%' }}
      controlId={!useFloating ? controlId : undefined}
    >
      {!useFloating && label && (
        <Form.Label className="fw-semibold small mb-1">{label}</Form.Label>
      )}
      <InputGroup>
        {useFloating ? (
          <FloatingLabel style={{ zIndex: 0, flex: 1 }} label={label} controlId={controlId || 'floatingInput'}>
            {renderField()}
          </FloatingLabel>
        ) : (
          renderField()
        )}
        {actionClick && actionClick()}
        {actionClick2 && actionClick2()}
      </InputGroup>
      {feedback && isInvalid && <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>{feedback}</Form.Control.Feedback>}
    </Form.Group>
  );
};

export default FormField;
