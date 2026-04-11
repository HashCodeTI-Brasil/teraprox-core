import os
import filecmp

components = [
    "buttons/ApproveAndReproveButtons.js",
    "buttons/AsyncButton.js",
    "buttons/Generic3DotMenu.js",
    "buttons/LoadingButton.js",
    "buttons/NavigateButton.js",
    "buttons/StatusBadge.js",
    "buttons/SwitchOnClick.js",
    "forms/ClickToWriteField.js",
    "forms/ColorPicker.js",
    "forms/FindRecursoByTagField.js",
    "forms/Switch.js",
    "forms/UploadArea.js",
    "displays/AlarmeDisplay.js",
    "displays/StatusIndicator.js",
    "displays/VerticalItemsDisplay.js",
    "icons/IconLabelItem.js",
    "icons/IconLabelList.js"
]

base_sgp = "/Users/alexandrenunes/Desktop/worksapeces/teraprox-app-sgp/src/Components/default-components/"
base_sgm = "/Users/alexandrenunes/Desktop/worksapeces/teraprox-app-sgm/src/Components/default-components/"

print(f"{'Component':<40} | {'Status':<10}")
print("-" * 55)

for comp in components:
    path_p = os.path.join(base_sgp, comp)
    path_m = os.path.join(base_sgm, comp)
    
    exists_p = os.path.exists(path_p)
    exists_m = os.path.exists(path_m)
    
    if exists_p and exists_m:
        if filecmp.cmp(path_p, path_m, shallow=False):
            print(f"{comp:<40} | IDENTICAL")
        else:
            print(f"{comp:<40} | DIVERGENT")
    elif exists_p:
        print(f"{comp:<40} | ONLY SGP")
    elif exists_m:
        print(f"{comp:<40} | ONLY SGM")
    else:
        print(f"{comp:<40} | MISSING")
