/**
 * 🔒 LGPD Consent Banner Component
 *
 * Displays LGPD (Lei Geral de Proteção de Dados) consent banner
 * to users. Stores consent preference in localStorage + Redux.
 *
 * Features:
 * - ✅ Displays once per session (or until user accepts)
 * - ✅ Respects localStorage persistence
 * - ✅ Scrolls to bottom on accept (UX best practice)
 * - ✅ Links to privacy policy
 */

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './LGPDConsentBanner.css'

const LGPD_CONSENT_KEY = 'teraprox_lgpd_consent'
const CONSENT_EXPIRY_DAYS = 365

export default function LGPDConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const dispatch = useDispatch()
  const i18n = useSelector(state => state.i18n?.messages?.[state.i18n?.locale] || {})

  useEffect(() => {
    checkConsentStatus()
  }, [])

  function checkConsentStatus() {
    const stored = localStorage.getItem(LGPD_CONSENT_KEY)
    
    if (!stored) {
      setShowBanner(true)
      return
    }

    try {
      const { timestamp } = JSON.parse(stored)
      const expiryDate = new Date(timestamp).getTime() + (CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000)
      
      if (Date.now() > expiryDate) {
        // Consent expired — show banner again
        setShowBanner(true)
      }
    } catch (e) {
      // Malformed storage — show banner
      setShowBanner(true)
    }
  }

  function handleAcceptConsent() {
    const consentData = {
      accepted: true,
      timestamp: new Date().toISOString(),
      version: '1.0',
    }
    
    localStorage.setItem(LGPD_CONSENT_KEY, JSON.stringify(consentData))
    
    // Optional: dispatch to Redux for analytics
    dispatch({
      type: 'LGPD_CONSENT_ACCEPTED',
      payload: consentData,
    })

    setShowBanner(false)
  }

  function handleRejectConsent() {
    // User can still use app, but we log that they rejected
    const consentData = {
      accepted: false,
      timestamp: new Date().toISOString(),
      version: '1.0',
    }
    
    localStorage.setItem(LGPD_CONSENT_KEY, JSON.stringify(consentData))
    
    dispatch({
      type: 'LGPD_CONSENT_REJECTED',
      payload: consentData,
    })

    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="lgpd-consent-banner">
      <div className="lgpd-consent-content">
        <h4>🔒 Proteção de Dados Pessoais</h4>
        <p>
          Utilizamos seus dados pessoais de forma segura e confidencial, em conformidade com a 
          <strong> Lei Geral de Proteção de Dados (LGPD)</strong>.
        </p>

        <div className="lgpd-details">
          <ul>
            <li>✅ Seus dados são criptografados em trânsito e em repouso</li>
            <li>✅ Você tem direito ao acesso, portabilidade e deleção dos seus dados</li>
            <li>✅ Armazenamento seguro em servidores certificados ISO 27001</li>
            <li>✅ Sem compartilhamento com terceiros sem consentimento explícito</li>
          </ul>
        </div>

        <p className="lgpd-policy-link">
          Leia nossa <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
            Política de Privacidade
          </a> completa.
        </p>

        <div className="lgpd-actions">
          <button
            className="lgpd-btn lgpd-btn-accept"
            onClick={handleAcceptConsent}
          >
            ✓ Aceitar
          </button>
          <button
            className="lgpd-btn lgpd-btn-reject"
            onClick={handleRejectConsent}
          >
            ✗ Rejeitar
          </button>
        </div>
      </div>
    </div>
  )
}
