/**
 * Script pour la page de contact
 * Développé par Doha ZERRADI
 * Version 1.0 - Avril 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initAgencyMap();
});

/**
 * Initialisation du formulaire de contact
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation du formulaire
            if (!validateContactForm(this)) {
                return;
            }
            
            // Récupérer les données du formulaire
            const formData = new FormData(this);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Simuler l'envoi des données (dans un environnement réel, cela serait envoyé à un serveur)
            console.log('Données du formulaire de contact :', formDataObj);
            
            // Afficher un message de confirmation
            showContactConfirmation(formDataObj);
            
            // Réinitialiser le formulaire
            this.reset();
        });
    }
}

/**
 * Validation du formulaire de contact
 */
function validateContactForm(form) {
    // Vérifier les champs obligatoires
    const requiredFields = ['nom', 'prenom', 'email', 'telephone', 'message'];
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
    
    // Vérifier le format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailInput = form.querySelector('#email');
    
    if (emailInput && !emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('error');
        isValid = false;
    }
    
    // Vérifier le format du téléphone (format français)
    const phoneRegex = /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/;
    const phoneInput = form.querySelector('#telephone');
    
    if (phoneInput && !phoneRegex.test(phoneInput.value.trim())) {
        phoneInput.classList.add('error');
        isValid = false;
    }
    
    // Vérifier la case à cocher des conditions
    const termsCheckbox = form.querySelector('#terms');
    if (termsCheckbox && !termsCheckbox.checked) {
        termsCheckbox.parentElement.classList.add('error');
        isValid = false;
    } else if (termsCheckbox) {
        termsCheckbox.parentElement.classList.remove('error');
    }
    
    // Afficher un message d'erreur si le formulaire n'est pas valide
    if (!isValid) {
        alert('Veuillez remplir correctement tous les champs obligatoires.');
    }
    
    return isValid;
}

/**
 * Afficher une confirmation après soumission du formulaire de contact
 */
function showContactConfirmation(formData) {
    // Créer un élément de confirmation
    const confirmationElement = document.createElement('div');
    confirmationElement.className = 'contact-confirmation';
    
    // Contenu de la confirmation
    confirmationElement.innerHTML = `
        <div class="confirmation-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3>Votre message a été envoyé avec succès !</h3>
        <p>Merci ${formData.prenom} ${formData.nom} de nous avoir contactés.</p>
        <p>Nous vous répondrons dans les plus brefs délais à l'adresse ${formData.email} ou au ${formData.telephone}.</p>
        <div class="confirmation-actions">
            <button class="cta-button" id="contact-new">Envoyer un autre message</button>
            <a href="index.html" class="secondary-button">Retour à l'accueil</a>
        </div>
    `;
    
    // Remplacer le formulaire par la confirmation
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formContainer.innerHTML = '';
        formContainer.appendChild(confirmationElement);
        
        // Ajouter un événement pour envoyer un autre message
        const newButton = document.getElementById('contact-new');
        if (newButton) {
            newButton.addEventListener('click', function() {
                location.reload();
            });
        }
    }
}

/**
 * Initialisation de la carte des agences
 */
function initAgencyMap() {
    const mapContainer = document.querySelector('.map-container');
    
    if (mapContainer) {
        // Dans un environnement réel, nous utiliserions une API de cartographie comme Google Maps ou Leaflet
        // Pour cette démonstration, nous utilisons un placeholder
        
        const agencyButtons = document.querySelectorAll('.agency-button');
        
        if (agencyButtons.length > 0) {
            agencyButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const agencyId = this.getAttribute('data-agency');
                    
                    // Simuler le changement de focus sur la carte
                    console.log(`Centrer la carte sur l'agence ${agencyId}`);
                    
                    // Mettre à jour le bouton actif
                    agencyButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Mettre à jour les informations de l'agence affichée
                    updateAgencyInfo(agencyId);
                });
            });
        }
    }
}

