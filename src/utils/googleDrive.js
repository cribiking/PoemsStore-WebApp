// Google Drive API integration
const GOOGLE_DRIVE_API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;
const SCOPES = 'https://www.googleapis.com/auth/drive';

/**
 * Get the access token for Google Drive
 * This uses the Firebase Google authentication
 */
export async function getGoogleAccessToken(user) {
  try {
    if (!user) {
      return { success: false, message: 'Usuario no autenticado' };
    }

    // Get the ID token
    const token = await user.getIdToken();
    return { success: true, token };
  } catch (error) {
    console.error('Error getting access token:', error);
    return { success: false, message: 'Error al obtener el token de acceso' };
  }
}

/**
 * Save poem to Google Drive using Google Drive API
 * Requires the user to have granted permissions to access Google Drive
 */
export async function savePoemToGoogleDrive(title, content, accessToken) {
  try {
    if (!accessToken) {
      return { success: false, message: 'Token de acceso no disponible' };
    }

    // Create file metadata and content
    const fileMetadata = {
      'name': `${title || 'Poema'}.txt`,
      'mimeType': 'text/plain',
      'parents': ['root'] // Save to root of Google Drive
    };

    const file = new Blob([content], { type: 'text/plain' });

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(fileMetadata)], { type: 'application/json' }));
    form.append('file', file);

    const response = await fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: form
      }
    );

    if (!response.ok) {
      console.error('Response:', response);
      return { success: false, message: 'Error al guardar en Google Drive' };
    }

    const result = await response.json();
    return { 
      success: true, 
      message: 'Guardado en Google Drive correctamente',
      fileId: result.id 
    };
  } catch (error) {
    console.error('Error saving to Google Drive:', error);
    return { success: false, message: 'Error al guardar en Google Drive: ' + error.message };
  }
}

/**
 * Check if user has Google Drive API enabled
 * This is a simple helper to verify the setup
 */
export async function checkGoogleDriveAccess(accessToken) {
  try {
    const response = await fetch(
      'https://www.googleapis.com/drive/v3/about?fields=user',
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    return response.ok;
  } catch (error) {
    console.error('Error checking Google Drive access:', error);
    return false;
  }
}
