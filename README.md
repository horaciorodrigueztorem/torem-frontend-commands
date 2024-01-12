# Torem Frontend commands

## Actual commands

- [newTranslation](#newtranslation): `torem-frontend-commands.newTranslation`
- [newApplication](#newapplication): `torem-frontend-commands.newApplication`
- [removeApplication](#removeapplication): `torem-frontend-commands.removeApplication`

---

## Commands

### [newTranslation](#newtranslation)

- Command: `torem-frontend-commands.newTranslation`
- Description: Create a new translation file for the selected application.

### [newApplication](#newapplication)

- Command: `torem-frontend-commands.newApplication`
- Description: Create a new application. You must specify the name of the application, the es-LA file path and the useTranslations hook path.

### [removeApplication](#removeapplication)

- Command: `torem-frontend-commands.removeApplication`
- Description: Remove an application. You must specify the name of the application.

## Recommended

1. Press `Ctrl + Shift + P`
2. Select `Open keyboard shortcuts (JSON).`
3. Add your custom key binding to execute torem-frontend-commands.
4. Example:

```json
// Place your key bindings in this file to override the defaults
[
  {
    "key": "ctrl+t",
    "command": "torem-frontend-commands.newTranslation"
  }
]
```
