import React from "react";
export interface ImageData {
    key: string;
    author?: string;
    signedUrl?: string;
    dataContext?: string;
    dataId?: string | number;
}
export interface ImageViewModalProps {
    /** Se o modal está aberto */
    show: boolean;
    /** Callback para fechar */
    onHide: () => void;
    /** Lista de imagens disponíveis para visualização */
    imagesData: ImageData[];
    /** Imagem inicial selecionada */
    initialImageData?: ImageData;
    /** Texto alternativo para a imagem */
    imageAltText?: string;
    /** Callback para resolver a URL final da imagem caso não tenha signedUrl */
    resolveImageUrl?: (key: string) => string;
}
/**
 * Modal especializado para visualização de uma ou mais imagens com seletor de galeria.
 */
export declare const ImageViewModal: React.FC<ImageViewModalProps>;
export default ImageViewModal;
