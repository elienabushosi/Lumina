# Logos

| File                                     | Description                                                              |
| ---------------------------------------- | ------------------------------------------------------------------------ |
| `Lumina-logo-transparent.svg`            | Lumina brand logo (in use).                                              |
| `collin-cad-logo.png`                    | Collin Central Appraisal District logo (in use for Research Agent demo). |
| `collin-county-appraisal-department.svg` | Legacy placeholder; demo uses `collin-cad-logo.png`.                     |
| `zillow-placeholder.svg`                 | Placeholder for Zillow logo. Replace when you have the asset.            |
| `redfin-placeholder.svg`                 | Placeholder for Redfin logo. Replace when you have the asset.            |

Use the same filenames when replacing placeholders so existing references keep working.

---

## Logo sizes for the app

| Use                                   | Recommended size                        | Notes                                                                                         |
| ------------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Google Maps** (Research Agent demo) | **96×96 px** (or 120×120 for 2× retina) | Square or landscape; we display at ~40–48 px height, so 96 px source stays crisp. PNG or SVG. |
| Collin CAD (current)                  | Display: 48 px height                   | Your PNG is scaled with `object-contain`.                                                     |
| Zillow / Redfin placeholders          | 80–96 px height                         | Same as Google Maps; width can vary by aspect ratio.                                          |
