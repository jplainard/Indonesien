#!/bin/bash

echo "🧪 Test de l'API de traduction de fichiers IndoFrench"
echo "=================================================="

# Test avec un fichier texte simple
echo "📄 Test avec le fichier test-document.txt..."

curl -X POST http://localhost:3000/api/upload \
  -F "file=@test-document.txt" \
  -F "sourceLanguage=id" \
  -F "targetLanguage=fr" \
  -w "\n\n📊 Statut HTTP: %{http_code}\n" \
  -s | jq . 2>/dev/null || echo "Réponse reçue (pas de jq disponible)"

echo ""
echo "✅ Test terminé !"
echo ""
echo "💡 Pour tester manuellement :"
echo "   1. Allez sur http://localhost:3000/upload"
echo "   2. Uploadez le fichier test-document.txt"
echo "   3. Sélectionnez: Indonésien → Français"
echo "   4. Cliquez sur 'Traduire'"
