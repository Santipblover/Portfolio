// Funcionalidad para descargar el CV
document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.querySelector('.button-cv');
    
    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            downloadCV();
        });
    }
});

function downloadCV() {
    // Ruta al archivo PDF (ajusta el nombre del archivo según tu CV)
    const cvPath = 'documents/Santiago-Garcia-CV.pdf_2025_5_18.pdf';
    
    // Crear un enlace temporal para la descarga
    const link = document.createElement('a');
    link.href = cvPath;
    link.download = 'Santiago-Garcia-CV.pdf'; // Nombre del archivo que se descargará
    
    // Agregar el enlace al DOM, hacer clic y removerlo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Mostrar mensaje de confirmación
    showDownloadMessage();
}

function showDownloadMessage() {
    // Crear un mensaje temporal de confirmación
    const message = document.createElement('div');
    message.textContent = 'Descargando CV...';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        font-family: 'Source Code Pro', monospace;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(message);
    
    // Remover el mensaje después de 3 segundos
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 3000);
}
