/**
 * Script principal pour le site Auto-École Marietton
 * Développé par Doha ZERRADI
 * Version 1.0 - Avril 2025
 */

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des composants
    initMobileMenu();
    initBackToTop();
    initChatbot();
    initFAQ();
    initAnimations();
});

/**
 * Initialisation du menu mobile
 */
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Changer l'icône du menu
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

/**
 * Initialisation du bouton "Retour en haut"
 */
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        // Afficher/masquer le bouton en fonction du défilement
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Action de défilement vers le haut
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Initialisation du chatbot
 */
function initChatbot() {
    const chatbotButton = document.querySelector('.chatbot-button');
    const chatbotPanel = document.querySelector('.chatbot-panel');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSend = document.querySelector('.chatbot-send');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    
    if (chatbotButton && chatbotPanel) {
        // Ouvrir le chatbot
        chatbotButton.addEventListener('click', function() {
            chatbotPanel.classList.add('active');
            
            // Afficher le message de bienvenue s'il n'y a pas encore de messages
            if (chatbotMessages && chatbotMessages.children.length === 0) {
                addBotMessage("Bonjour ! Je suis l'assistant virtuel de l'Auto-École Marietton. Comment puis-je vous aider aujourd'hui ?");
                
                // Suggestions de questions
                const suggestions = [
                    "Quels sont vos tarifs ?",
                    "Comment s'inscrire ?",
                    "Où se trouvent vos agences ?",
                    "Comment fonctionne le parrainage ?"
                ];
                
                const suggestionsHtml = suggestions.map(suggestion => 
                    `<div class="suggestion">${suggestion}</div>`
                ).join('');
                
                const suggestionsContainer = document.createElement('div');
                suggestionsContainer.className = 'suggestions-container';
                suggestionsContainer.innerHTML = suggestionsHtml;
                chatbotMessages.appendChild(suggestionsContainer);
                
                // Ajouter des événements aux suggestions
                document.querySelectorAll('.suggestion').forEach(suggestion => {
                    suggestion.addEventListener('click', function() {
                        const text = this.textContent;
                        addUserMessage(text);
                        handleUserMessage(text);
                    });
                });
            }
        });
        
        // Fermer le chatbot
        if (chatbotClose) {
            chatbotClose.addEventListener('click', function() {
                chatbotPanel.classList.remove('active');
            });
        }
        
        // Envoyer un message
        if (chatbotInput && chatbotSend) {
            // Envoyer avec le bouton
            chatbotSend.addEventListener('click', function() {
                sendMessage();
            });
            
            // Envoyer avec la touche Entrée
            chatbotInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }
    
    // Fonction pour envoyer un message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        
        if (message !== '') {
            addUserMessage(message);
            chatbotInput.value = '';
            
            // Traiter le message de l'utilisateur
            handleUserMessage(message);
        }
    }
    
    // Ajouter un message de l'utilisateur
    function addUserMessage(text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message message-user';
        messageElement.textContent = text;
        chatbotMessages.appendChild(messageElement);
        
        // Faire défiler vers le bas
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Ajouter un message du bot
    function addBotMessage(text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message message-bot';
        messageElement.textContent = text;
        chatbotMessages.appendChild(messageElement);
        
        // Faire défiler vers le bas
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Traiter le message de l'utilisateur
    function handleUserMessage(message) {
        // Simuler un délai de réponse
        setTimeout(() => {
            const lowerMessage = message.toLowerCase();
            
            // Réponses prédéfinies basées sur des mots-clés
            if (lowerMessage.includes('tarif') || lowerMessage.includes('prix') || lowerMessage.includes('coût')) {
                addBotMessage("Nos tarifs varient selon la formation choisie :\n- Permis B : 2496€\n- Permis A : 1212€\n- Conduite accompagnée : 1990€\n- Perfectionnement : à partir de 60€/h\n\nVous pouvez consulter notre page des formations pour plus de détails.");
            }
            else if (lowerMessage.includes('inscri')) {
                addBotMessage("Pour vous inscrire, vous pouvez :\n1. Prendre rendez-vous en ligne sur notre site\n2. Vous rendre directement dans l'une de nos 8 agences\n3. Nous appeler au 04 78 XX XX XX\n\nLes documents nécessaires sont : pièce d'identité, justificatif de domicile, photo d'identité, et ASSR2 pour les moins de 21 ans.");
            }
            else if (lowerMessage.includes('agence') || lowerMessage.includes('adresse')) {
                addBotMessage("Nous avons 8 agences en région lyonnaise :\n- Lyon Centre (siège social) : 123 Avenue de Lyon\n- Lyon Est : 45 Rue de la République\n- Lyon Ouest : 78 Boulevard des Belges\n- Villeurbanne : 12 Avenue Henri Barbusse\n- Bron : 56 Avenue Franklin Roosevelt\n- Vaulx-en-Velin : 34 Avenue Gabriel Péri\n- Vénissieux : 89 Boulevard Ambroise Croizat\n- Caluire : 23 Avenue Barthélémy Thimonnier\n\nToutes nos agences sont ouvertes du lundi au vendredi de 9h à 19h et le samedi de 9h à 12h.");
            }
            else if (lowerMessage.includes('parrain')) {
                addBotMessage("Notre programme de parrainage est simple :\n1. Recommandez Marietton à vos proches\n2. Votre filleul s'inscrit en mentionnant votre nom\n3. Vous recevez chacun 50€ dès que l'inscription est validée\n\nLe nombre de parrainages est illimité, vous pouvez donc gagner autant de fois 50€ que vous avez de filleuls !");
            }
            else if (lowerMessage.includes('rendez-vous') || lowerMessage.includes('rdv')) {
                addBotMessage("Vous pouvez prendre rendez-vous :\n- En ligne via notre page 'Prendre rendez-vous'\n- Par téléphone au 04 78 XX XX XX\n- Directement en agence\n\nNous proposons des rendez-vous en visioconférence ou en agence selon votre préférence.");
            }
            else if (lowerMessage.includes('heure') || lowerMessage.includes('horaire')) {
                addBotMessage("Nos agences sont ouvertes :\n- Du lundi au vendredi : 9h-19h\n- Le samedi : 9h-12h\n\nLes heures de conduite sont programmées selon vos disponibilités, y compris en soirée et le samedi.");
            }
            else if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello')) {
                addBotMessage("Bonjour ! Comment puis-je vous aider aujourd'hui ?");
            }
            else if (lowerMessage.includes('merci')) {
                addBotMessage("Je vous en prie ! N'hésitez pas si vous avez d'autres questions.");
            }
            else if (lowerMessage.includes('au revoir') || lowerMessage.includes('bye')) {
                addBotMessage("Au revoir ! Merci d'avoir discuté avec moi. À bientôt chez Marietton !");
            }
            else {
                addBotMessage("Je n'ai pas complètement compris votre demande. Pourriez-vous reformuler ou choisir parmi ces sujets : tarifs, inscription, agences, parrainage, rendez-vous ?");
            }
        }, 800);
    }
}

/**
 * Initialisation de la FAQ
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqSearchInput = document.getElementById('faq-search-input');
    const categoryButtons = document.querySelectorAll('.category-button');
    const faqNoResults = document.querySelector('.faq-no-results');
    
    // Ouvrir/fermer les questions de la FAQ
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', function() {
                    item.classList.toggle('active');
                    
                    // Changer l'icône
                    const icon = this.querySelector('.faq-toggle i');
                    if (icon) {
                        if (icon.classList.contains('fa-plus')) {
                            icon.classList.remove('fa-plus');
                            icon.classList.add('fa-minus');
                        } else {
                            icon.classList.remove('fa-minus');
                            icon.classList.add('fa-plus');
                        }
                    }
                });
            }
        });
    }
    
    // Recherche dans la FAQ
    if (faqSearchInput) {
        faqSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            let hasResults = false;
            
            faqItems.forEach(item => {
                const questionText = item.querySelector('.faq-question h3').textContent.toLowerCase();
                const answerText = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                    item.style.display = 'block';
                    hasResults = true;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Afficher le message "Aucun résultat" si nécessaire
            if (faqNoResults) {
                faqNoResults.style.display = hasResults ? 'none' : 'block';
            }
        });
    }
    
    // Filtrage par catégorie
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Retirer la classe active de tous les boutons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                let hasResults = false;
                
                faqItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                        hasResults = true;
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // Afficher le message "Aucun résultat" si nécessaire
                if (faqNoResults) {
                    faqNoResults.style.display = hasResults ? 'none' : 'block';
                }
            });
        });
    }
}

/**
 * Initialisation des animations
 */
function initAnimations() {
    // Animation des éléments au défilement
    const animatedElements = document.querySelectorAll('.feature-item, .formation-card, .why-choose-item, .testimonial-card, .team-member, .stat-item');
    
    if (animatedElements.length > 0) {
        // Fonction pour vérifier si un élément est visible
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
            );
        }
        
        // Fonction pour animer les éléments visibles
        function animateElements() {
            animatedElements.forEach(element => {
                if (isElementInViewport(element) && !element.classList.contains('animated')) {
                    element.classList.add('animated');
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }
        
        // Initialiser les styles des éléments
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Animer les éléments au chargement et au défilement
        animateElements();
        window.addEventListener('scroll', animateElements);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const chatbotButton = document.querySelector('.chatbot-button');
    const chatbotPanel = document.querySelector('.chatbot-panel');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotSend = document.querySelector('.chatbot-send');
    const chatbotInput = document.querySelector('.chatbot-input input');

    const state = {
        step: 0,
        selectedPermis: null
    };

    function addMessage(content, isUser = false) {
        const msg = document.createElement('div');
        msg.className = isUser ? 'chatbot-message user' : 'chatbot-message';
        msg.innerHTML = content;
        chatbotMessages.appendChild(msg);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function showInitialOptions() {
        addMessage("Bonjour 👋 Quel permis vous intéresse ?");
        addMessage(`
            <button onclick="selectPermis('B')">🚗 Permis B</button>
            <button onclick="selectPermis('A')">🏍️ Permis A</button>
            <button onclick="selectPermis('Boîte Auto')">⚙️ Boîte Auto</button>
        `);
    }

    window.selectPermis = function(type) {
        state.selectedPermis = type;
        addMessage(`Vous avez choisi le permis ${type}`, true);
        showFormuleOptions();
    }

    function showFormuleOptions() {
        addMessage("Quelle formule souhaitez-vous ?");
        addMessage(`
            <button onclick="selectFormule('Classique')">📘 Classique</button>
            <button onclick="selectFormule('Accélérée')">⚡ Accélérée</button>
            <button onclick="selectFormule('Accompagnée')">👨‍👧 Accompagnée</button>
        `);
    }

    window.selectFormule = function(formule) {
        addMessage(`Formule ${formule} sélectionnée ✅`, true);
        addMessage(`Voici nos tarifs et infos pour le permis ${state.selectedPermis} - ${formule} : <br>➡️ Prix : 2496€ <br>➡️ Heures remboursables si non utilisées.<br><br><a href='rendez-vous.html'>Prendre rendez-vous</a>`);
    }

    chatbotButton.addEventListener('click', () => {
        chatbotPanel.classList.toggle('open');
        if (state.step === 0) {
            showInitialOptions();
            state.step = 1;
        }
    });

    chatbotClose.addEventListener('click', () => {
        chatbotPanel.classList.remove('open');
    });

    chatbotSend.addEventListener('click', () => {
        const userInput = chatbotInput.value.trim();
        if (userInput !== '') {
            addMessage(userInput, true);
            chatbotInput.value = '';
            addMessage("Merci ! Un conseiller vous répondra bientôt.");
        }
    });
});
