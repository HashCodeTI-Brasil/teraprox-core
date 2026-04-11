import os
import difflib

components = [
    "forms/SectorSelector.js",
    "icons/NotificationBell.js",
    "icons/NotificationItem.js",
    "displays/TimerDisplay.js",
    "forms/UnidadeMaterialForm.js",
    "forms/UnidadeMaterialModal.js",
    "displays/StatusLight.js"
]

base_sgp = "/Users/alexandrenunes/Desktop/worksapeces/teraprox-app-sgp/src/Components/default-components/"
base_sgm = "/Users/alexandrenunes/Desktop/worksapeces/teraprox-app-sgm/src/Components/default-components/"

for comp in components:
    path_p = os.path.join(base_sgp, comp)
    path_m = os.path.join(base_sgm, comp)
    
    print(f"\n{'='*20} RESEARCHING: {comp} {'='*20}")
    
    exists_p = os.path.exists(path_p)
    exists_m = os.path.exists(path_m)
    
    if exists_p and exists_m:
        with open(path_p, 'r') as f1, open(path_m, 'r') as f2:
            lines1 = f1.readlines()
            lines2 = f2.readlines()
            diff = list(difflib.unified_diff(lines1, lines2, lineterm=''))
            if not diff:
                print("Status: IDENTICAL (Maybe moved to wrong wave?)")
            else:
                print(f"Status: DIVERGENT ({len(diff)} lines of diff)")
                # Print first 20 lines of diff to understand nature
                for line in diff[:30]:
                    print(line)
    elif exists_p:
        print("Status: ONLY SGP")
    elif exists_m:
        print("Status: ONLY SGM")
    else:
        print("Status: MISSING IN BOTH")

