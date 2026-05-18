// FIXME(barrel): este arquivo importa Toast/Toaster do barrel
// `@hashcodeti/ui-kit-core`, mas o Tech Lead ainda precisa adicionar os
// exports correspondentes em `packages/ui-kit-core/src/index.ts`. Até lá, o
// storybook build vai falhar com "Missing specifier" — esperado e bloqueante
// apenas para esta story. Quando barrel for atualizado, este arquivo passa a
// buildar sem nenhuma alteração.
//
// Workaround temporário: deep import abaixo até o barrel ser publicado.
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Button,
  // FIXME(barrel): adicionar exports Toast no src/index.ts do ui-kit-core
  Toaster,
  useToast,
  type ToastTone,
  type ToastSize,
} from '@hashcodeti/ui-kit-core'

// Wrapper p/ stories — cada exemplo precisa do <Toaster /> montado para que
// useToast() funcione. Mantemos Stage local com padding generoso.
const Stage: React.FC<{ children: React.ReactNode; viewportClassName?: string }> = ({
  children,
  viewportClassName,
}) => (
  <div className="relative min-h-[320px] p-8">
    {children}
    <Toaster viewportClassName={viewportClassName} />
  </div>
)

const meta: Meta = {
  title: 'primitives/Toast',
  tags: ['autodocs'],
  parameters: {
    a11y: { test: 'error' },
    layout: 'fullscreen',
  },
}
export default meta

type Story = StoryObj<typeof meta>

// ─── Default ──────────────────────────────────────────────────────────────

const DefaultDemo: React.FC = () => {
  const { toast } = useToast()
  return (
    <Button
      onClick={() =>
        toast({
          title: 'Notificação',
          description: 'Tudo certo por aqui.',
        })
      }
    >
      Disparar toast
    </Button>
  )
}

export const Default: Story = {
  render: () => (
    <Stage>
      <DefaultDemo />
    </Stage>
  ),
}

// ─── AllTones ─────────────────────────────────────────────────────────────

const AllTonesDemo: React.FC = () => {
  const { toast } = useToast()
  const tones: ToastTone[] = ['info', 'success', 'warning', 'error', 'neutral']
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tones.map((tone) => (
        <Button
          key={tone}
          variant={tone === 'error' ? 'danger' : tone === 'neutral' ? 'secondary' : 'primary'}
          onClick={() =>
            toast({
              tone,
              title: `tone="${tone}"`,
              description: `Exemplo de toast no tom ${tone}.`,
            })
          }
        >
          {tone}
        </Button>
      ))}
    </div>
  )
}

export const AllTones: Story = {
  render: () => (
    <Stage>
      <AllTonesDemo />
    </Stage>
  ),
}

// ─── AllSizes ─────────────────────────────────────────────────────────────

const AllSizesDemo: React.FC = () => {
  const { toast } = useToast()
  const sizes: ToastSize[] = ['sm', 'md', 'lg']
  return (
    <div className="flex items-center gap-2">
      {sizes.map((size) => (
        <Button
          key={size}
          onClick={() =>
            toast({
              size,
              tone: 'info',
              title: `size="${size}"`,
              description: 'Comparação de densidade.',
            })
          }
        >
          {size}
        </Button>
      ))}
    </div>
  )
}

export const AllSizes: Story = {
  render: () => (
    <Stage>
      <AllSizesDemo />
    </Stage>
  ),
}

// ─── WithAction ───────────────────────────────────────────────────────────

const WithActionDemo: React.FC = () => {
  const { toast } = useToast()
  return (
    <Button
      onClick={() =>
        toast({
          tone: 'success',
          title: 'Item excluído',
          description: 'Você pode reverter esta ação.',
          duration: 8000,
          action: {
            label: 'Desfazer',
            altText: 'Desfazer exclusão',
            onClick: () =>
              toast({ tone: 'info', title: 'Restaurado', description: 'Item recuperado.' }),
          },
        })
      }
    >
      Excluir item
    </Button>
  )
}

export const WithAction: Story = {
  render: () => (
    <Stage>
      <WithActionDemo />
    </Stage>
  ),
}

// ─── WithLongDescription ─────────────────────────────────────────────────

const WithLongDescriptionDemo: React.FC = () => {
  const { toast } = useToast()
  return (
    <Button
      onClick={() =>
        toast({
          tone: 'warning',
          title: 'Atenção — operação parcial',
          description:
            'A sincronização foi concluída para 7 de 9 itens. Dois registros falharam por conflito de versão e precisam ser revisados manualmente antes da próxima execução.',
          duration: 10000,
        })
      }
    >
      Toast com texto longo
    </Button>
  )
}

export const WithLongDescription: Story = {
  render: () => (
    <Stage>
      <WithLongDescriptionDemo />
    </Stage>
  ),
}

// ─── MultipleStacked ──────────────────────────────────────────────────────

const MultipleStackedDemo: React.FC = () => {
  const { toast } = useToast()
  return (
    <Button
      onClick={() => {
        toast({ tone: 'info', title: 'Toast 1', description: 'Primeira notificação.' })
        toast({ tone: 'success', title: 'Toast 2', description: 'Segunda notificação.' })
        toast({ tone: 'warning', title: 'Toast 3', description: 'Terceira notificação.' })
        toast({ tone: 'error', title: 'Toast 4', description: 'Quarta notificação.' })
      }}
    >
      Disparar 4 toasts
    </Button>
  )
}

export const MultipleStacked: Story = {
  render: () => (
    <Stage>
      <MultipleStackedDemo />
    </Stage>
  ),
}

// ─── ImperativeUseToast ───────────────────────────────────────────────────

const ImperativeDemo: React.FC = () => {
  const { toast, dismiss, toasts } = useToast()
  const [counter, setCounter] = useState(0)
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Button
          onClick={() => {
            const next = counter + 1
            setCounter(next)
            toast({
              tone: 'info',
              title: `Mensagem #${next}`,
              description: 'Disparado via useToast().',
            })
          }}
        >
          Disparar +1
        </Button>
        <Button variant="secondary" onClick={() => dismiss()}>
          Fechar todos
        </Button>
      </div>
      <p className="text-xs text-neutral-600">Ativos: {toasts.filter((t) => t.open).length}</p>
    </div>
  )
}

export const ImperativeUseToast: Story = {
  render: () => (
    <Stage>
      <ImperativeDemo />
    </Stage>
  ),
}

// ─── Controlled (replace by id) ───────────────────────────────────────────

const ControlledDemo: React.FC = () => {
  const { toast, dismiss } = useToast()
  const [progress, setProgress] = useState(0)

  const start = () => {
    setProgress(0)
    let p = 0
    const id = 'progress-controlled'
    const tick = () => {
      p += 25
      setProgress(p)
      toast({
        id,
        tone: p >= 100 ? 'success' : 'info',
        title: p >= 100 ? 'Concluído' : 'Enviando…',
        description: `${p}%`,
        duration: p >= 100 ? 3000 : 60000,
      })
      if (p < 100) setTimeout(tick, 700)
    }
    tick()
    return id
  }

  return (
    <div className="flex items-center gap-2">
      <Button onClick={start}>Iniciar progresso</Button>
      <Button variant="secondary" onClick={() => dismiss('progress-controlled')}>
        Cancelar
      </Button>
      <span className="text-xs text-neutral-600">progress: {progress}%</span>
    </div>
  )
}

export const Controlled: Story = {
  name: 'Controlled (replace by id)',
  render: () => (
    <Stage>
      <ControlledDemo />
    </Stage>
  ),
}
