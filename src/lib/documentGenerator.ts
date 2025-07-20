import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Service de génération de documents traduits
export class DocumentGenerator {

  /**
   * Génère un document texte traduit
   */
  static async generateTranslatedDocument(
    originalFileName: string,
    translatedText: string,
    sourceLang: string,
    targetLang: string,
    translationMeta: {
      quality: number;
      method: string;
      originalLength: number;
      translatedLength: number;
      processingTime?: number;
      segmentsCount?: number;
    }
  ): Promise<{ filePath: string; fileName: string; content: string }> {
    
    try {
      // Créer le répertoire de sortie s'il n'existe pas
      const outputDir = join(process.cwd(), 'uploads', 'translated');
      if (!existsSync(outputDir)) {
        await mkdir(outputDir, { recursive: true });
      }

      // Générer le nom du fichier traduit
      const timestamp = Date.now();
      const baseName = originalFileName.replace(/\.[^/.]+$/, ''); // Supprimer l'extension
      const translatedFileName = `${baseName}_${sourceLang}-${targetLang}_${timestamp}.txt`;
      const filePath = join(outputDir, translatedFileName);

      // Générer le contenu du document traduit
      const documentContent = this.generateDocumentContent(
        originalFileName,
        translatedText,
        sourceLang,
        targetLang,
        translationMeta
      );

      // Écrire le fichier
      await writeFile(filePath, documentContent, 'utf-8');

      console.log(`✅ Document traduit généré: ${translatedFileName}`);

      return {
        filePath,
        fileName: translatedFileName,
        content: documentContent
      };

    } catch (error) {
      console.error('❌ Erreur lors de la génération du document:', error);
      throw new Error('Impossible de générer le document traduit');
    }
  }

  /**
   * Génère le contenu formaté du document traduit
   */
  private static generateDocumentContent(
    originalFileName: string,
    translatedText: string,
    sourceLang: string,
    targetLang: string,
    meta: {
      quality: number;
      method: string;
      originalLength: number;
      translatedLength: number;
      processingTime?: number;
      segmentsCount?: number;
    }
  ): string {
    
    const langNames: Record<string, string> = {
      'id': 'Indonésien',
      'fr': 'Français',
      'en': 'Anglais'
    };

    const methodNames: Record<string, string> = {
      'huggingface-ai': 'Intelligence Artificielle (Hugging Face)',
      'fallback-dictionary': 'Dictionnaire de base',
      'mixed': 'IA + Dictionnaire (mixte)'
    };

    const sourceLanguage = langNames[sourceLang] || sourceLang.toUpperCase();
    const targetLanguage = langNames[targetLang] || targetLang.toUpperCase();
    const translationMethod = methodNames[meta.method] || meta.method;

    const content = `
================================================================================
                           DOCUMENT TRADUIT - INDOFRENCH
================================================================================

📄 INFORMATIONS DU DOCUMENT
────────────────────────────────────────────────────────────────────────────────
Fichier original     : ${originalFileName}
Langue source        : ${sourceLanguage} (${sourceLang})
Langue cible         : ${targetLanguage} (${targetLang})
Date de traduction   : ${new Date().toLocaleString('fr-FR')}

📊 STATISTIQUES DE TRADUCTION
────────────────────────────────────────────────────────────────────────────────
Méthode de traduction : ${translationMethod}
Qualité estimée      : ${meta.quality}%
Longueur originale   : ${meta.originalLength.toLocaleString()} caractères
Longueur traduite    : ${meta.translatedLength.toLocaleString()} caractères
Ratio de longueur    : ${(meta.translatedLength / meta.originalLength * 100).toFixed(1)}%
${meta.segmentsCount ? `Segments traités     : ${meta.segmentsCount}` : ''}
${meta.processingTime ? `Temps de traitement : ${meta.processingTime.toFixed(2)}s` : ''}

🎯 ÉVALUATION DE LA QUALITÉ
────────────────────────────────────────────────────────────────────────────────
${this.getQualityAssessment(meta.quality, meta.method)}

================================================================================
                                TEXTE TRADUIT
================================================================================

${translatedText}

================================================================================
                                  NOTES
================================================================================

📋 À propos de cette traduction :
• Cette traduction a été générée automatiquement par IndoFrench
• Pour les documents critiques, nous recommandons une révision humaine
• La qualité peut varier selon la complexité du texte source
• Les termes techniques peuvent nécessiter une vérification

🔧 Méthodes de traduction utilisées :
• IA (Hugging Face) : Utilise des modèles de traduction neuronaux avancés
• Dictionnaire : Traduction basée sur un dictionnaire français-indonésien
• Mixte : Combinaison d'IA et de dictionnaire pour optimiser la qualité

📞 Support : Pour toute question, contactez support@indofrench.com
🌐 Site web : https://indofrench.com

================================================================================
Généré par IndoFrench - Plateforme de traduction automatique
© ${new Date().getFullYear()} IndoFrench. Tous droits réservés.
================================================================================
    `.trim();

    return content;
  }

