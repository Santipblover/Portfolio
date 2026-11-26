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
    const cvPath = 'documents/Santiago-GarciaCV.pdf';
    
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

// Lógica del menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        // Abrir y cerrar menú al tocar la hamburguesa
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('is-active');
            navLinks.classList.toggle('active');
            const isExpanded = menuToggle.classList.contains('is-active');
            menuToggle.setAttribute('aria-expanded', String(isExpanded));
            menuToggle.setAttribute('aria-label', isExpanded ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
        });

    }
});

document.addEventListener('click', function(event) {
    if (!(event.target instanceof Element) || !event.target.closest('.nav-links a')) {
        return;
    }

    const menuToggle = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.classList.remove('is-active');
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
    }
});

const projects = [
    {
        title: 'Calculadora Web',
        category: 'Desarrollo frontend',
        image: 'images/calculadora.png',
        images: ['images/calculadora.png'],
        shortDescription: 'Calculadora web adaptable creada con HTML, CSS y JavaScript.',
        description: 'Calculadora web con una interfaz sencilla para realizar operaciones cotidianas desde distintos dispositivos.',
        architecture: 'Aplicación ligera que se ejecuta en el navegador: HTML estructura la interfaz, CSS define su presentación y JavaScript gestiona las entradas y los cálculos.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        githubUrl: 'https://github.com/SantiGarcia-1/calculadora-web',
        demoUrl: 'https://calculadora-web-kohl.vercel.app'
    },
    {
        title: 'Procesador de Precios con IA',
        category: 'Desarrollo full stack',
        image: 'images/principal.png',
        images: ['images/principal.png', 'images/lista.png', 'images/aumentos.png'],
        shortDescription: 'Aplicación full stack que extrae productos de listas de precios PDF con Gemini API, detecta aumentos superiores al 10 % usando un historial en SQLite y exporta reportes formateados en Excel.',
        description: 'Procesa listas de precios en PDF y convierte información difícil de comparar en datos estructurados. Extrae los productos con Gemini API, conserva un historial para detectar aumentos superiores al 10 % y genera reportes normalizados en Excel con una pestaña de alertas.',
        architecture: 'FastAPI expone la API de la aplicación; Python procesa los documentos y los precios; Gemini API extrae los datos de productos, y SQLite conserva el historial para compararlos. La interfaz en JavaScript y Tailwind CSS presenta los resultados y permite exportar los reportes a Excel.',
        technologies: ['Python', 'FastAPI', 'Gemini API', 'SQLite', 'JavaScript', 'Tailwind CSS'],
        githubUrl: 'https://github.com/SantiGarcia-1/procesador-proveedores'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const projectList = document.querySelector('#projects-list');
    const modal = document.querySelector('.project-modal');

    if (projectList && modal) {
        const modalTitle = modal.querySelector('#modal-title');
        const modalCategory = modal.querySelector('.modal-category');
        const modalDescription = modal.querySelector('.modal-description');
        const modalArchitecture = modal.querySelector('.modal-architecture');
        const modalTechnologies = modal.querySelector('.modal-technologies');
        const modalImage = modal.querySelector('.modal-image');
        const galleryDots = modal.querySelector('.gallery-dots');
        const previousButton = modal.querySelector('.gallery-previous');
        const nextButton = modal.querySelector('.gallery-next');
        const githubLink = modal.querySelector('.modal-github');
        const demoLink = modal.querySelector('.modal-demo');
        let currentImages = [];
        let currentImageIndex = 0;

        function showImage(index) {
            currentImageIndex = (index + currentImages.length) % currentImages.length;
            const image = currentImages[currentImageIndex];
            modalImage.src = image.src;
            modalImage.alt = image.alt;
            galleryDots.querySelectorAll('button').forEach(function(dot, dotIndex) {
                dot.setAttribute('aria-current', String(dotIndex === currentImageIndex));
            });
        }

        function openProject(project, trigger) {
            modalTitle.textContent = project.title;
            modalCategory.textContent = project.category;
            modalDescription.textContent = project.description;
            modalArchitecture.textContent = project.architecture;
            githubLink.href = project.githubUrl;
            demoLink.hidden = !project.demoUrl;
            if (project.demoUrl) {
                demoLink.href = project.demoUrl;
            } else {
                demoLink.removeAttribute('href');
            }

            modalTechnologies.replaceChildren();
            project.technologies.forEach(function(technology) {
                const tag = document.createElement('li');
                tag.textContent = technology;
                modalTechnologies.appendChild(tag);
            });

            currentImages = project.images.map(function(src, index) {
                return {
                    src: src,
                    alt: project.images.length > 1
                        ? 'Captura de ' + project.title + ', imagen ' + (index + 1)
                        : 'Captura de ' + project.title
                };
            });
            galleryDots.replaceChildren();
            currentImages.forEach(function(image, index) {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'gallery-dot';
                dot.setAttribute('aria-label', 'Ver imagen ' + (index + 1));
                dot.addEventListener('click', function() {
                    showImage(index);
                });
                galleryDots.appendChild(dot);
            });
            previousButton.hidden = currentImages.length < 2;
            nextButton.hidden = currentImages.length < 2;
            showImage(0);

            if (!modal.open) {
                modal.showModal();
            }
            modal.dataset.triggerId = trigger.id;
        }

        projects.forEach(function(project, index) {
            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'project-card';
            card.id = 'project-card-' + (index + 1);
            card.setAttribute('aria-haspopup', 'dialog');

            const image = document.createElement('img');
            image.src = project.image;
            image.alt = 'Vista previa de ' + project.title;

            const category = document.createElement('span');
            category.className = 'project-card-category';
            category.textContent = project.category;

            const title = document.createElement('h3');
            title.textContent = project.title;

            const description = document.createElement('p');
            description.textContent = project.shortDescription;

            const technologies = document.createElement('ul');
            technologies.className = 'project-card-tech';
            project.technologies.forEach(function(technology) {
                const tag = document.createElement('li');
                tag.textContent = technology;
                technologies.appendChild(tag);
            });

            card.append(image, category, title, description, technologies);
            card.addEventListener('click', function() {
                openProject(project, card);
            });
            projectList.appendChild(card);
        });

        previousButton.addEventListener('click', function() {
            showImage(currentImageIndex - 1);
        });
        nextButton.addEventListener('click', function() {
            showImage(currentImageIndex + 1);
        });
        modal.querySelector('.modal-close').addEventListener('click', function() {
            modal.close();
        });
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.close();
            }
        });
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.open) {
                modal.close();
            }
        });
        modal.addEventListener('close', function() {
            const trigger = document.getElementById(modal.dataset.triggerId);
            if (trigger) {
                trigger.focus();
            }
        });
    }

    const copyButton = document.querySelector('.copy-email');
    const copyStatus = document.querySelector('.copy-status');
    if (copyButton && copyStatus) {
        let copyConfirmationTimeout;
        copyButton.addEventListener('click', async function() {
            window.clearTimeout(copyConfirmationTimeout);
            copyButton.textContent = 'Copiar correo';
            copyStatus.textContent = '';
            const email = copyButton.dataset.email;
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(email);
                } else {
                    const temporaryInput = document.createElement('textarea');
                    temporaryInput.value = email;
                    temporaryInput.setAttribute('readonly', '');
                    temporaryInput.style.position = 'fixed';
                    temporaryInput.style.opacity = '0';
                    document.body.appendChild(temporaryInput);
                    let copied;
                    try {
                        temporaryInput.select();
                        copied = document.execCommand('copy');
                    } finally {
                        temporaryInput.remove();
                    }
                    if (!copied) {
                        throw new Error('Clipboard copy was rejected.');
                    }
                }
                copyStatus.textContent = '¡Copiado!';
                copyButton.textContent = '¡Copiado!';
                copyConfirmationTimeout = window.setTimeout(function() {
                    copyStatus.textContent = '';
                    copyButton.textContent = 'Copiar correo';
                }, 1800);
            } catch (error) {
                copyStatus.textContent = 'No se pudo copiar. Copia el correo manualmente.';
            }
        });
    }

    const revealElements = document.querySelectorAll(
        '.container-aboutme, .container-experience, .container-projects, .project-card, .tecnologias, .div4, .div5, .div6, .div7, .container-contact'
    );
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const observer = new IntersectionObserver(function(entries, revealObserver) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

        revealElements.forEach(function(element) {
            element.classList.add('reveal');
            observer.observe(element);
        });
    }
});
