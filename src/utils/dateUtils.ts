/**
 * 📅 Dayjs Configuration — Teraprox Core
 *
 * Centraliza configuração de locale e plugins dayjs.
 * Todos os módulos devem usar este arquivo ao invés de importar dayjs diretamente.
 *
 * @see https://day.js.org/
 * @see https://day.js.org/docs/en/locale/locale
 */

import dayjs from 'dayjs'

// Importar locales
import 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import weekday from 'dayjs/plugin/weekday'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isBetween from 'dayjs/plugin/isBetween'

/**
 * 🌍 Registrar plugins
 */
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(weekday)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(isBetween)

/**
 * 🇧🇷 Definir locale padrão para português brasileira
 */
export function initializeDayjs(locale: string = 'pt-br', timezone?: string) {
  dayjs.locale(locale)
  
  if (timezone) {
    dayjs.tz.setDefault(timezone)
  } else {
    // São Paulo timezone como padrão
    dayjs.tz.setDefault('America/Sao_Paulo')
  }
  
  console.log(`📅 Dayjs configurado: locale=${locale}, timezone=${dayjs.tz.guess()}`)
}

/**
 * 📋 Formatos padrão Teraprox
 */
export const DATE_FORMATS = {
  // Displays
  display: 'DD/MM/YYYY',
  displayFull: 'DD/MM/YYYY HH:mm:ss',
  displayTime: 'HH:mm:ss',
  displayShort: 'DD/MM',
  
  // ISO/API
  iso: 'YYYY-MM-DD',
  isoFull: 'YYYY-MM-DDTHH:mm:ss',
  
  // Relatórios
  report: 'DD/MM/YYYY HH:mm',
  reportMonthYear: 'MMMM YYYY',
  
  // Legacy compat
  legacy: 'DD-MM-YYYY'
}

/**
 * ⏰ Funções helper padrão
 */
export const dateUtils = {
  /**
   * Formatar data para exibição (DD/MM/YYYY)
   */
  format(date: dayjs.ConfigType, format: string = DATE_FORMATS.display): string {
    return dayjs(date).format(format)
  },

  /**
   * Obter data atual em São Paulo
   */
  now(): dayjs.Dayjs {
    return dayjs().tz('America/Sao_Paulo')
  },

  /**
   * Diference entre duas datas em dias
   */
  daysBetween(date1: dayjs.ConfigType, date2: dayjs.ConfigType): number {
    return dayjs(date2).diff(dayjs(date1), 'day')
  },

  /**
   * Adicitar dias a uma data
   */
  addDays(date: dayjs.ConfigType, days: number): dayjs.Dayjs {
    return dayjs(date).add(days, 'day')
  },

  /**
   * Verificar se data é válida
   */
  isValid(date: dayjs.ConfigType): boolean {
    return dayjs(date).isValid()
  },

  /**
   * Comparar se data1 é antes de data2
   */
  isBefore(date1: dayjs.ConfigType, date2: dayjs.ConfigType): boolean {
    return dayjs(date1).isBefore(dayjs(date2))
  },

  /**
   * Comparar se data1 é depois de data2
   */
  isAfter(date1: dayjs.ConfigType, date2: dayjs.ConfigType): boolean {
    return dayjs(date1).isAfter(dayjs(date2))
  },

  /**
   * Obter início do mês
   */
  startOfMonth(date?: dayjs.ConfigType): dayjs.Dayjs {
    return dayjs(date).startOf('month')
  },

  /**
   * Obter fim do mês
   */
  endOfMonth(date?: dayjs.ConfigType): dayjs.Dayjs {
    return dayjs(date).endOf('month')
  },

  /**
   * Obter nome do mês em português
   */
  getMonthName(monthIndex: number): string {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]
    return months[monthIndex] || ''
  },

  /**
   * Obter nome do dia da semana em português
   */
  getDayName(dayIndex: number): string {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    return days[dayIndex] || ''
  }
}

/**
 * 🔧 Inicializar ao importar
 */
if (typeof window !== 'undefined') {
  // Browser environment
  initializeDayjs()
}

export default dayjs
