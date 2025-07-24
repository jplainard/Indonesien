// Service de traduction avec API externe gratuite
export async function translateText(
  text: string, 
  sourceLang: string, 
  targetLang: string, 
  translationType: string = 'ai'
): Promise<string> {
  
  // Dictionnaire de base pour des traductions simples (fallback)
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
      'senang bertemu dengan anda': 'ravi de vous rencontrer',
      'sampai jumpa': 'au revoir',
      'ya': 'oui',
      'tidak': 'non',
      'saya': 'je',
      'anda': 'vous',
      'dia': 'il/elle',
      'kami': 'nous',
      'mereka': 'ils/elles',
      'rumah': 'maison',
      'sekolah': 'école',
      'kerja': 'travail',
      'makan': 'manger',
      'minum': 'boire',
      'tidur': 'dormir',
      'air': 'eau',
      'makanan': 'nourriture',
      'buku': 'livre',
      'mobil': 'voiture',
      'pesawat': 'avion',
      'universitas': 'université',
      'pendidikan': 'éducation',
      'pengalaman': 'expérience',
      'pekerjaan': 'emploi',
      'keahlian': 'compétences',
      'bahasa': 'langue',
      'komputer': 'ordinateur',
      'teknologi': 'technologie',
      'manajemen': 'gestion',
      'komunikasi': 'communication',
      'tim': 'équipe',
      'proyek': 'projet',
      'hasil': 'résultat',
      'tanggung jawab': 'responsabilité',
      'prestasi': 'réalisation',
      'tahun': 'année',
      'bulan': 'mois',
      'hari': 'jour',
      'alamat': 'adresse',
      'telepon': 'téléphone',
      'email': 'email',
      'tanggal lahir': 'date de naissance',
      'jenis kelamin': 'sexe',
      'status': 'statut',
      'laki-laki': 'masculin',
      'perempuan': 'féminin',
      'menikah': 'marié(e)',
      'belum menikah': 'célibataire'
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
      'ravi de vous rencontrer': 'senang bertemu dengan anda',
      'au revoir': 'sampai jumpa',
      'oui': 'ya',
      'non': 'tidak',
      'je': 'saya',
      'vous': 'anda',
      'il': 'dia',
      'elle': 'dia',
      'nous': 'kami',
      'ils': 'mereka',
      'elles': 'mereka',
      'maison': 'rumah',
      'école': 'sekolah',
      'travail': 'kerja',
      'manger': 'makan',
      'boire': 'minum',
      'dormir': 'tidur',
      'eau': 'air',
      'nourriture': 'makanan',
      'livre': 'buku',
      'voiture': 'mobil',
      'avion': 'pesawat',
      'université': 'universitas',
      'éducation': 'pendidikan',
      'expérience': 'pengalaman',
      'emploi': 'pekerjaan',
      'compétences': 'keahlian',
      'langue': 'bahasa',
      'ordinateur': 'komputer',
      'technologie': 'teknologi',
      'gestion': 'manajemen',
      'communication': 'komunikasi',
      'équipe': 'tim',
      'projet': 'proyek',
      'résultat': 'hasil',
      'responsabilité': 'tanggung jawab',
      'réalisation': 'prestasi',
      'année': 'tahun',
      'mois': 'bulan',
      'jour': 'hari',
      'adresse': 'alamat',
      'téléphone': 'telepon',
      'email': 'email',
      'date de naissance': 'tanggal lahir',
      'sexe': 'jenis kelamin',
      'statut': 'status',
      'masculin': 'laki-laki',
      'féminin': 'perempuan',
      'marié': 'menikah',
      'mariée': 'menikah',
      'célibataire': 'belum menikah'
    }
  };

  // Essayer d'abord la traduction en ligne avec MyMemory (gratuit)
  try {
    console.log(`🌐 [Traduction] Utilisation de MyMemory API pour ${sourceLang} -> ${targetLang}`);
    
    // MyMemory supporte les codes de langue ISO
    const langMap: Record<string, string> = {
      'id': 'id', // Indonésien
      'fr': 'fr'  // Français
    };
    
    const sourceCode = langMap[sourceLang] || sourceLang;
    const targetCode = langMap[targetLang] || targetLang;
    
    // Diviser le texte en chunks si trop long (MyMemory limite à ~500 caractères)
    const maxChunkSize = 400;
    const textChunks = [];
    
    if (text.length <= maxChunkSize) {
      textChunks.push(text);
    } else {
      // Diviser par phrases ou paragraphes
      const sentences = text.split(/[.!?]\s+/);
      let currentChunk = '';
      
      for (const sentence of sentences) {
        if ((currentChunk + sentence).length > maxChunkSize && currentChunk) {
          textChunks.push(currentChunk.trim());
          currentChunk = sentence;
        } else {
          currentChunk += (currentChunk ? '. ' : '') + sentence;
        }
      }
      
      if (currentChunk) {
        textChunks.push(currentChunk.trim());
      }
    }
    
    const translatedChunks = [];
    
    for (const chunk of textChunks) {
      const encodedText = encodeURIComponent(chunk);
      const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${sourceCode}|${targetCode}`;
      
      console.log(`🔄 [Traduction] Requête API: ${chunk.substring(0, 50)}...`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'IndoFrench-Translator/1.0',
        },
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        translatedChunks.push(data.responseData.translatedText);
        console.log(`✅ [Traduction] Chunk traduit: ${data.responseData.translatedText.substring(0, 50)}...`);
      } else {
        throw new Error(`Translation failed: ${data.responseDetails || 'Unknown error'}`);
      }
      
      // Délai entre les requêtes pour éviter le rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const result = translatedChunks.join('. ');
    console.log(`🎉 [Traduction] Succès avec MyMemory: ${result.length} caractères`);
    return result;
    
  } catch (apiError) {
    console.warn(`⚠️ [Traduction] Erreur API MyMemory:`, apiError);
    console.log(`🔄 [Traduction] Fallback vers dictionnaire local`);
    
    // Fallback vers le dictionnaire local
    const langPair = `${sourceLang}-${targetLang}`;
    const dictionary = basicTranslations[langPair] || {};
    
    // Traduction mot par mot et phrase par phrase
    let translatedText = text;
    
    // Remplacer les phrases complètes d'abord (plus longues en premier)
    const sortedEntries = Object.entries(dictionary).sort((a, b) => b[0].length - a[0].length);
    
    sortedEntries.forEach(([source, target]) => {
      const regex = new RegExp(`\\b${source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      translatedText = translatedText.replace(regex, target);
    });

    // Si aucune traduction trouvée ou très peu de changements
    const changeRatio = Math.abs(text.length - translatedText.length) / text.length;
    if (changeRatio < 0.1 && translatedText.toLowerCase() === text.toLowerCase()) {
      translatedText = `[Traduction locale ${targetLang.toUpperCase()}]: ${text}`;
    }

    return translatedText;
  }
}

export function calculateQualityScore(
  sourceText: string, 
  translatedText: string, 
  translationType: string
): number {
  let baseScore = 75;
  
  // Bonus selon le type de traduction
  if (translationType === 'human') {
    baseScore = 95;
  } else if (translationType === 'ai') {
    baseScore = 85;
  } else {
    baseScore = 75;
  }
  
  // Bonus pour la longueur appropriée
  const lengthRatio = translatedText.length / sourceText.length;
  if (lengthRatio >= 0.5 && lengthRatio <= 2.0) {
    baseScore += 5;
  }
  
  // Malus si la traduction est identique (probablement pas traduite)
  if (sourceText.toLowerCase() === translatedText.toLowerCase()) {
    baseScore -= 20;
  }
  
  // S'assurer que le score est entre 0 et 100
  return Math.max(0, Math.min(100, baseScore));
}
