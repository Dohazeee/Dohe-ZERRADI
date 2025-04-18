/**
 * Script pour la page FAQ
 * Développé par Doha ZERRADI
 * Version 1.0 - Avril 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    initFAQSearch();
    initFAQCategories();
    initFAQToggle();
});

/**
 * Initialisation de la recherche dans la FAQ
 */
function initFAQSearch() {
    const searchInput = document.getElementById('faq-search-input');
    const faqItems = document.querySelectorAll('.faq-item');
    const noResultsMessage = document.querySelector('.faq-no-results');
    
    if (searchInput && faqItems.length > 0) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            let hasResults = false;
            
            // Réinitialiser les catégories
            document.querySelectorAll('.category-button').forEach(button => {
                button.classList.remove('active');
            });
            document.querySelector('.category-button[data-category="all"]').classList.add('active');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (searchTerm === '' || question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    hasResults = true;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Afficher ou masquer le message "Aucun résultat"
            if (noResultsMessage) {
                noResultsMessage.style.display = hasResults ? 'none' : 'block';
            }
        });
    }
}

/**
 * Initialisation du filtrage par catégories dans la FAQ
 */
function initFAQCategories() {
    const categoryButtons = document.querySelectorAll('.category-button');
    const faqItems = document.querySelectorAll('.faq-item');
    const noResultsMessage = document.querySelector('.faq-no-results');
    
    if (categoryButtons.length > 0 && faqItems.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                let hasResults = false;
                
                // Mettre à jour les classes actives des boutons
                categoryButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                // Réinitialiser la recherche
                const searchInput = document.getElementById('faq-search-input');
                if (searchInput) {
                    searchInput.value = '';
                }
                
                // Filtrer les éléments de la FAQ
                faqItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                        hasResults = true;
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // Afficher ou masquer le message "Aucun résultat"
                if (noResultsMessage) {
                    noResultsMessage.style.display = hasResults ? 'none' : 'block';
                }
            });
        });
    }
}

/**
 * Initialisation de l'ouverture/fermeture des questions de la FAQ
 */
function initFAQToggle() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const faqToggle = this.querySelector('.faq-toggle i');
                
                // Ouvrir/fermer la réponse
                faqItem.classList.toggle('active');
                
                // Changer l'icône
                if (faqToggle) {
                    if (faqItem.classList.contains('active')) {
                        faqToggle.classList.remove('fa-plus');
                        faqToggle.classList.add('fa-minus');
                    } else {
                        faqToggle.classList.remove('fa-minus');
                        faqToggle.classList.add('fa-plus');
                    }
                }
            });
        });
    }
}
