// FIXME(tech-lead): mudar para '@hashcodeti/ui-kit-core' após barrel raiz atualizar
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '@hashcodeti/ui-kit-core'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@hashcodeti/ui-kit-core'

const meta: Meta<typeof DropdownMenu> = {
  title: 'primitives/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: {
    a11y: { test: 'error' },
    layout: 'centered',
  },
}
export default meta

type Story = StoryObj<typeof DropdownMenu>

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Abrir menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent align="start">
          <DropdownMenuItem>Editar</DropdownMenuItem>
          <DropdownMenuItem>Duplicar</DropdownMenuItem>
          <DropdownMenuItem>Arquivar</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>Excluir (sem permissão)</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  ),
}

export const WithCheckboxItems: Story = {
  render: () => {
    const [showStatus, setShowStatus] = useState(true)
    const [showOwner, setShowOwner] = useState(false)
    const [showDate, setShowDate] = useState(true)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">Colunas visíveis</Button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Mostrar</DropdownMenuLabel>
            <DropdownMenuCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>
              Status
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={showOwner} onCheckedChange={setShowOwner}>
              Responsável
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={showDate} onCheckedChange={setShowDate}>
              Data
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    )
  },
}

export const WithRadioGroup: Story = {
  render: () => {
    const [sort, setSort] = useState('asc')
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">Ordenar</Button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Direção</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
              <DropdownMenuRadioItem value="asc">Crescente</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="desc">Decrescente</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="recent">Recentes</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    )
  },
}

export const WithSubmenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Mais ações</Button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent align="start">
          <DropdownMenuItem>Visualizar</DropdownMenuItem>
          <DropdownMenuItem>Editar</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Compartilhar</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Copiar link</DropdownMenuItem>
                <DropdownMenuItem>Enviar por email</DropdownMenuItem>
                <DropdownMenuItem>Enviar por WhatsApp</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Excluir</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  ),
}

export const WithLabelAndSeparator: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Conta</Button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Cobrança</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Time</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>Membros</DropdownMenuItem>
            <DropdownMenuItem>Convites</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Sair</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <DropdownMenu key={size}>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">size={size}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent size={size} align="start">
              <DropdownMenuLabel>Size {size}</DropdownMenuLabel>
              <DropdownMenuItem>Editar</DropdownMenuItem>
              <DropdownMenuItem>Duplicar</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Excluir</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      ))}
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="text-sm text-neutral-600">
          Estado: <strong>{open ? 'aberto' : 'fechado'}</strong>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setOpen((v) => !v)}>Toggle externo</Button>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Trigger controlado</Button>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onSelect={() => setOpen(false)}>Fechar</DropdownMenuItem>
                <DropdownMenuItem>Item 2</DropdownMenuItem>
                <DropdownMenuItem>Item 3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
        </div>
      </div>
    )
  },
}

export const FullExample: Story = {
  render: () => {
    const [bookmarks, setBookmarks] = useState(true)
    const [urls, setUrls] = useState(false)
    const [view, setView] = useState('grid')
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">Opções</Button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent size="lg" align="start">
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Perfil <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Cobrança <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Configurações <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Visualização</DropdownMenuLabel>
            <DropdownMenuCheckboxItem checked={bookmarks} onCheckedChange={setBookmarks}>
              Mostrar favoritos
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={urls} onCheckedChange={setUrls}>
              Mostrar URLs completas
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Layout</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={view} onValueChange={setView}>
              <DropdownMenuRadioItem value="grid">Grade</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="list">Lista</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="kanban">Kanban</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Mais ferramentas</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Salvar página como…</DropdownMenuItem>
                  <DropdownMenuItem>Criar atalho…</DropdownMenuItem>
                  <DropdownMenuItem>Nomear janela…</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Ferramentas do desenvolvedor</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Sair <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    )
  },
}
