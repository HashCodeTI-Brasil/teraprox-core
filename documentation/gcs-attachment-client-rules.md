# GCS Attachment System — Client-Side Rules

Rules for rendering, resolving, and managing GCS-hosted file attachments in Teraprox frontend apps (SGP, SGM, Core).

## Architecture

```
GenericImageAttachment (core component)
  ├── apiEndpoint prop ──POST /anexo/signedUrl──> API ──> GCS signed read URL
  ├── resolvedUrls state (cache)
  ├── ModalBasicTemplate (file manager)
  └── ImageViewModal (image preview)
```

---

## 1. Component Location

The canonical source-of-truth is in `teraprox-core`:

```
src/Components/default-components/
  ├── buttons/
  │   └── GenericImageAttachment.js   ← main component
  ├── icons/
  │   └── IconWithBadge.js
  └── modals/
      ├── ModalBasicTemplate.js
      └── ImageViewModal.js
```

SGP and SGM have local copies that additionally include legacy (`endPointWhaleTamer`) fallback for backward compatibility during the migration period.

---

## 2. Required Props

| Prop                | Type       | Required | Description                                         |
|---------------------|------------|----------|-----------------------------------------------------|
| `apiEndpoint`       | `string`   | **Yes**  | Base API URL (e.g. `endPointCaderno`, `endPointManutencao`) |
| `filesData`         | `Object[]` | Yes      | Array of file objects from the API                   |
| `onUpload`          | `Function` | No       | Callback `(file: File) => void` for upload           |
| `onDeleteAttachment`| `Function` | No       | Callback `(file) => void` for delete                 |
| `disableView`       | `boolean`  | No       | Hide view button                                     |
| `disableDownload`   | `boolean`  | No       | Hide download button                                 |
| `disableExclusion`  | `boolean`  | No       | Hide delete button                                   |
| `disableUpload`     | `boolean`  | No       | Hide upload button                                   |

### Usage Example

```jsx
import { endPointCaderno } from "../../models/constantes"

<GenericImageAttachment
  apiEndpoint={endPointCaderno}
  filesData={registro.anexos}
  onUpload={handlePutAnexo}
  onDeleteAttachment={handleDeleteAnexo}
  disableView={!haveAnexos}
  disableDownload={!haveAnexos}
/>
```

---

## 3. URL Resolution Rules

### Signed URL Flow

1. Component mounts/opens → `useEffect` fires
2. For each file missing `signedUrl`, calls `POST {apiEndpoint}anexo/signedUrl` with `{ key }`
3. Response `{ signedUrl }` is cached in `resolvedUrls` state (keyed by `file.key`)
4. Thumbnails, downloads, and preview use the cached URL

### Resolution Priority

```
file.signedUrl          → from API batch read (readAnexosInBatch)
resolvedUrls[file.key]  → from on-demand resolution cache
null                    → URL not yet resolved (shows generic icon)
```

### When URLs Expire

GCS read signed URLs expire after **1 hour**. If a user keeps the page open longer, thumbnails will break. The component resolves fresh URLs each time the manager/preview modal opens.

---

## 4. File Display Rules

### File Name Resolution

Priority order:
1. `file.originalName` — original name from upload (e.g. `foto_obra.jpeg`)
2. `file.name` — alternative name field
3. `{dataContext}-{dataId}.{fileType}` — constructed fallback

### Image Detection

A file is considered an image if:
- `file.contentType` starts with `"image/"`, OR
- `file.fileType` is one of: `png`, `jpg`, `jpeg`, `gif`, `webp`

Non-image files show a generic file icon and trigger download instead of preview.

---

## 5. Data Contract

Files arriving from the API must have this shape:

```typescript
interface AnexoFile {
  id: number
  key: string              // GCS object key
  dataId: number
  dataContext: string
  fileType: string         // extension only: "jpeg", "pdf"
  contentType?: string     // MIME: "image/jpeg"
  originalName?: string    // "foto.jpeg"
  author?: string
  size?: number
  signedUrl?: string       // pre-resolved read URL (optional)
}
```

### Map Key Type Mismatch Warning

`readAnexosInBatch` builds a `Map<string, Anexo[]>`. When attaching anexos to entities:

```typescript
// ✅ Correct — String key matches Map
entity.dataValues.anexos = anexosMap.get(String(entity.id))

// ❌ Wrong — number !== string in Map.get()
entity.dataValues.anexos = anexosMap.get(entity.id)
```

If this is wrong, files arrive at the frontend **without `signedUrl`**, forcing the component to resolve every URL individually.

---

## 6. WebSocket-Pushed Anexos

When a file is uploaded and confirmed, the backend pushes the new anexo to connected clients via WebSocket sentinel. **This payload does NOT include `signedUrl`**.

The component handles this correctly: when the modal opens, it detects files without `signedUrl` and resolves them on demand.

---

## 7. Endpoint Mapping

| App | Endpoint Variable    | Used For                          |
|-----|----------------------|-----------------------------------|
| SGP | `endPointCaderno`    | Registro de campo, ordem de correção |
| SGM | `endPointManutencao` | OS, tarefa, inspeção, solicitação |

Always pass the correct endpoint matching the API that owns the anexo data.

---

## 8. Migration Notes (Legacy → GCS)

During migration, SGP/SGM local copies of `GenericImageAttachment` include fallback to `endPointWhaleTamer` (legacy S3/CloudFront):

```javascript
// Legacy fallback (SGP/SGM local copies only)
`${endPointWhaleTamer}getImage?key=${file.key}&token=${token}`
```

The core version has **no legacy fallback** — it returns `null` if `signedUrl` cannot be resolved. Once migration is complete, SGP/SGM should import from core and remove their local copies.

### Migration Checklist

- [x] GCS bucket CORS configured (PUT, GET, HEAD)
- [x] `AnexoService.confirmUpload()` extracts `fileType` from fileName
- [x] `readAnexosInBatch` Map accessed with `String(id)` in all services
- [x] `GenericImageAttachment` resolves signedUrl on demand
- [x] `ImageViewModal` prefers `signedUrl` over legacy URL
- [x] All callers pass `apiEndpoint` prop
- [ ] Remove `endPointWhaleTamer` fallback from SGP/SGM after full migration
- [ ] Replace SGP/SGM local copies with core component import
