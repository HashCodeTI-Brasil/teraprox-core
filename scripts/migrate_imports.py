import os
import re

# Definição das substituições
replacements = [
    # Wave 2: Complex Components
    {
        'import_regex': r'import\s+SaveDeleteButtons\s+from\s+["\'].*\/default-components\/buttons\/SaveDeleteButtons["\']',
        'import_new': "import { ActionButtons } from 'teraprox-ui-kit'",
        'jsx_regex': r'<SaveDeleteButtons',
        'jsx_new': '<ActionButtons'
    },
    {
        'import_regex': r'import\s+DelayedDeleteButton\s+from\s+["\'].*\/default-components\/buttons\/DelayedDeleteButton["\']',
        'import_new': "import { ActionButtons } from 'teraprox-ui-kit'",
        'jsx_regex': r'<DelayedDeleteButton',
        'jsx_new': '<ActionButtons useDelayedDelete'
    },
    {
        'import_regex': r'import\s+AutoComplete\s+from\s+["\'].*\/default-components\/forms\/AutoComplete["\']',
        'import_new': "import { AutoComplete } from 'teraprox-ui-kit'"
    },

    # Wave 3: Batch 1-3
    {
        'import_regex': r'import\s+ApproveAndReproveButtons\s+from\s+["\'].*\/default-components\/buttons\/ApproveAndReproveButtons["\']',
        'import_new': "import { ApproveAndReproveButtons } from 'teraprox-ui-kit'"
    },
    {
        'import_regex': r'import\s+AsyncButton\s+from\s+["\'].*\/default-components\/buttons\/AsyncButton["\']',
        'import_new': "import { AsyncButton } from 'teraprox-ui-kit'"
    },
    {
        'import_regex': r'import\s+LoadingButton\s+from\s+["\'].*\/default-components\/buttons\/LoadingButton["\']',
        'import_new': "import { LoadingButton } from 'teraprox-ui-kit'"
    },
    {
        'import_regex': r'import\s+NavigateButton\s+from\s+["\'].*\/default-components\/buttons\/NavigateButton["\']',
        'import_new': "import { NavigateButton } from 'teraprox-ui-kit'"
    },
    {
        'import_regex': r'import\s+StatusBadge\s+from\s+["\'].*\/default-components\/buttons\/StatusBadge["\']',
        'import_new': "import { StatusBadge } from 'teraprox-ui-kit'"
    },
    {
        'import_regex': r'import\s+FormField\s+from\s+["\'].*\/default-components\/forms\/FormField["\']',
        'import_new': "import { FormField } from 'teraprox-ui-kit'"
    },

    # Wave 4: Divergent & Agnostic
    {
        'import_regex': r'import\s+StatusLight\s+from\s+["\'].*\/default-components\/displays\/StatusLight["\']',
        'import_new': "import { StatusLight } from 'teraprox-ui-kit'"
    },
    {
        'import_regex': r'import\s+TimerDisplay\s+from\s+["\'].*\/default-components\/displays\/TimerDisplay["\']',
        'import_new': "import { TimerDisplay } from 'teraprox-ui-kit'"
    },
    {
        'import_regex': r'import\s+SectorSelector\s+from\s+["\'].*\/default-components\/forms\/SectorSelector["\']',
        'import_new': "import { SectorSelector } from 'teraprox-ui-kit'"
    },
    {
        'import_regex': r'import\s+UnidadeMaterialForm\s+from\s+["\'].*\/default-components\/forms\/UnidadeMaterialForm["\']',
        'import_new': "import { UnidadeMaterialForm } from 'teraprox-ui-kit'"
    },
    {
        'import_regex': r'import\s+NotificationItem\s+from\s+["\'].*\/default-components\/Notifications\/NotificationItem["\']',
        'import_new': "import { NotificationItem } from 'teraprox-ui-kit'"
    },
    {
        'import_regex': r'import\s+NotificationBell\s+from\s+["\'].*\/default-components\/Notifications\/NotificationBell["\']',
        'import_new': "import { NotificationBell } from 'teraprox-ui-kit'"
    },

    # Wave 6: Final Consolidation
    {
        'import_regex': r'import\s+BonusButton\s+from\s+["\'].*\/default-components\/buttons\/BonusButton["\']',
        'import_new': "import { BonusButton } from 'teraprox-ui-kit'"
    },
    {
        'import_regex': r'import\s+ButtonWithDropdown\s+from\s+["\'].*\/default-components\/buttons\/ButtonWithDropdown["\']',
        'import_new': "import { ButtonWithDropdown } from 'teraprox-ui-kit'"
    },
    {
        'import_regex': r'import\s+CheckBox\s+from\s+["\'].*\/default-components\/buttons\/CheckBox["\']',
        'import_new': "import { CheckBox } from 'teraprox-ui-kit'"
    },
    {
        'import_regex': r'import\s+GenericChart\s+from\s+["\'].*\/default-components\/charts\/GenericChart["\']',
        'import_new': "import { GenericChart } from 'teraprox-ui-kit'"
    },
    {
        'import_regex': r'import\s+GenericREchart\s+from\s+["\'].*\/default-components\/charts\/GenericREchart["\']',
        'import_new': "import { GenericREchart } from 'teraprox-ui-kit'"
    },
    {
        'import_regex': r'import\s+ExpandableCard\s+from\s+["\'].*\/default-components\/containers\/ExpandableCard["\']',
        'import_new': "import { ExpandableCard } from 'teraprox-ui-kit'"
    },
    {
        'import_regex': r'import\s+TextWithMore\s+from\s+["\'].*\/default-components\/text\/TextWithMore["\']',
        'import_new': "import { TextWithMore } from 'teraprox-ui-kit'"
    },
    {
        'import_regex': r'import\s+ReusableTableWithModal\s+from\s+["\'].*\/default-components\/table\/ReusableTableWithModal["\']',
        'import_new': "import { ReusableTableWithModal } from 'teraprox-ui-kit'"
    },
    {
        'import_regex': r'import\s+ModalBasicTemplate\s+from\s+["\'].*\/default-components\/modals\/ModalBasicTemplate["\']',
        'import_new': "import { ModalBasicTemplate } from 'teraprox-ui-kit'"
    },
    {
        'import_regex': r'import\s+SelectDateModal\s+from\s+["\'].*\/default-components\/modals\/SelectDateModal["\']',
        'import_new': "import { SelectDateModal } from 'teraprox-ui-kit'"
    },
    {
        'import_regex': r'import\s+JustificativaModal\s+from\s+["\'].*\/default-components\/modals\/JustificativaModal["\']',
        'import_new': "import { JustificativaModal } from 'teraprox-ui-kit'"
    },
    {
        'import_regex': r'import\s+ImageViewModal\s+from\s+["\'].*\/default-components\/modals\/ImageViewModal["\']',
        'import_new': "import { ImageViewModal } from 'teraprox-ui-kit'"
    },

    # Foundation
    {
        'import_regex': r'import\s+ResponsiveContainer\s+from\s+["\'].*\/default-components\/containers\/ResponsiveContainer["\']',
        'import_new': "import { ResponsiveContainer } from 'teraprox-ui-kit'"
    },
    {
        'import_regex': r'import\s+GenericDisplay\s+from\s+["\'].*\/default-components\/display(s)?\/GenericDisplay["\']',
        'import_new': "import { GenericDisplay } from 'teraprox-ui-kit'"
    },
    {
        'import_regex': r'import\s+GenericSelect\s+from\s+["\'].*\/default-components\/forms\/GenericSelect["\']',
        'import_new': "import { GenericSelect } from 'teraprox-ui-kit'"
    }
]

def migrate_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception:
        return 

    original_content = content
    for r in replacements:
        content = re.sub(r['import_regex'], r['import_new'], content)
        if 'jsx_regex' in r:
            content = re.sub(r['jsx_regex'], r['jsx_new'], content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Migrated: {filepath}")

def main():
    base_dirs = [
        "/Users/alexandrenunes/Desktop/worksapeces/teraprox-app-sgp/src",
        "/Users/alexandrenunes/Desktop/worksapeces/teraprox-app-sgm/src"
    ]
    
    for base_dir in base_dirs:
        print(f"Scanning {base_dir}...")
        for root, dirs, files in os.walk(base_dir):
            for file in files:
                if file.endswith(('.js', '.jsx', '.tsx')):
                    migrate_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