/**
 * Mettre à jour les informations de l'agence affichée
 */
function updateAgencyInfo(agencyId) {
    const agencyInfo = document.querySelector('.agency-info');
    
    if (agencyInfo) {
        // Données des agences (dans un environnement réel, ces données viendraient d'une API)
        const agencies = {
            'lyon-centre': {
                name: 'Lyon Centre (siège social)',
                address: '123 Avenue de Lyon, 69001 Lyon',
                phone: '04 78 XX XX XX',
                email: 'lyon-centre@auto-ecole-marietton.fr',
                hours: 'Lun-Ven: 9h-19h | Sam: 9h-12h'
            },
            'lyon-est': {
                name: 'Lyon Est',
                address: '45 Rue de la République, 69003 Lyon',
                phone: '04 78 XX XX XX',
                email: 'lyon-est@auto-ecole-marietton.fr',
                hours: 'Lun-Ven: 9h-19h | Sam: 9h-12h'
            },
            'lyon-ouest': {
                name: 'Lyon Ouest',
                address: '78 Boulevard des Belges, 69006 Lyon',
                phone: '04 78 XX XX XX',
                email: 'lyon-ouest@auto-ecole-marietton.fr',
                hours: 'Lun-Ven: 9h-19h | Sam: 9h-12h'
            },
            'villeurbanne': {
                name: 'Villeurbanne',
                address: '12 Avenue Henri Barbusse, 69100 Villeurbanne',
                phone: '04 78 XX XX XX',
                email: 'villeurbanne@auto-ecole-marietton.fr',
                hours: 'Lun-Ven: 9h-19h | Sam: 9h-12h'
            },
            'bron': {
                name: 'Bron',
                address: '56 Avenue Franklin Roosevelt, 69500 Bron',
                phone: '04 78 XX XX XX',
                email: 'bron@auto-ecole-marietton.fr',
                hours: 'Lun-Ven: 9h-19h | Sam: 9h-12h'
            },
            'vaulx': {
                name: 'Vaulx-en-Velin',
                address: '34 Avenue Gabriel Péri, 69120 Vaulx-en-Velin',
                phone: '04 78 XX XX XX',
                email: 'vaulx@auto-ecole-marietton.fr',
                hours: 'Lun-Ven: 9h-19h | Sam: 9h-12h'
            },
            'venissieux': {
                name: 'Vénissieux',
                address: '89 Boulevard Ambroise Croizat, 69200 Vénissieux',
                phone: '04 78 XX XX XX',
                email: 'venissieux@auto-ecole-marietton.fr',
                hours: 'Lun-Ven: 9h-19h | Sam: 9h-12h'
            },
            'caluire': {
                name: 'Caluire',
                address: '23 Avenue Barthélémy Thimonnier, 69300 Caluire',
                phone: '04 78 XX XX XX',
                email: 'caluire@auto-ecole-marietton.fr',
                hours: 'Lun-Ven: 9h-19h | Sam: 9h-12h'
            }
        };
        
        // Mettre à jour les informations de l'agence
        if (agencies[agencyId]) {
            const agency = agencies[agencyId];
            
            agencyInfo.innerHTML = `
                <h3>${agency.name}</h3>
                <p><i class="fas fa-map-marker-alt"></i> ${agency.address}</p>
                <p><i class="fas fa-phone"></i> ${agency.phone}</p>
                <p><i class="fas fa-envelope"></i> ${agency.email}</p>
                <p><i class="fas fa-clock"></i> ${agency.hours}</p>
                <div class="agency-actions">
                    <a href="rendez-vous.html" class="cta-button">Prendre rendez-vous</a>
                    <a href="https://www.google.com/maps/search/${encodeURIComponent(agency.address)}" target="_blank" class="secondary-button">Itinéraire <i class="fas fa-external-link-alt"></i></a>
                </div>
            `;
        }
    }
}
