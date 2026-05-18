// @ts-nocheck
import React from 'react'
import { Card, CardHeader, CardBody } from '@hashcodeti/ui-kit-core'
import { BsGear, BsClock } from 'react-icons/bs'

/**
 * OrdemInfoCard — Wave G.1 promotion (secundário) de
 * teraprox-SGM-OM/Components/OrdemInfoCard.js.
 *
 * Card de exibição de metadados gerais + sistema de uma Ordem de
 * Manutenção. Pure display, sem Redux/router. `formatDate` é injetado
 * pelo consumer para preservar locale/timezone do shell.
 */

export interface OrdemInfoCardOrdem {
  id?: number | string
  descricao?: string | null
  setor?: string | null
  criadoPor?: string | null
  encerradoPor?: string | null
  dataDeInicio?: string | Date | null
  dataDeFim?: string | Date | null
  tempoPrevisto?: number | string | null
  createdAt?: string | Date | null
  updatedAt?: string | Date | null
}

export interface OrdemInfoCardProps {
  ordem: OrdemInfoCardOrdem
  formatDate: (value: string | Date | null | undefined) => string
  className?: string
}

const Field: React.FC<{ label: string; children: React.ReactNode; className?: string }> = ({
  label,
  children,
  className,
}) => (
  <div className={className ?? 'mb-3'}>
    <strong className="mb-2 block">{label}</strong>
    <p className="mb-0">{children}</p>
  </div>
)

export const OrdemInfoCard: React.FC<OrdemInfoCardProps> = ({ ordem, formatDate, className }) => (
  <Card className={className ?? 'mb-4'}>
    <CardHeader>
      <h5 className="mb-0 flex items-center gap-2 text-base font-semibold">
        <BsGear />
        Informações Gerais
      </h5>
    </CardHeader>
    <CardBody className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <Field label="Descrição:" className="mb-3 md:col-span-2">
          {ordem.descricao || 'Sem descrição'}
        </Field>

        <Field label="Setor:">{ordem.setor}</Field>
        <Field label="Criado por:">{ordem.criadoPor}</Field>

        {ordem.encerradoPor && <Field label="Encerrado por:">{ordem.encerradoPor}</Field>}

        <Field label="Data de Início:">{formatDate(ordem.dataDeInicio)}</Field>
        <Field label="Data de Fim:">{formatDate(ordem.dataDeFim)}</Field>

        {ordem.tempoPrevisto && (
          <Field label="Tempo Previsto:">{ordem.tempoPrevisto} horas</Field>
        )}
      </div>

      <hr className="my-4 border-surface-border" />
      <h6 className="mb-3 flex items-center gap-2 text-sm text-neutral-500">
        <BsClock />
        Informações do Sistema
      </h6>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 text-neutral-500">
        <Field label="ID:" className="mb-2">#{ordem.id}</Field>
        <Field label="Versão:" className="mb-2">1.0</Field>
        <Field label="Criada em:" className="mb-2 md:col-span-2">
          {formatDate(ordem.createdAt)}
        </Field>
        <Field label="Última atualização:" className="md:col-span-2">
          {formatDate(ordem.updatedAt)}
        </Field>
      </div>
    </CardBody>
  </Card>
)

export default OrdemInfoCard
