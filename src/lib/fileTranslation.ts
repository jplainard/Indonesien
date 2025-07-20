import { HfInference } from '@huggingface/inference';

// Service d'extraction de texte depuis différents formats de fichiers
export class FileTextExtractor {
  
  /**
   * Extrait le texte d'un fichier selon son type
   */
  static async extractText(buffer: Buffer, mimeType: string, fileName: string): Promise<string> {
    try {
      console.log(`📄 Extraction de texte depuis ${fileName} (${mimeType})`);
      
      switch (mimeType) {
        case 'text/plain':
          return buffer.toString('utf-8');
          
        case 'application/pdf':
          return await FileTextExtractor.extractFromPDF(buffer);
          
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          return await FileTextExtractor.extractFromWord(buffer);
          
        case 'application/rtf':
          return await FileTextExtractor.extractFromRTF(buffer);
          
        default:
          throw new Error(`Type de fichier non supporté: ${mimeType}`);
      }
    } catch (error) {
      console.error(`❌ Erreur lors de l'extraction de ${fileName}:`, error);
      
      // Préserver les messages d'erreur spécifiques et informatifs
      if (error instanceof Error && (
        error.message.includes('PDF semble être composé uniquement d\'images scannées') ||
        error.message.includes('protégé par mot de passe') ||
        error.message.includes('composé uniquement d\'images scannées') ||
        error.message.includes('reconnaissance optique de caractères')
      )) {
        throw error; // Propager le message spécifique
      }
      
      // Message générique pour autres erreurs
      throw new Error(`Impossible d'extraire le texte du fichier ${fileName}`);
    }
  }

  /**
   * Extrait le texte d'un PDF avec pdf-parse
   */
  private static async extractFromPDF(buffer: Buffer): Promise<string> {
    try {
      console.log('🔍 Extraction PDF avec pdf-parse...');
      const pdfParse = require('pdf-parse');
      const data = await pdfParse(buffer);
      const text = data.text?.trim() || '';
      
      // Vérifier si le PDF contient des pages mais pas de texte (PDF scanné)
      if (data.numpages > 0 && (!text || text.length < 10)) {
        console.warn(`⚠️ PDF de ${data.numpages} page(s) mais aucun texte extractible détecté`);
        throw new Error('PDF_IMAGE_ONLY');
      }
      
      if (!text) {
        console.warn('⚠️ Aucun texte extrait du PDF');
        throw new Error('Aucun texte trouvé dans le PDF');
      }
      console.log(`✅ Extraction PDF terminée: ${text.length} caractères`);
      return this.cleanExtractedText(text);
    } catch (error) {
      console.error('❌ Erreur extraction PDF:', error);
      
      if (error instanceof Error && error.message === 'PDF_IMAGE_ONLY') {
        throw new Error('Ce PDF semble être composé uniquement d\'images scannées. Pour traduire ce type de document, veuillez utiliser un outil de reconnaissance optique de caractères (OCR) pour le convertir en texte, ou utilisez la fonction de traduction de texte directement.');
      }
      
      throw new Error('Erreur lors de l\'extraction du PDF. Le fichier pourrait être corrompu, protégé par mot de passe, ou composé uniquement d\'images scannées.');
    }
  }


  /**
   * Extrait le texte d'un document Word
   */
  private static async extractFromWord(buffer: Buffer): Promise<string> {
    try {
      const mammoth = await import('mammoth');
      const result = await mammoth.extractRawText({ buffer });
      const text = result.value.trim();
      
      if (!text) {
        throw new Error('Le document Word semble vide');
      }
      
      // Afficher les warnings s'il y en a
      if (result.messages.length > 0) {
        console.warn('⚠️ Warnings lors de l\'extraction Word:', result.messages);
      }
      
      return this.cleanExtractedText(text);
    } catch (error) {
      console.error('❌ Erreur extraction Word:', error);
      throw new Error('Erreur lors de l\'extraction du document Word. Le fichier pourrait être corrompu.');
    }
  }