  /**
   * Génère une évaluation de la qualité basée sur le score
   */
  private static getQualityAssessment(quality: number, method: string): string {
    let assessment = '';
    let recommendation = '';

    if (quality >= 90) {
      assessment = '🟢 EXCELLENTE - Traduction de très haute qualité';
      recommendation = 'Cette traduction peut être utilisée directement dans la plupart des contextes.';
    } else if (quality >= 80) {
      assessment = '🟡 BONNE - Traduction de qualité satisfaisante';
      recommendation = 'Relecture recommandée pour les documents importants.';
    } else if (quality >= 70) {
      assessment = '🟠 CORRECTE - Traduction acceptable avec améliorations possibles';
      recommendation = 'Révision nécessaire, particulièrement pour les termes techniques.';
    } else {
      assessment = '🔴 BASIQUE - Traduction de base nécessitant une révision';
      recommendation = 'Révision humaine fortement recommandée avant utilisation.';
    }

    let methodNote = '';
    if (method === 'huggingface-ai') {
      methodNote = 'Traduit avec des modèles d\'IA de pointe pour une meilleure précision.';
    } else if (method === 'fallback-dictionary') {
      methodNote = 'Traduit avec notre dictionnaire de base. Convient pour du vocabulaire courant.';
    } else if (method === 'mixed') {
      methodNote = 'Traduit avec une combinaison d\'IA et de dictionnaire pour optimiser la qualité.';
    }

    return `${assessment}

📝 Recommandation : ${recommendation}
🔧 ${methodNote}`;
  }

  /**
   * Génère un résumé de traduction pour l'API
   */
  static generateTranslationSummary(
    originalText: string,
    translatedText: string,
    meta: any
  ) {
    const summary = {
      originalPreview: originalText.length > 200 ? 
        originalText.substring(0, 200) + '...' : originalText,
      translatedPreview: translatedText.length > 200 ? 
        translatedText.substring(0, 200) + '...' : translatedText,
      statistics: {
        originalLength: originalText.length,
        translatedLength: translatedText.length,
        wordsOriginal: originalText.split(/\s+/).length,
        wordsTranslated: translatedText.split(/\s+/).length,
        quality: meta.quality,
        method: meta.method,
        segmentsCount: meta.segmentsCount || 1
      }
    };

    return summary;
  }

  /**
   * Nettoie les anciens fichiers traduits (optionnel - pour éviter l'accumulation)
   */
  static async cleanupOldFiles(maxAgeHours: number = 24) {
    try {
      const outputDir = join(process.cwd(), 'uploads', 'translated');
      if (!existsSync(outputDir)) return;

      const { readdir, stat, unlink } = await import('fs/promises');
      const files = await readdir(outputDir);
      const now = Date.now();
      const maxAge = maxAgeHours * 60 * 60 * 1000; // en millisecondes

      for (const file of files) {
        const filePath = join(outputDir, file);
        const stats = await stat(filePath);
        
        if (now - stats.mtime.getTime() > maxAge) {
          await unlink(filePath);
          console.log(`🗑️ Fichier nettoyé: ${file}`);
        }
      }
    } catch (error) {
      console.error('⚠️ Erreur lors du nettoyage:', error);
    }
  }
}
