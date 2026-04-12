import React from 'react';
interface ResponsiveContainerProps {
    title?: string;
    show: boolean;
    setShow: (show: boolean) => void;
    children: React.ReactNode;
    onClose?: () => void;
    scrollable?: boolean;
}
/**
 * ResponsiveContainer Component
 *
 * Renders a Modal for displaying content in a responsive container.
 * Previously used GenericOffCanvas for mobile, now uses Modal consistently.
 *
 * @param title - The title of the modal.
 * @param show - Controls the visibility of the modal.
 * @param setShow - Function to update the visibility state.
 * @param children - Content to be rendered inside the modal.
 * @param onClose - Optional function to be executed on close.
 * @param scrollable - Optional prop to enable scrolling the content.
 */
declare const ResponsiveContainer: React.FC<ResponsiveContainerProps>;
export default ResponsiveContainer;