  /**
   * Extrait le texte d'un fichier RTF
   */
  private static async extractFromRTF(buffer: Buffer): Promise<string> {
    try {
      // Implémentation basique pour RTF (on peut améliorer avec un parser RTF)
      const rtfContent = buffer.toString('utf-8');
      
      // Extraction basique du texte RTF (enlever les balises de formatage)
      let text = rtfContent
        .replace(/\{\\[^}]*\}/g, '') // Supprimer les commandes RTF
        .replace(/\\[a-z]+\d*/g, '') // Supprimer les commandes de formatage
        .replace(/[{}]/g, '') // Supprimer les accolades
        .replace(/\\\\/g, '') // Supprimer les backslashes
        .trim();
      
      if (!text) {
        throw new Error('Le fichier RTF semble vide');
      }
      
      return this.cleanExtractedText(text);
    } catch (error) {
      console.error('❌ Erreur extraction RTF:', error);
      throw new Error('Erreur lors de l\'extraction du fichier RTF.');
    }
  }

  /**
   * Nettoie le texte extrait
   */
  private static cleanExtractedText(text: string): string {
    return text
      .replace(/\r\n/g, '\n') // Normaliser les retours à la ligne
      .replace(/\r/g, '\n')
      .replace(/\n{3,}/g, '\n\n') // Limiter les retours à la ligne multiples
      .replace(/\s{2,}/g, ' ') // Limiter les espaces multiples
      .trim();
  }

  /**
   * Valide qu'un fichier peut être traité
   */
  static validateFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'application/rtf'
    ];

    if (file.size > maxSize) {
      return { valid: false, error: 'Le fichier est trop volumineux (max 10MB)' };
    }

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Type de fichier non supporté. Formats acceptés: PDF, Word (.docx), TXT, RTF' };
    }

    return { valid: true };
  }
}

// Service de traduction IA gratuite avec Hugging Face
export class AITranslationService {
  private static hf: HfInference | null = null;

  /**
   * Initialise le service Hugging Face
   */
  private static getHfInstance(): HfInference {
    if (!this.hf) {
      // Utilisation sans clé API (modèles publics gratuits)
      this.hf = new HfInference();
    }
    return this.hf;
  }

  /**
   * Traduit un texte via Hugging Face (gratuit)
   */
  static async translateWithAI(
    text: string, 
    sourceLang: string, 
    targetLang: string
  ): Promise<{ translatedText: string; confidence: number; method: string }> {
    
    try {
      // Limiter la taille du texte pour l'IA (les modèles gratuits ont des limites)
      const maxLength = 1000;
      const textToTranslate = text.length > maxLength ? 
        text.substring(0, maxLength) + '...' : text;

      console.log(`🤖 Traduction IA: ${sourceLang} → ${targetLang} (${textToTranslate.length} chars)`);

      const hf = this.getHfInstance();
      
      // Sélectionner le modèle selon la paire de langues
      const model = this.getTranslationModel(sourceLang, targetLang);
      
      const result = await hf.translation({
        model: model,
        inputs: textToTranslate,
      });

      if (result && result.translation_text) {
        return {
          translatedText: result.translation_text,
          confidence: 85, // Score estimé pour l'IA
          method: 'huggingface-ai'
        };
      } else {
        throw new Error('Réponse invalide de l\'API Hugging Face');
      }

    } catch (error) {
      console.warn('⚠️ Échec traduction IA, fallback vers traduction basique:', error);
      
      // Fallback vers notre traduction de base
      return {
        translatedText: await this.fallbackTranslation(text, sourceLang, targetLang),
        confidence: 70,
        method: 'fallback-dictionary'
      };
    }
  }

  /**
   * Sélectionne le modèle de traduction approprié
   */
  private static getTranslationModel(sourceLang: string, targetLang: string): string {
    const langPair = `${sourceLang}-${targetLang}`;
    
    // Modèles spécialisés disponibles sur Hugging Face (gratuits)
    const models: Record<string, string> = {
      'fr-id': 'Helsinki-NLP/opus-mt-fr-id',
      'id-fr': 'Helsinki-NLP/opus-mt-id-fr',
      'en-fr': 'Helsinki-NLP/opus-mt-en-fr',
      'fr-en': 'Helsinki-NLP/opus-mt-fr-en',
      'en-id': 'Helsinki-NLP/opus-mt-en-id',
      'id-en': 'Helsinki-NLP/opus-mt-id-en'
    };

    // Si pas de modèle direct, utiliser l'anglais comme pivot
    if (models[langPair]) {
      return models[langPair];
    }

    // Modèle par défaut (multilingual)
    return 'Helsinki-NLP/opus-mt-mul-en';
  }

