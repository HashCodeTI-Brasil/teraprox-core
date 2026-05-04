import React from 'react';
import { Role as Role$1, Setor as Setor$1, User as User$1 } from 'teraprox-core-sdk';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    /** sm | md | lg — width control */
    size?: 'sm' | 'md' | 'lg';
}
/** Modal cru sem deps externas — backdrop + container + escape key + focus trap básico. */
declare const Modal: React.FC<ModalProps>;

interface AvatarProps {
    name: string;
    size?: 'sm' | 'md' | 'lg';
}
/** Avatar com iniciais e cor estável derivada do nome. */
declare const Avatar: React.FC<AvatarProps>;

type RoleValue = 'OWNER' | 'ADMIN' | 'USER' | 'PLANNER' | 'EXECUTIONER';
declare const ROLE_VALUES: ReadonlyArray<RoleValue>;
interface RolePillProps {
    role: string | null | undefined;
    size?: 'xs' | 'sm';
}
declare const RolePill: React.FC<RolePillProps>;

/**
 * Tipos do dominio SGU consumidos pelos componentes deste pacote.
 *
 * Sprint 3 fase B (EX5 sgu-screens) — EX3 ja re-exportou os tipos
 * `User/Role/Setor/Permission/Empresa` do barrel raiz do core-sdk
 * (`packages/core-sdk/src/index.ts`), entao trocamos o mirror local
 * pela re-exportacao oficial. Isso elimina o risco de drift entre os
 * shapes apresentacionais e os shapes consumidos pelos Adapters Redux.
 *
 * Notas pos-rebase:
 *  - Adicionamos `_fullName?: string` em `User` como aumento opcional
 *    apresentacional (nao ha equivalente no domain — campo derivado
 *    usado por `UserCard`/`UserList` para highlight de busca).
 *  - `PermissionComponent` ganha `key?` e `_fatherKey?` opcionais como
 *    extensao apresentacional (injetadas pelo hook `usePermissionLogic`
 *    deste pacote). O domain do core-sdk tipa via `[key: string]: unknown`,
 *    entao a augmentation e safe.
 */

type Role = Role$1;
type Setor = Setor$1;
/** Augmentation apresentacional — campo `_fullName` derivado para UI. */
interface User extends User$1 {
    /** Campo derivado usado pela UI atual (firstName + lastName). */
    _fullName?: string;
}

interface UserTableProps {
    users: User[];
    isLoading?: boolean;
    onEditUser?: (user: User) => void;
    onDeleteUser?: (user: User) => void;
    onCreateUser?: () => void;
    onInviteByEmail?: () => void;
    /** Show breadcrumb/subtitle next to title */
    subtitle?: string;
    className?: string;
}
/** Tabela densa estilo Linear/Notion — toolbar embedded + empty state + role filter pills. */
declare const UserTable: React.FC<UserTableProps>;

interface UserFormValues {
    firstName: string;
    lastName: string;
    email: string;
    contact?: string;
    role?: RoleValue | null;
    setorId?: number | string | null;
    active?: boolean;
}
interface UserFormProps {
    initialUser?: User | null;
    setores?: Setor[];
    mode?: 'create' | 'edit' | 'auto';
    onSubmit: (values: UserFormValues) => void;
    onCancel?: () => void;
    onDelete?: (user: User) => void;
    errorMessage?: string | null;
    disabled?: boolean;
    className?: string;
}
/** Form de usuário — role é enum string fixo (5 valores), setor é select. */
declare const UserForm: React.FC<UserFormProps>;

interface SetorTableProps {
    setores: Setor[];
    isLoading?: boolean;
    onEdit?: (setor: Setor) => void;
    onDelete?: (setor: Setor) => void;
    onCreate?: () => void;
    /** Quantos usuários cada setor possui (lookup por id). Opcional. */
    userCountBySetorId?: Record<string | number, number>;
    className?: string;
}
/** Tabela de setores — mesma linguagem visual que UserTable. */
declare const SetorTable: React.FC<SetorTableProps>;

interface SetorFormValues {
    nome: string;
    descricao?: string;
}
interface SetorFormModalProps {
    open: boolean;
    onClose: () => void;
    /** Se passado, modal entra em modo edição. */
    initial?: Setor | null;
    onSubmit: (values: SetorFormValues, original?: Setor | null) => Promise<void> | void;
    onDelete?: (setor: Setor) => Promise<void> | void;
    errorMessage?: string | null;
}
/** Modal inline para criar/editar setor — 2 campos (nome + descrição). */
declare const SetorFormModal: React.FC<SetorFormModalProps>;

export { Avatar, type AvatarProps, Modal, type ModalProps, ROLE_VALUES, type Role, RolePill, type RolePillProps, type RoleValue, type Setor, SetorFormModal, type SetorFormModalProps, type SetorFormValues, SetorTable, type SetorTableProps, type User, UserForm, type UserFormProps, type UserFormValues, UserTable, type UserTableProps };
