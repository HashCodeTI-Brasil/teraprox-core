# GenericPickerHost — Guia de Migração

**Sprint Wave H.5 — 2026-05-13.**

Substitui o HOC factory `withGenericPicker` (522 LOC) duplicado em:

- `teraprox-SGM-OS/src/Hocs/withGenericPicker.js`
- `teraprox-app-SGM-UTILS/src/Hocs/withGenericPicker.js`

por:

- **Port** `IGenericPickerViewModel` em `teraprox-core-sdk` (viewmodels)
- **View pura** `GenericPickerHost` em `@hashcodeti/ui-kit-core/picker`

A view não conhece Redux. Cada caller (PickerXxx) cria/consome um adapter Redux do
seu MF (encapsulando o `genericPickerReducer` legado, ou um slice novo) e injeta
o `viewModel` na host.

## Antes (HOC factory)

```jsx
// TarefaPicker.js
import withGenericPicker from "../../Hocs/withGenericPicker"
import TarefaForm from "../../Screens/TarefaForm"

function TarefaPicker(props) {
  return <TarefaForm {...props} />
}

export default withGenericPicker(TarefaPicker)
```

Caller pai:

```jsx
<TarefaPicker
  pKey="os-form-tarefas"
  saveOptions={(item, idx, all) => dispatch(addTarefa(item))}
  singlePick={false}
  displayName="Tarefas"
  optionDisplayName="Tarefas selecionadas"
  optionDisplayKey="nome"
  displayButtonName="+ Tarefa"
  opsSelected={tarefas}
  onOptionDelete={(pi, idx, all) => dispatch(setTarefas(all))}
  onOptionEditClick={(pi, idx) => dispatch(beginEditTarefa(idx))}
  onOptionUpdate={(pi, idx, all) => dispatch(updateTarefa(idx, pi))}
  formatationFunc={(pi) => `${pi.nome} (${pi.duracao}min)`}
  deleteDiaologText={({ pi }) => `Remover "${pi.nome}"?`}
  othersProps={{ hideOBS: true }}
/>
```

## Depois (Port + Host + render-props)

```tsx
// TarefaPicker.tsx
import { GenericPickerHost } from '@hashcodeti/ui-kit-core'
import { useGenericPickerAdapter } from '../adapters/useGenericPickerAdapter' // local Redux adapter
import TarefaForm from '../Screens/TarefaForm'

export function TarefaPicker(props) {
  const vm = useGenericPickerAdapter<Tarefa>({
    pickerKey: 'os-form-tarefas',
    initialPicked: props.tarefas,
    onAdd: (item, idx, all) => props.onChange(all),
    onEdit: (item, idx, all) => props.onChange(all),
    onRemove: (item, idx, all) => props.onChange(all),
  })

  return (
    <GenericPickerHost<Tarefa>
      viewModel={vm}
      displayName="Tarefas"
      optionDisplayName="Tarefas selecionadas"
      displayButtonName="+ Tarefa"
      formatItem={(t) => `${t.nome} (${t.duracao}min)`}
      deleteDialogText={({ item }) => `Remover "${item.nome}"?`}
      renderForm={({ onPick, editingItem, onCancel }) => (
        <TarefaForm
          hideOBS
          initialValue={editingItem}
          onSubmit={onPick}
          onCancel={onCancel}
        />
      )}
    />
  )
}
```

## Mapa de propriedades (HOC → Host + Port)

| HOC prop                  | Equivalente novo                                 |
| ------------------------- | ------------------------------------------------ |
| `pKey`                    | `UseGenericPickerOptions.pickerKey`              |
| `singlePick`              | `UseGenericPickerOptions.singlePick`             |
| `displayName`             | `GenericPickerHostProps.displayName`             |
| `optionDisplayName`       | `GenericPickerHostProps.optionDisplayName`       |
| `optionDisplayKey`        | `GenericPickerHostProps.optionDisplayKey`        |
| `displayButtonName`       | `GenericPickerHostProps.displayButtonName`       |
| `hideOptions`             | `GenericPickerHostProps.hideOptions`             |
| `readOnlyMode`            | `GenericPickerHostProps.readOnlyMode`            |
| `showOpsWhenEdit`         | `GenericPickerHostProps.showOptionsWhenEdit`     |
| `opsSelected`             | `UseGenericPickerOptions.initialPicked`          |
| `fetchOpsSelected`        | `UseGenericPickerOptions.fetchPicked`            |
| `saveOptions`             | `UseGenericPickerOptions.onAdd` / `onEdit`       |
| `onOptionDelete`          | `UseGenericPickerOptions.onRemove`               |
| `onOptionEditClick`       | usar `renderItem` ou `renderForm.editingItem`    |
| `onOptionUpdate`          | `UseGenericPickerOptions.onEdit`                 |
| `onSelectedOption`        | `GenericPickerHostProps.onSelectedOption`        |
| `formatationFunc`         | `GenericPickerHostProps.formatItem`              |
| `deleteDiaologText`       | `GenericPickerHostProps.deleteDialogText`        |
| `deleteTitle`             | `GenericPickerHostProps.deleteTitle`             |
| `onPickerOpen`/`Close`    | `onPickerOpen` / `onPickerClose` (preservados)   |
| `clear`                   | obsoleto — caller controla via `onAdd` callback  |
| `clearPickerOptions`      | usar `viewModel.clearAll()`                      |
| `optionComponent`         | `GenericPickerHostProps.renderItem`              |
| `othersProps`             | passar direto via spread em `renderForm`         |
| `containerStyles`         | `containerClassName` + `parentColor`             |
| `outOption`               | obsoleto — controle via `renderForm`             |
| `onBuild`                 | obsoleto — usar `useEffect` no caller            |

## Callers a migrar (Wave I — 12 cross-MF)

SGM-OS:
1. `src/Components/manutencao/TarefaPicker.js`
2. `src/Components/manutencao/AcaoPicker.js`
3. `src/Components/manutencao/ClasseDeRecursoPicker.js`
4. `src/Components/manutencao/JustificativaPicker.js`
5. `src/Components/manutencao/ModoDeFalhaPicker.js`
6. `src/Components/manutencao/TipoDeOrdemPicker.js`
7. `src/Components/manutencao/ClasseDeComponentePicker.js`
8. `src/Components/screens-commons/LimiteDeControlePicker.js`
9. `src/pickers/ComposicaoPicker.js`
10. `src/Screens/InspecaoPicker.tsx`
11. `src/Screens/LimiteDeControleForm.tsx` (uso pontual)

SGM-UTILS:
12. `src/Components/manutencao/ClasseDeComponentePicker.js`

(RecursoModal — citado no roster — é Modal, não picker; fica fora do escopo.)
