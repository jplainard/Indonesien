'use client';

import { useState, useRef } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import MainLayout from '../../components/MainLayout';

interface UploadSummary {
  statistics: {
    originalLength: number;
    translatedLength: number;
  };
}

interface UploadMetadata {
  quality?: number;
  processingTime?: string;
}

interface UploadFile {
  id: string;
  file: File;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
  result?: {
    translatedFile?: string;
    downloadUrl?: string;
    summary?: UploadSummary;
    metadata?: UploadMetadata;
    error?: string;
    details?: string;
    ocrUrl?: string;
    errorType?: string;
    solutions?: Array<{
      title: string;
      description: string;
      url: string | null;
      action: string;
    }>;
    quickAction?: {
      title: string;
      description: string;
      buttonText: string;
      url: string;
    };
  };
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [sourceLang, setSourceLang] = useState('id');
  const [targetLang, setTargetLang] = useState('fr');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles: UploadFile[] = Array.from(fileList).map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      progress: 0
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const uploadSingleFile = async (uploadFile: UploadFile) => {
    setFiles(prev => prev.map(f => 
      f.id === uploadFile.id ? { ...f, status: 'uploading', progress: 0 } : f
    ));

    // Validation côté client
    if (!uploadFile.file) {
      console.error('No file provided');
      setFiles(prev => prev.map(f => 
        f.id === uploadFile.id ? { ...f, status: 'error', progress: 0 } : f
      ));
      return;
    }

    if (!sourceLang || !targetLang) {
      console.error('Source or target language missing:', { sourceLang, targetLang });
      setFiles(prev => prev.map(f => 
        f.id === uploadFile.id ? { ...f, status: 'error', progress: 0 } : f
      ));
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadFile.file);
    formData.append('sourceLanguage', sourceLang);
    formData.append('targetLanguage', targetLang);

    console.log('Uploading file:', {
      fileName: uploadFile.file.name,
      fileSize: uploadFile.file.size,
      sourceLanguage: sourceLang,
      targetLanguage: targetLang
    });

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setFiles(prev => prev.map(f => 
          f.id === uploadFile.id ? { 
            ...f, 
            status: 'success', 
            progress: 100,
            result: data
          } : f
        ));
        console.log('✅ Upload réussi:', data);
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload exception:', error);
      setFiles(prev => prev.map(f => 
        f.id === uploadFile.id ? { 
          ...f, 
          status: 'error', 
          progress: 0,
          result: { error: error instanceof Error ? error.message : 'Erreur inconnue' }
        } : f
      ));
    }
  };

  const uploadAllFiles = () => {
    files.filter(f => f.status === 'pending').forEach(uploadSingleFile);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const downloadTranslatedFile = (uploadFile: UploadFile) => {
    if (!uploadFile.result?.translatedFile) return;
    
    const content = `Traduction ${sourceLang.toUpperCase()} → ${targetLang.toUpperCase()}

Fichier original: ${uploadFile.file.name}
Taille: ${formatFileSize(uploadFile.file.size)}
Date de traduction: ${new Date().toLocaleString('fr-FR')}

--- TEXTE TRADUIT ---

${uploadFile.result.translatedFile}

--- FIN DE LA TRADUCTION ---

Ce fichier a été traduit par IndoFrench - Service de traduction automatique.`;
    
    const blob = new Blob([content], { type: 'text/plain; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `traduit-${uploadFile.file.name.replace(/\.[^/.]+$/, '')}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <MainLayout 
      title={
        <span className="inline-flex items-center gap-2 text-2xl font-extrabold bg-gradient-to-r from-blue-700 via-purple-600 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-sm">
          <FileText className="w-7 h-7" /> Traduire vos documents
        </span>
      }
      description={<span className="text-base text-gray-700 font-medium">Uploadez vos fichiers et obtenez une traduction professionnelle en quelques minutes</span>}
    >
      <div className="space-y-6">
        {/* Bloc configuration moderne */}
        <div className="rounded-2xl bg-white/80 shadow-xl ring-1 ring-blue-100/60 backdrop-blur-md p-8 mb-6 border border-blue-100/40">
          <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2"><FileText className="w-6 h-6" />Langues de traduction</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-blue-700 mb-1">Langue source</label>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 font-medium shadow-sm"
              >
                <option value="id">🇮🇩 Indonésien</option>
                <option value="fr">🇫🇷 Français</option>
              </select>
            </div>
            <div className="flex items-end justify-center">
              <button
                onClick={() => {
                  const temp = sourceLang;
                  setSourceLang(targetLang);
                  setTargetLang(temp);
                }}
                className="p-2 rounded-full bg-gradient-to-tr from-blue-100 to-purple-100 text-blue-700 shadow hover:from-blue-200 hover:to-purple-200 transition-colors"
                title="Inverser les langues"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>
            </div>
            <div>
              <label className="block text-xs font-semibold text-blue-700 mb-1">Langue cible</label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 font-medium shadow-sm"
              >
                <option value="fr">🇫🇷 Français</option>
                <option value="id">🇮🇩 Indonésien</option>
              </select>
            </div>
          </div>
        </div>

        {/* Information sur les formats de fichiers */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6 border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-800 mb-2">Important à savoir sur les formats de fichiers</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <strong>PDF avec texte</strong> : Fonctionne parfaitement pour les PDF créés numériquement</li>
                <li>• <strong>PDF scannés</strong> : Les documents scannés (images) ne peuvent pas être traduits directement</li>
                <li>• <strong>Word (.doc, .docx)</strong> : Format recommandé pour une extraction optimale</li>
                <li>• <strong>Texte (.txt)</strong> : Format le plus simple et le plus fiable</li>
                <li>• <strong>RTF</strong> : Texte enrichi supporté</li>
              </ul>
              <p className="text-sm text-blue-600 mt-2">
                <strong>Astuce :</strong> Si votre PDF est un document scanné, utilisez d&apos;abord un outil de reconnaissance de caractères (OCR) ou copiez-collez le texte manuellement dans l&apos;outil de traduction de texte.
              </p>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt,.rtf"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Glissez-déposez vos fichiers ici
            </h3>
            <p className="text-gray-600 mb-4">
              ou cliquez pour sélectionner des fichiers
            </p>
            <p className="text-sm text-gray-500">
              Formats supportés: PDF, Word, Txt, RTF (max 10MB par fichier)
            </p>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border mb-6">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Fichiers à traduire ({files.length})</h3>
                <button
                  onClick={uploadAllFiles}
                  disabled={files.filter(f => f.status === 'pending').length === 0}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Traduire tout
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {files.map((uploadFile) => (
                <div key={uploadFile.id} className="p-4 flex items-center space-x-4">
                  <FileText className="h-8 w-8 text-gray-400 flex-shrink-0" />
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {uploadFile.file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(uploadFile.file.size)}
                    </p>
                    
                    {uploadFile.status === 'uploading' && (
                      <div className="mt-2">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadFile.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {uploadFile.status === 'success' && (
                      <div className="mt-2 p-3 bg-green-50 rounded-md">
                        <div className="flex items-center justify-between mb-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-sm font-medium text-green-800">
                            Traduction terminée !
                          </span>
                        </div>
                        {uploadFile.result && (
                          <div className="space-y-2">
                            {uploadFile.result.summary && (
                              <div className="text-xs text-gray-600">
                                <div>📄 {uploadFile.result.summary.statistics.originalLength} → {uploadFile.result.summary.statistics.translatedLength} caractères</div>
                                <div>🎯 Qualité: {uploadFile.result.metadata?.quality}</div>
                                <div>⏱️ Traité en: {uploadFile.result.metadata?.processingTime}</div>
                              </div>
                            )}
                            {uploadFile.result.translatedFile && (
                              <button
                                onClick={() => downloadTranslatedFile(uploadFile)}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                              >
                                📁 Télécharger le document traduit
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {uploadFile.status === 'error' && uploadFile.result?.error && (
                      <div className="mt-2 p-3 bg-red-50 rounded-md">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span className="text-sm font-medium text-red-800">Erreur</span>
                        </div>
                        <p className="text-xs text-red-600">{uploadFile.result.error}</p>
                        
                        {/* Nouveau design pour PDF non supporté */}
                        {uploadFile.result.errorType === 'pdf_not_supported' && (
                          <div className="mt-3 text-sm bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-lg">📄</span>
                              <div>
                                <div className="font-medium text-blue-800">PDF détecté</div>
                                <div className="text-xs text-blue-600">Choisissez une solution alternative</div>
                              </div>
                            </div>
                            
                            <p className="text-xs text-blue-700 mb-4">{uploadFile.result.details}</p>
                            
                            {/* Action rapide recommandée */}
                            {uploadFile.result.quickAction && (
                              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                <div className="font-medium text-green-800 text-sm mb-1">{uploadFile.result.quickAction.title}</div>
                                <div className="text-xs text-green-600 mb-2">{uploadFile.result.quickAction.description}</div>
                                <a 
                                  href={uploadFile.result.quickAction.url}
                                  className="inline-flex items-center px-3 py-1 text-xs bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                >
                                  {uploadFile.result.quickAction.buttonText} →
                                </a>
                              </div>
                            )}
                            
                            {/* Autres solutions */}
                            {uploadFile.result.solutions && (
                              <div className="space-y-2">
                                <div className="font-medium text-blue-800 text-xs">Autres solutions :</div>
                                <div className="grid grid-cols-1 gap-2">
                                  {uploadFile.result.solutions.map((solution: { title: string; description: string; url: string | null; action: string; }, index: number) => (
                                    <div key={index} className="bg-white border border-blue-200 rounded-lg p-3 hover:border-blue-300 transition-colors">
                                      <div className="font-medium text-xs text-blue-800 mb-1">{solution.title}</div>
                                      <div className="text-xs text-blue-600 mb-2">{solution.description}</div>
                                      {solution.url ? (
                                        <a 
                                          href={solution.url} 
                                          target="_blank" 
                                          rel="noopener noreferrer" 
                                          className="text-xs text-blue-600 hover:text-blue-800 underline font-medium"
                                        >
                                          {solution.action} →
                                        </a>
                                      ) : (
                                        <div className="text-xs text-blue-500">{solution.action}</div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* Affichage aide OCR si PDF extraction failed */}
                        {uploadFile.result.details && uploadFile.result.errorType === 'pdf_extraction_failed' && (
                          <div className="mt-3 text-sm text-gray-700 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <div className="font-medium text-yellow-800 mb-2">📄 Problème d&apos;extraction PDF</div>
                            <p className="text-xs text-gray-600 mb-3">{uploadFile.result.details}</p>
                            
                            {uploadFile.result.solutions && (
                              <div className="space-y-2">
                                <div className="font-medium text-gray-800 text-xs">Solutions recommandées :</div>
                                {uploadFile.result.solutions.map((solution: { title: string; description: string; url: string | null; action: string; }, index: number) => (
                                  <div key={index} className="bg-white border border-gray-200 rounded p-2">
                                    <div className="font-medium text-xs text-gray-800">{solution.title}</div>
                                    <div className="text-xs text-gray-600 mb-1">{solution.description}</div>
                                    {solution.url ? (
                                      <a 
                                        href={solution.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-xs text-blue-600 hover:text-blue-800 underline"
                                      >
                                        🔗 {solution.action}
                                      </a>
                                    ) : (
                                      <div className="text-xs text-gray-500">💡 {solution.action}</div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                        {/* Ancien affichage pour compatibilité */}
                        {uploadFile.result.details && uploadFile.result.error === 'PDF extraction failed' && !uploadFile.result.errorType && (
                          <div className="mt-2 text-xs text-blue-700 bg-blue-50 rounded p-3">
                            <div className="font-bold text-blue-800 mb-1">Impossible d&apos;extraire le texte du PDF</div>
                            <div className="mb-2">
                              <span className="font-semibold">Fichier&nbsp;:</span> {uploadFile.file.name}<br />
                              <span className="font-semibold">Taille&nbsp;:</span> {formatFileSize(uploadFile.file.size)}<br />
                              <span className="font-semibold">Type&nbsp;:</span> {uploadFile.file.type}
                            </div>
                            <div className="mb-2">
                              <strong>Conseil&nbsp;:</strong> {uploadFile.result.details}
                            </div>
                            {uploadFile.result.ocrUrl && (
                              <div className="mt-2">
                                <a href={uploadFile.result.ocrUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors">
                                  🖹 Ouvrir l&apos;OCR en ligne
                                </a>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {uploadFile.status === 'pending' && (
                      <button
                        onClick={() => uploadSingleFile(uploadFile)}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                      >
                        Traduire
                      </button>
                    )}
                    
                    {uploadFile.status === 'uploading' && (
                      <div className="text-sm text-blue-600">Traduction...</div>
                    )}
                    
                    {uploadFile.status === 'success' && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    
                    {uploadFile.status === 'error' && (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                    
                    <button
                      onClick={() => removeFile(uploadFile.id)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Formats multiples</h3>
            <p className="text-sm text-gray-600">
              PDF, Word, texte et bien plus
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Traduction rapide</h3>
            <p className="text-sm text-gray-600">
              Résultats en quelques minutes
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Sécurisé</h3>
            <p className="text-sm text-gray-600">
              Vos documents sont protégés
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
