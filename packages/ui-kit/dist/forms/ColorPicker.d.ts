import React from "react";
export interface ColorPickerProps {
    /** Cor selecionada atualmente */
    selectedColor: string;
    /** Callback para quando a cor muda */
    onColorChange: (color: string) => void;
    /** Lista de cores sugeridas para a paleta rápida */
    presetColors?: string[];
    /** Título do componente (padrão: 'Cor de Identificação') */
    title?: string;
}
/**
 * Seletor de cores com preview e paleta de cores pré-definidas.
 */
export declare const ColorPicker: React.FC<ColorPickerProps>;
export default ColorPicker;
