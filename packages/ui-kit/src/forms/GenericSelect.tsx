import React, { useEffect, useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'

export interface GenericSelectProps {
  noLabel?: boolean
  title?: string
  onChange: (value: any) => void
  ops?: any[]
  selection?: any
  returnType?: string
  displayType?: string
  filter?: string
  filterField?: string
  valueType?: string
  loadFunc?: () => Promise<any>
  loadCondition?: boolean
  actionClick?: () => React.ReactNode
  locked?: boolean
  isBold?: boolean
  default?: string
}

export class GenericSelectOps {
  noLabel?: boolean
  title?: string
  onChange?: (value: any) => void
  ops?: any[]
  selection?: any
  returnType?: string
  displayType?: string
  filter?: string
  filterField?: string
  valueType?: string
  loadFunc?: () => Promise<any>
  loadCondition?: boolean
  actionClick?: () => React.ReactNode
  locked?: boolean

  constructor(
    noLabel?: boolean,
    title?: string,
    onChange?: (value: any) => void,
    ops?: any[],
    selection?: any,
    returnType?: string,
    displayType?: string,
    filter?: string,
    filterField?: string,
    valueType?: string,
    loadFunc?: () => Promise<any>,
    loadCondition?: boolean,
    actionClick?: () => React.ReactNode,
    locked?: boolean,
  ) {
    this.noLabel = noLabel
    this.title = title
    this.onChange = onChange
    this.ops = ops
    this.selection = selection
    this.returnType = returnType
    this.displayType = displayType
    this.filter = filter
    this.filterField = filterField
    this.valueType = valueType
    this.loadFunc = loadFunc
    this.loadCondition = loadCondition
    this.actionClick = actionClick
    this.locked = locked
  }
}

const GenericSelect: React.FC<GenericSelectProps> = ({
  noLabel,
  title,
  onChange,
  ops,
  selection,
  returnType,
  displayType,
  filter,
  filterField,
  valueType,
  loadFunc,
  loadCondition = true,
  actionClick,
  locked,
  isBold,
  ...restProps
}) => {
  const [options, setOptions] = useState<any[]>(ops || [])

  useEffect(() => {
    const loadFunction = async () => {
      if (loadCondition && loadFunc) {
        loadFunc().then((res: any) => {
          let newOps = res.content ? res.content : res
          if (filter && filterField) {
            newOps = res.filter((op: any) => op[filterField] == filter)
          }
          setOptions(newOps)
        })
      }
    }

    loadFunction().catch((error: any) => console.log(error))
  }, [loadCondition])

  const getTrueValue = (clickedIndex: number) => {
    const returnValue = options.filter((_op: any, index: number) => index == clickedIndex - 1)[0]
    if (returnType == 'index') {
      onChange(clickedIndex)
    } else if (returnType) {
      onChange(returnValue[returnType])
    } else {
      onChange(returnValue)
    }
  }

  const defaultPlaceholder = (restProps as any)?.default || 'Seleciona uma Opção'

  const selectContent = (
    <Form.Control
      disabled={locked}
      as="select"
      value={selection}
      onChange={(event: any) => getTrueValue(event.target.selectedIndex)}
    >
      <option value={undefined as any} key={0}>
        -- {defaultPlaceholder} --
      </option>
      {options?.length > 0 &&
        options.map((op: any, index: number) => {
          const val = (valueType && op[valueType]) || op.id || op
          let fill = (displayType && op[displayType]) || op
          if (typeof fill == 'object') fill = ''
          return (
            <option value={val} key={op.id || index}>
              {fill}
            </option>
          )
        })}
    </Form.Control>
  )

  if (actionClick) {
    return (
      <>
        <Form.Label style={{ fontWeight: isBold ? 'bold' : undefined }} hidden={noLabel}>
          {title}
        </Form.Label>
        <InputGroup>
          {selectContent}
          {actionClick()}
        </InputGroup>
      </>
    )
  }

  return (
    <>
      <Form.Label style={{ fontWeight: isBold ? 'bold' : undefined }} hidden={noLabel}>
        {title}
      </Form.Label>
      {selectContent}
    </>
  )
}

export default GenericSelect
