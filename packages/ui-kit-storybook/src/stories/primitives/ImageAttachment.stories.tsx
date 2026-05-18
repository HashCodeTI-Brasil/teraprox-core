import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { ImageAttachment } from '@hashcodeti/ui-kit-core'

const meta: Meta<typeof ImageAttachment> = {
  title: 'primitives/ImageAttachment',
  component: ImageAttachment,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof meta>

const Controlled = (
  props: Omit<React.ComponentProps<typeof ImageAttachment>, 'onAttachments'>,
) => {
  const [files, setFiles] = useState<File[]>([])
  return (
    <div className="w-[480px] space-y-3">
      <ImageAttachment
        {...props}
        onAttachments={(f) => {
          action('onAttachments')(f.map((x) => x.name))
          setFiles((prev) => [...prev, ...f])
        }}
        onReject={(r) => action('onReject')(r.map((x) => x.name))}
      />
      {files.length > 0 && (
        <ul className="text-sm text-neutral-700">
          {files.map((f, i) => (
            <li key={i}>
              {f.name} ({(f.size / 1024).toFixed(1)} KB)
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export const Default: Story = {
  render: () => <Controlled />,
}

export const ImagesAndPdfOnly: Story = {
  render: () => (
    <Controlled
      acceptedTypes={['image/*', '.pdf']}
      label="Imagens ou PDF (clique ou arraste)"
    />
  ),
}

export const MaxSize2MB: Story = {
  render: () => (
    <Controlled
      maxSize={2 * 1024 * 1024}
      label="Máx. 2 MB por arquivo"
    />
  ),
}

export const SingleFile: Story = {
  render: () => <Controlled multiple={false} label="Selecione 1 arquivo" />,
}

export const Disabled: Story = {
  render: () => <Controlled disabled label="Upload desabilitado" />,
}

export const SizeLg: Story = {
  render: () => <Controlled size="lg" />,
}
