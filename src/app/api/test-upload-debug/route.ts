import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return new Response(`
<!DOCTYPE html>
<html>
<head>
    <title>Test Upload Debug</title>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .result { margin-top: 20px; padding: 10px; border: 1px solid #ccc; }
        .error { background-color: #ffebee; }
        .success { background-color: #e8f5e8; }
    </style>
</head>
<body>
    <h1>Test Upload Debug</h1>
    <form id="uploadForm">
        <div>
            <label>Fichier:</label>
            <input type="file" id="fileInput" accept=".txt,.pdf" required>
        </div>
        <br>
        <button type="submit">Test Upload Debug</button>
    </form>
    
    <div id="result" class="result" style="display:none;"></div>
    
    <script>
        document.getElementById('uploadForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const fileInput = document.getElementById('fileInput');
            const result = document.getElementById('result');
            
            if (!fileInput.files[0]) {
                alert('Veuillez sélectionner un fichier');
                return;
            }
            
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);
            
            try {
                console.log('🔍 [Test] Envoi du fichier...');
                const response = await fetch('/api/upload-debug', {
                    method: 'POST',
                    body: formData
                });
                
                console.log('🔍 [Test] Response status:', response.status);
                console.log('🔍 [Test] Response headers:', Object.fromEntries(response.headers.entries()));
                
                const contentType = response.headers.get('content-type');
                console.log('🔍 [Test] Content-Type:', contentType);
                
                if (!contentType || !contentType.includes('application/json')) {
                    const text = await response.text();
                    console.error('❌ [Test] Non-JSON response:', text);
                    result.innerHTML = \`<div class="error">Erreur: Réponse non-JSON<br>Content-Type: \${contentType}<br>Contenu: \${text.substring(0, 500)}</div>\`;
                    result.style.display = 'block';
                    return;
                }
                
                const data = await response.json();
                console.log('✅ [Test] JSON reçu:', data);
                
                if (response.ok) {
                    result.innerHTML = \`<div class="success">
                        <h3>✅ Succès!</h3>
                        <pre>\${JSON.stringify(data, null, 2)}</pre>
                    </div>\`;
                } else {
                    result.innerHTML = \`<div class="error">
                        <h3>❌ Erreur (\${response.status})</h3>
                        <pre>\${JSON.stringify(data, null, 2)}</pre>
                    </div>\`;
                }
                result.style.display = 'block';
                
            } catch (error) {
                console.error('❌ [Test] Exception:', error);
                result.innerHTML = \`<div class="error">
                    <h3>❌ Exception</h3>
                    <p>\${error.message}</p>
                </div>\`;
                result.style.display = 'block';
            }
        });
    </script>
</body>
</html>
  `, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
