import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export class ConfigObject {
  dotNotation: string
  style?: React.CSSProperties
  onClick?: () => void
  onBlur?: () => void
  onHideClick?: () => void
  hidden?: boolean
  mapData?: any
  additionalComponents?: (() => React.ReactNode)[]

  constructor(
    dotNotation: string,
    style?: React.CSSProperties,
    onClick?: () => void,
    onBlur?: () => void,
    onHideClick?: () => void,
    hidden?: boolean,
    mapData?: any,
    additionalComponents?: (() => React.ReactNode)[],
  ) {
    this.dotNotation = dotNotation
    this.style = style
    this.onClick = onClick
    this.onBlur = onBlur
    this.onHideClick = onHideClick
    this.hidden = hidden
    this.mapData = mapData
    this.additionalComponents = additionalComponents || []
  }
}

const getRightConfigObjects = (
  currentPropertieMap: string[],
  configObjects?: ConfigObject[],
): ConfigObject[] => {
  const curreDotNotation = currentPropertieMap.join('.')
  if (!configObjects) return []
  return configObjects.filter((configObject) => configObject.dotNotation === curreDotNotation)
}

const getStyle = (configObjects: ConfigObject[]): React.CSSProperties => {
  let styleObject: React.CSSProperties = {}
  configObjects.forEach((configObject) => {
    styleObject = { ...styleObject, ...configObject.style }
  })
  return styleObject
}

const getAdditionalComponentes = (configObjects: ConfigObject[]): (() => React.ReactNode)[] => {
  const components: (() => React.ReactNode)[] = []
  configObjects.forEach((configObject) => {
    if (configObject.additionalComponents) {
      components.push(...configObject.additionalComponents)
    }
  })
  return components
}

const getOnClick = (configObjects: ConfigObject[]) => {
  return () => {
    configObjects.forEach((configObject) => {
      configObject.onClick && configObject.onClick()
    })
  }
}

const buildData = (
  obj: any,
  propertiesMap: string[],
  configObjects: ConfigObject[] | undefined,
  opn: string | null,
  innerArray: boolean,
  dispatch: any,
  isRoot: boolean,
  editButtonRenderer?: (obj: any, location: string | null) => React.ReactNode,
): React.ReactNode => {
  const newPropertiesMap: string[] = []
  if (opn) newPropertiesMap.push(...propertiesMap, opn)
  else newPropertiesMap.push(...propertiesMap)

  const innerConfigs = getRightConfigObjects(newPropertiesMap, configObjects)
  const styles = getStyle(innerConfigs)
  const onClick = getOnClick(innerConfigs)
  const extraComponents = getAdditionalComponentes(innerConfigs)

  if (Array.isArray(obj)) {
    return (
      <Container onClick={onClick} style={{ ...styles }}>
        {opn && (
          <div style={{ textAlign: 'center' }}>
            <strong>{opn}</strong>
          </div>
        )}
        {obj.map((o, index) => {
          const mapCopy = [...newPropertiesMap, `[${index}]`]
          return (
            <Row key={index} style={{ padding: 4, ...styles }}>
              {buildData(o, mapCopy, configObjects, null, true, null, false, editButtonRenderer)}
            </Row>
          )
        })}
      </Container>
    )
  }

  if (typeof obj === 'object' && obj != null) {
    return (
      <Container
        onClick={onClick}
        style={{
          border: innerArray ? 'solid' : undefined,
          borderColor: 'lightgray',
          borderRadius: innerArray ? 4 : 2,
          borderWidth: 1,
          padding: 4,
          ...styles,
        }}
      >
        {opn && <strong>{opn}</strong>}
        {Object.entries(obj).map(([key, value]) =>
          buildData(value, newPropertiesMap, configObjects, key, false, null, false, editButtonRenderer),
        )}
        {extraComponents.length > 0
          ? extraComponents.map((comp, i) => <React.Fragment key={i}>{comp()}</React.Fragment>)
          : isRoot && editButtonRenderer
            ? editButtonRenderer(obj, opn)
            : null}
      </Container>
    )
  }

  return (
    <Col>
      <strong>{opn}: </strong>
      {String(obj)}
    </Col>
  )
}

interface GenericDisplayProps {
  ops?: any[]
  loadFunc?: () => Promise<any>
  configObjects?: ConfigObject[]
  rootName?: string
  context?: string
  /** Optional hook to call on mount/context update. Replaces the app-specific useContextUpdateHandler. */
  onRefresh?: (refreshFunc: () => void) => void
  /** Optional renderer for edit buttons on root objects. */
  editButtonRenderer?: (obj: any, location: string | null) => React.ReactNode
}

const GenericDisplay: React.FC<GenericDisplayProps> = ({
  ops = [],
  loadFunc,
  configObjects,
  rootName,
  context,
  onRefresh,
  editButtonRenderer,
}) => {
  const [innerOptions, setInnerOptions] = useState<any[]>()

  const refreshFunc = () => {
    if (loadFunc) {
      loadFunc().then((res) => {
        if (Array.isArray(res)) {
          setInnerOptions(res)
        } else {
          setInnerOptions([res])
        }
      })
    } else {
      setInnerOptions(ops)
    }
  }

  useEffect(() => {
    if (onRefresh) {
      onRefresh(refreshFunc)
    } else {
      refreshFunc()
    }
  }, [context])

  return (
    <>
      {innerOptions &&
        innerOptions.map((cObj, index) => (
          <Container key={index} style={{ padding: 4, border: 'solid' }}>
            {buildData(cObj, [], configObjects, rootName || null, false, null, true, editButtonRenderer)}
          </Container>
        ))}
    </>
  )
}

export default GenericDisplay