  /**
   * Traduction de fallback si l'IA échoue
   */
  private static async fallbackTranslation(
    text: string, 
    sourceLang: string, 
    targetLang: string
  ): Promise<string> {
    
    // Utiliser notre dictionnaire existant
    const basicTranslations: Record<string, Record<string, string>> = {
      'id-fr': {
        'halo': 'bonjour',
        'selamat pagi': 'bon matin',
        'selamat siang': 'bon après-midi',
        'selamat malam': 'bonsoir',
        'terima kasih': 'merci',
        'sama-sama': 'de rien',
        'maaf': 'excusez-moi',
        'permisi': 'pardon',
        'apa kabar': 'comment allez-vous',
        'baik-baik saja': 'ça va bien',
        'nama saya': 'je m\'appelle',
        'sampai jumpa': 'au revoir',
        'ya': 'oui',
        'tidak': 'non',
        'dokumen': 'document',
        'teks': 'texte',
        'halaman': 'page',
        'baris': 'ligne'
      },
      'fr-id': {
        'bonjour': 'halo',
        'bon matin': 'selamat pagi',
        'bon après-midi': 'selamat siang',
        'bonsoir': 'selamat malam',
        'merci': 'terima kasih',
        'de rien': 'sama-sama',
        'excusez-moi': 'maaf',
        'pardon': 'permisi',
        'comment allez-vous': 'apa kabar',
        'ça va bien': 'baik-baik saja',
        'je m\'appelle': 'nama saya',
        'au revoir': 'sampai jumpa',
        'oui': 'ya',
        'non': 'tidak',
        'document': 'dokumen',
        'texte': 'teks',
        'page': 'halaman',
        'ligne': 'baris'
      }
    };

    const langPair = `${sourceLang}-${targetLang}`;
    const dictionary = basicTranslations[langPair] || {};
    
    let translatedText = text.toLowerCase();
    
    // Traduction mot par mot
    Object.entries(dictionary).forEach(([source, target]) => {
      const regex = new RegExp(`\\b${source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      translatedText = translatedText.replace(regex, target);
    });

    // Si aucune traduction trouvée
    if (translatedText === text.toLowerCase()) {
      translatedText = `[Document traduit ${targetLang.toUpperCase()}] ${text}`;
    }

    return translatedText.charAt(0).toUpperCase() + translatedText.slice(1);
  }

  /**
   * Découpe un long texte en segments pour la traduction
   */
  static splitTextForTranslation(text: string, maxLength: number = 1000): string[] {
    if (text.length <= maxLength) {
      return [text];
    }

    const segments: string[] = [];
    const sentences = text.split(/[.!?]+/);
    let currentSegment = '';

    for (const sentence of sentences) {
      const trimmedSentence = sentence.trim();
      if (!trimmedSentence) continue;

      if (currentSegment.length + trimmedSentence.length + 1 <= maxLength) {
        currentSegment += (currentSegment ? '. ' : '') + trimmedSentence;
      } else {
        if (currentSegment) {
          segments.push(currentSegment + '.');
        }
        currentSegment = trimmedSentence;
      }
    }

    if (currentSegment) {
      segments.push(currentSegment + '.');
    }

    return segments;
  }

  /**
   * Traduit un long texte segment par segment
   */
  static async translateLongText(
    text: string, 
    sourceLang: string, 
    targetLang: string
  ): Promise<{ translatedText: string; confidence: number; method: string; segmentsCount: number }> {
    
    const segments = this.splitTextForTranslation(text, 800);
    console.log(`📝 Traduction de ${segments.length} segments...`);
    
    const translatedSegments: string[] = [];
    let totalConfidence = 0;
    let method = 'huggingface-ai';

    for (let i = 0; i < segments.length; i++) {
      console.log(`🔄 Segment ${i + 1}/${segments.length}...`);
      
      try {
        const result = await this.translateWithAI(segments[i], sourceLang, targetLang);
        translatedSegments.push(result.translatedText);
        totalConfidence += result.confidence;
        if (result.method === 'fallback-dictionary') {
          method = 'mixed';
        }
        
        // Petite pause pour éviter le rate limiting
        if (i < segments.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      } catch (error) {
        console.error(`❌ Erreur segment ${i + 1}:`, error);
        // En cas d'erreur, utiliser le fallback
        const fallback = await this.fallbackTranslation(segments[i], sourceLang, targetLang);
        translatedSegments.push(fallback);
        totalConfidence += 50;
        method = 'mixed';
      }
    }

    return {
      translatedText: translatedSegments.join(' '),
      confidence: Math.round(totalConfidence / segments.length),
      method,
      segmentsCount: segments.length
    };
  }
}
