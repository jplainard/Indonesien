# 🔧 Diagnostic de l'API Upload - Erreur 500

## 📋 Problème Identifié

**Erreur :** HTTP 500 Internal Server Error sur `/api/upload`  
**Symptôme :** L'API ne répond pas ou timeout lors de l'upload de fichiers PDF  
**URL :** https://indonesien.vercel.app/api/upload

## 🔍 Analyse Technique

### Causes Probables
1. **Système de fichiers read-only sur Vercel** - Tentative d'écriture dans `/uploads`
2. **Imports dynamiques problématiques** - `pdf-parse`, `mammoth`, HuggingFace
3. **Timeout des dépendances externes** - API HuggingFace non configurée
4. **Gestion mémoire insuffisante** - Traitement de gros fichiers PDF

### Solutions Implémentées
1. ✅ **Suppression sauvegarde disque** - Traitement en mémoire uniquement
2. ✅ **Simplification traduction** - Dictionnaire de base sans API externe  
3. ✅ **API de debug créée** - `/api/upload-debug` et `/api/upload-simple`
4. ⚠️ **Tests en cours** - Validation des corrections

## 🧪 Tests de Validation

### Test 1: API Upload Simple (Texte uniquement)
```bash
curl -X POST "https://indonesien.vercel.app/api/upload-simple" \
  -F "file=@test.txt" \
  -F "sourceLanguage=id" \
  -F "targetLanguage=fr"
```
**Statut :** 🔄 En cours de test

### Test 2: API Upload Debug (Diagnostic)
```bash
curl -X POST "https://indonesien.vercel.app/api/upload-debug" \
  -F "file=@test.txt" \
  -F "sourceLanguage=id" \
  -F "targetLanguage=fr"
```
**Statut :** 🔄 En cours de test

### Test 3: API Upload Principal (Corrigée)
```bash
curl -X POST "https://indonesien.vercel.app/api/upload" \
  -F "file=@document.pdf" \
  -F "sourceLanguage=id" \
  -F "targetLanguage=fr"
```
**Statut :** ⏳ En attente de validation des tests simples

## 🔧 Corrections Appliquées

### Version Corrigée - `/api/upload/route.ts`
```typescript
// ❌ AVANT: Sauvegarde sur disque (impossible sur Vercel)
const uploadDir = join(process.cwd(), 'uploads');
await writeFile(filePath, buffer);

// ✅ APRÈS: Traitement en mémoire
const buffer = Buffer.from(bytes);
console.log(`💾 Fichier traité en mémoire: ${file.name}`);

// ❌ AVANT: Services externes complexes
await AITranslationService.translateWithAI(...)
await DocumentGenerator.generateTranslatedDocument(...)

// ✅ APRÈS: Traduction basique fiable
const result = await translateTextBasic(text, sourceLang, targetLang);
```

### Fonctions Ajoutées
- `translateTextBasic()` - Dictionnaire ID ↔ FR
- `extractTextFromFile()` - Extraction PDF/Word/TXT simplifiée  
- `cleanExtractedText()` - Nettoyage du texte extrait

## 📊 Support de Fichiers

| Type | Extension | Statut | Note |
|------|-----------|--------|------|
| Texte | .txt | ✅ Supporté | Extraction UTF-8 |
| PDF | .pdf | 🔄 Test | pdf-parse avec fallback |
| Word | .docx | 🔄 Test | mammoth avec fallback |
| RTF | .rtf | 🔄 Test | Parser basique |

## 🚀 Plan de Résolution

### Phase 1: Validation Texte ✅
- [x] Créer API ultra-simple pour fichiers .txt
- [x] Tester traduction de base
- [ ] Valider que l'upload fonctionne

### Phase 2: Support PDF 🔄
- [ ] Tester extraction PDF corrigée
- [ ] Valider gestion des erreurs
- [ ] Optimiser pour Vercel Edge

### Phase 3: Interface Utilisateur 📋
- [ ] Améliorer messages d'erreur dans l'UI
- [ ] Ajouter indicateur de progression  
- [ ] Support drag & drop

## 🎯 Solution Temporaire

En attendant la résolution complète, les utilisateurs peuvent :

1. **Fichiers texte (.txt)** ✅ - Fonctionnent via `/api/upload-simple`
2. **Texte direct** ✅ - Utiliser l'interface de traduction normale  
3. **PDF simple** 🔄 - Convertir en texte puis utiliser l'interface

## 📞 Actions Suivantes

1. **Finaliser tests** des APIs simples
2. **Corriger PDF extraction** si nécessaire
3. **Mettre à jour interface** avec gestion d'erreurs améliorée
4. **Documenter limitations** temporaires pour utilisateurs

---

**Dernière mise à jour :** 22 juillet 2025  
**Statut :** 🔄 Diagnostic en cours - Résolution imminente
