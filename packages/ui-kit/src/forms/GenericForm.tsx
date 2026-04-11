import React, { useState, useMemo } from 'react'
import { Button, Form } from 'react-bootstrap'

interface SelectOption {
  label: string
  value: string | number
}

interface FieldDefinition {
  label: string
  key: string
  type: 'text' | 'number' | 'select' | 'date' | 'custom-select'
  options?: SelectOption[]
  placeholder?: string
  required?: boolean
}

interface GenericFormProps {
  fields: FieldDefinition[]
  onSubmit: (values: Record<string, any>) => void
  /** Optional custom select renderer. If not provided, custom-select falls back to native select. */
  renderCustomSelect?: (props: {
    label: string
    value: any
    options?: SelectOption[]
    onChange: (value: any) => void
    placeholder?: string
  }) => React.ReactNode
}

const GenericForm: React.FC<GenericFormProps> = ({ fields, onSubmit, renderCustomSelect }) => {
  const [formValues, setFormValues] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (key: string, value: any) => {
    setFormValues({
      ...formValues,
      [key]: value,
    })
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    fields.forEach((field) => {
      if (field.required && !formValues[field.key]) {
        newErrors[field.key] = `${field.label} é obrigatório`
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formValues)
    }
  }

  const renderField = (field: FieldDefinition) => {
    const { label, key, type, options, placeholder } = field
    const value = formValues[key] || ''

    switch (type) {
      case 'text':
      case 'number':
        return (
          <Form.Group key={key} className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              isInvalid={!!errors[key]}
            />
            <Form.Control.Feedback type="invalid">{errors[key]}</Form.Control.Feedback>
          </Form.Group>
        )

      case 'select': {
        const orderedOptions = (options || [])
          .filter((opt) => opt && opt.value !== undefined && opt.label !== undefined)
          .sort((a, b) => a.label.localeCompare(b.label))

        return (
          <Form.Group key={key} className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Select
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              isInvalid={!!errors[key]}
            >
              <option value="">Selecione...</option>
              {orderedOptions.map((option) => (
                <option key={String(option.value)} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors[key]}</Form.Control.Feedback>
          </Form.Group>
        )
      }

      case 'custom-select':
        if (renderCustomSelect) {
          return (
            <div key={key}>
              {renderCustomSelect({
                label,
                value,
                options,
                onChange: (v: any) => handleChange(key, v),
                placeholder,
              })}
              {errors[key] && <div className="invalid-feedback d-block">{errors[key]}</div>}
            </div>
          )
        }
        return null

      case 'date':
        return (
          <Form.Group key={key} className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
              type="date"
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              isInvalid={!!errors[key]}
            />
            <Form.Control.Feedback type="invalid">{errors[key]}</Form.Control.Feedback>
          </Form.Group>
        )

      default:
        return null
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {fields.map((field) => renderField(field))}

      <div className="d-grid">
        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </div>
    </Form>
  )
}

export default GenericForm
