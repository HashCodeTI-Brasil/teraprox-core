import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { FindRecursoByTagField } from '../forms/FindRecursoByTagField';
import '../styles/RecursoDisplayer.css';

export type RecursoMode = 'manutencao' | 'processo';

export interface RecursoDisplayerProps {
  mode?: RecursoMode;
  controller: any;
  selectedList?: any[];
  onSaveRecurso: (recursos: any[]) => void;
  singleReturn?: boolean;
}

export const RecursoDisplayer: React.FC<RecursoDisplayerProps> = ({
  mode = 'manutencao',
  controller,
  selectedList = [],
  onSaveRecurso,
  singleReturn = false,
}) => {
  const [selectorDisplay, setSelectorDisplay] = useState<'branch' | 'TAG'>('branch');
  const [loading, setLoading] = useState(false);
  const [recursosProcesso, setRecursosProcesso] = useState<any[]>([]);
  const [branchesManutencao, setBranchesManutencao] = useState<any[]>([]);

  // Carregamento inicial baseado no modo
  useEffect(() => {
    let mounted = true;
    const loadInicial = async () => {
      setLoading(true);
      try {
        if (mode === 'manutencao') {
          // Loop infinito / API arvoreEstrutural
          const b = await controller('arvoreEstrutural').get(`branchByBranchLevel/1`);
          if (mounted) setBranchesManutencao(b);
        } else if (mode === 'processo') {
          // Flatten com agrupamento
          const recs = await controller('recurso').readAll();
          if (mounted) setRecursosProcesso(Array.isArray(recs) ? recs : []);
        }
      } catch (err) {
        console.error("Erro ao carregar estrutura do RecursoDisplayer", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadInicial();
    return () => { mounted = false; };
  }, [mode, controller]);

  return (
    <div style={{ width: '100%', padding: 0 }} className="recurso-displayer-generic">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <label className="me-2">Selecionar Recurso Por:</label>
          <Button
            size="sm"
            onClick={() => setSelectorDisplay('branch')}
            variant={selectorDisplay === 'branch' ? 'primary' : 'outline-primary'}
            className="me-1"
          >
             {mode === 'processo' ? 'Agrupamentos' : 'Árvore'}
          </Button>
          <Button
            size="sm"
            onClick={() => setSelectorDisplay('TAG')}
            variant={selectorDisplay === 'TAG' ? 'primary' : 'outline-primary'}
          >
            TAG
          </Button>
        </div>
      </div>

      {loading && <Spinner animation="border" size="sm" />}

      {!loading && selectorDisplay === 'branch' && mode === 'manutencao' && (
         <div className="manutencao-tree-view">
             {/* Renders BranchDropDisplays dynamically simulating the infinite loop */}
             <div className="text-muted small italic">Árvore de Manutenção (Branches/Nodes em Cascata) - Implementação Genérica</div>
         </div>
      )}

      {!loading && selectorDisplay === 'branch' && mode === 'processo' && (
         <div className="processo-group-view">
             {/* Renders grouped resources emulating a single root branch level */}
             <div className="text-muted small italic">Lista de Agrupamentos de Processo (Raiz Única)</div>
         </div>
      )}

      {selectorDisplay === 'TAG' && (
        <FindRecursoByTagField
          callback={(rec: any, checked: boolean) => {
            onSaveRecurso([rec]);
          }}
        />
      )}
    </div>
  );
};

export default RecursoDisplayer;
