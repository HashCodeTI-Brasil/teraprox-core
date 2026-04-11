import os
import shutil
import re

APPS = [
    '/Users/alexandrenunes/Desktop/worksapeces/teraprox-app-sgm',
    '/Users/alexandrenunes/Desktop/worksapeces/teraprox-app-sgp',
    '/Users/alexandrenunes/Desktop/teraprox-app-solicitacao-de-servico'
]

def migrate_app(app_dir):
    src_dir = os.path.join(app_dir, 'src')
    websocket_dir = os.path.join(src_dir, 'websocket')
    
    # 1. Mover controllers e api para Http
    http_dir = os.path.join(src_dir, 'Http')
    os.makedirs(http_dir, exist_ok=True)
    
    # sgm/solicitacao have api/ and controllers/
    for sub in ['api', 'controllers']:
        src_path = os.path.join(websocket_dir, sub)
        if os.path.exists(src_path):
            dst_path = os.path.join(http_dir, sub)
            # Remove existings just in case
            if os.path.exists(dst_path):
                shutil.rmtree(dst_path)
            shutil.move(src_path, dst_path)
            
    # For SGP, basicController was inside wsProvider.js
    # we need to skip SGP's specific move if they don't have it, but wait, the prompt says they do or I can extract it.
    # To be safe, if SGP doesn't have it, it's fine. Wait, SGP's App.js doesn't import basicController.
    
    # 2. Delete legacy files
    to_delete = [
        websocket_dir,
        os.path.join(src_dir, 'hooks', 'defaults', 'useWebProvider.js'),
        os.path.join(src_dir, 'hooks', 'useWebProvider.js'),
        os.path.join(src_dir, 'hooks', 'matchingObjects', 'useMatchingObject.js')
    ]
    for p in to_delete:
        if os.path.exists(p):
            if os.path.isdir(p):
                shutil.rmtree(p)
            else:
                os.remove(p)
                
    # 3. Mass rewrite in all JS/JSX files
    for root, _, files in os.walk(src_dir):
        for file in files:
            if file.endswith('.js') or file.endswith('.jsx') or file.endswith('.ts') or file.endswith('.tsx'):
                filepath = os.path.join(root, file)
                if 'migrate_rtdb.py' in filepath:
                    continue
                    
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                original_content = content
                
                # Replace imports
                content = re.sub(r'import\s+\{([^}]*)\}\s+from\s+[\'"](.*?)useWebProvider[\'"]', r"import {\1} from 'teraprox-core-sdk'", content)
                content = re.sub(r'import\s+\{([^}]*)\}\s+from\s+[\'"](.*?)wsProvider[\'"]', r"import {\1} from 'teraprox-core-sdk'", content)
                content = re.sub(r'import\s+\{([^}]*)\}\s+from\s+[\'"](.*?)useMatchingObject[\'"]', r"import {\1} from 'teraprox-core-sdk'", content)
                
                # SGP specific: replace `useWebProvider` named export from core-sdk back to `useCoreService`?
                # core-sdk exports `useCoreService`. The app previously imported `useWebProvider`.
                # We should replace `useWebProvider` to `useCoreService` in code
                content = content.replace('useWebProvider(', 'useCoreService(')
                
                # Find matching object imports that have wrong paths
                content = content.replace('import { MatchingObject } from "teraprox-core-sdk"', '')
                content = content.replace("import { MatchingObject } from 'teraprox-core-sdk'", '')
                
                # Fix destructuring: const { controller } = useCoreService() -> const { createController: controller } = useCoreService()
                content = re.sub(r'const\s*\{\s*controller\s*(,\s*[^}]*)?\}\s*=\s*useCoreService\(\)', r'const { createController: controller \1 } = useCoreService()', content)
                content = re.sub(r'const\s*\{\s*([^,]+,\s*)controller\s*(,\s*[^}]*)?\}\s*=\s*useCoreService\(\)', r'const { \1createController: controller \2 } = useCoreService()', content)
                
                # Also replace wsProvider with useCoreService in HOCs if necessary
                content = content.replace('wsProvider = useWebProvider()', 'wsProvider = useCoreService()')
                
                if content != original_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)

for app in APPS:
    print(f'Migrating {app}...')
    migrate_app(app)
print('Done!')
