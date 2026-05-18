import type { Preview } from '@storybook/react'
import React from 'react'

// Bootstrap CSS é necessário porque a maioria dos componentes ui-kit-core
// ainda usa react-bootstrap (Fase 2 substitui por Tailwind+Radix).
import 'bootstrap/dist/css/bootstrap.min.css'

// Tailwind preflight + utilities geradas a partir do preset Teraprox.
import './tailwind.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'muted', value: '#f8fafc' },
        { name: 'dark', value: '#0f172a' },
      ],
    },
    a11y: {
      config: { rules: [] },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-6 min-h-screen bg-surface-background text-surface-foreground">
        <Story />
      </div>
    ),
  ],
}

export default preview
