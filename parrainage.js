/**
 * Script pour la page de parrainage
 * Développé par doha ZERRADI
 * Version 1.0 - Avril 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    initParrainageForm();
    initTestimonialsSlider();
});

/**
 * Initialisation du formulaire de parrainage
 */
function initParrainageForm() {
    const parrainageForm = document.querySelector('.parrainage-form');
    
    if (parrainageForm) {
        parrainageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation du formulaire
            if (!validateParrainageForm(this)) {
                return;
            }
            
            // Récupérer les données du formulaire
            const formData = new FormData(this);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Simuler l'envoi des données (dans un environnement réel, cela serait envoyé à un serveur)
            console.log('Données du parrainage :', formDataObj);
            
            // Afficher un message de confirmation
            showParrainageConfirmation(formDataObj);
            
            // Réinitialiser le formulaire
            this.reset();
        });
    }
}

/**
 * Validation du formulaire de parrainage
 */
function validateParrainageForm(form) {
    // Vérifier les champs obligatoires
    const requiredFields = [
        'parrain-nom', 'parrain-prenom', 'parrain-email', 'parrain-telephone',
        'filleul-nom', 'filleul-prenom', 'filleul-email', 'filleul-telephone',
        'formation'
    ];
    
    let isValid = true;
    
    requiredFields.forEach(field => {
        const input = form.querySelector(`#${field}`);
        if (input && !input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else if (input) {
            input.classList.remove('error');
        }
    });
    
    // Vérifier les cases à cocher
    const checkboxes = ['verification', 'terms', 'contact-filleul'];
    checkboxes.forEach(checkbox => {
        const input = form.querySelector(`#${checkbox}`);
        if (input && !input.checked) {
            input.parentElement.classList.add('error');
            isValid = false;
        } else if (input) {
            input.parentElement.classList.remove('error');
        }
    });
    
    // Vérifier le format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const parrainEmail = form.querySelector('#parrain-email');
    const filleulEmail = form.querySelector('#filleul-email');
    
    if (parrainEmail && !emailRegex.test(parrainEmail.value.trim())) {
        parrainEmail.classList.add('error');
        isValid = false;
    }
    
    if (filleulEmail && !emailRegex.test(filleulEmail.value.trim())) {
        filleulEmail.classList.add('error');
        isValid = false;
    }
    
    // Vérifier le format du téléphone (format français)
    const phoneRegex = /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/;
    const parrainPhone = form.querySelector('#parrain-telephone');
    const filleulPhone = form.querySelector('#filleul-telephone');
    
    if (parrainPhone && !phoneRegex.test(parrainPhone.value.trim())) {
        parrainPhone.classList.add('error');
        isValid = false;
    }
    
    if (filleulPhone && !phoneRegex.test(filleulPhone.value.trim())) {
        filleulPhone.classList.add('error');
        isValid = false;
    }
    
    // Afficher un message d'erreur si le formulaire n'est pas valide
    if (!isValid) {
        alert('Veuillez remplir correctement tous les champs obligatoires.');
    }
    
    return isValid;
}

/**
 * Afficher une confirmation après soumission du formulaire de parrainage
 */
function showParrainageConfirmation(formData) {
    // Créer un élément de confirmation
    const confirmationElement = document.createElement('div');
    confirmationElement.className = 'parrainage-confirmation';
    
    // Contenu de la confirmation
    confirmationElement.innerHTML = `
        <div class="confirmation-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3>Votre demande de parrainage a été envoyée avec succès !</h3>
        <p>Merci ${formData['parrain-prenom']} ${formData['parrain-nom']} d'avoir parrainé ${formData['filleul-prenom']} ${formData['filleul-nom']}.</p>
        <p>Nous allons contacter votre filleul dans les plus brefs délais pour lui proposer nos services.</p>
        <p>Dès que votre filleul aura validé son inscription, vous recevrez chacun 50€ !</p>
        <div class="confirmation-actions">
            <button class="cta-button" id="parrainage-new">Parrainer une autre personne</button>
            <a href="index.html" class="secondary-button">Retour à l'accueil</a>
        </div>
    `;
    
    // Remplacer le formulaire par la confirmation
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formContainer.innerHTML = '';
        formContainer.appendChild(confirmationElement);
        
        // Ajouter un événement pour parrainer une autre personne
        const newButton = document.getElementById('parrainage-new');
        if (newButton) {
            newButton.addEventListener('click', function() {
                location.reload();
            });
        }
    }
}

/**
 * Initialisation du slider de témoignages
 */
function initTestimonialsSlider() {
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    
    if (testimonialsSlider) {
        // Variables pour le défilement
        let isDown = false;
        let startX;
        let scrollLeft;
        
        // Événements de la souris
        testimonialsSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            testimonialsSlider.classList.add('active');
            startX = e.pageX - testimonialsSlider.offsetLeft;
            scrollLeft = testimonialsSlider.scrollLeft;
        });
        
        testimonialsSlider.addEventListener('mouseleave', () => {
            isDown = false;
            testimonialsSlider.classList.remove('active');
        });
        
        testimonialsSlider.addEventListener('mouseup', () => {
            isDown = false;
            testimonialsSlider.classList.remove('active');
        });
        
        testimonialsSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialsSlider.offsetLeft;
            const walk = (x - startX) * 2; // Vitesse de défilement
            testimonialsSlider.scrollLeft = scrollLeft - walk;
        });
        
        // Événements tactiles pour les appareils mobiles
        testimonialsSlider.addEventListener('touchstart', (e) => {
            isDown = true;
            testimonialsSlider.classList.add('active');
            startX = e.touches[0].pageX - testimonialsSlider.offsetLeft;
            scrollLeft = testimonialsSlider.scrollLeft;
        });
        
        testimonialsSlider.addEventListener('touchend', () => {
            isDown = false;
            testimonialsSlider.classList.remove('active');
        });
        
        testimonialsSlider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - testimonialsSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialsSlider.scrollLeft = scrollLeft - walk;
        });
        
        // Défilement automatique
        let autoScrollInterval;
        
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                testimonialsSlider.scrollLeft += 2; // Vitesse de défilement automatique
                
                // Revenir au début si on atteint la fin
                if (testimonialsSlider.scrollLeft >= testimonialsSlider.scrollWidth - testimonialsSlider.clientWidth) {
                    testimonialsSlider.scrollLeft = 0;
                }
            }, 30);
        }
        
        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }
        
        // Démarrer le défilement automatique
        startAutoScroll();
        
        // Arrêter le défilement automatique lors de l'interaction de l'utilisateur
        testimonialsSlider.addEventListener('mouseenter', stopAutoScroll);
        testimonialsSlider.addEventListener('touchstart', stopAutoScroll);
        
        // Reprendre le défilement automatique lorsque l'utilisateur n'interagit plus
        testimonialsSlider.addEventListener('mouseleave', startAutoScroll);
        testimonialsSlider.addEventListener('touchend', startAutoScroll);
    }
}
