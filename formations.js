/**
 * Script pour les formations
 * Développé par Doha ZERRADI
 * Version 1.0 - Avril 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    initFormationTabs();
    initFormationComparison();
    initPaymentOptions();
});

/**
 * Initialisation des onglets de formations
 */
function initFormationTabs() {
    const formationTabs = document.querySelectorAll('.formation-tab');
    const formationContents = document.querySelectorAll('.formation-content');
    
    if (formationTabs.length > 0 && formationContents.length > 0) {
        formationTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const formationType = this.getAttribute('data-formation');
                
                // Mettre à jour les onglets actifs
                formationTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Afficher le contenu correspondant
                formationContents.forEach(content => {
                    if (content.getAttribute('data-formation') === formationType) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
    }
}

/**
 * Initialisation du tableau de comparaison des formations
 */
function initFormationComparison() {
    const comparisonToggle = document.querySelector('.comparison-toggle');
    const comparisonTable = document.querySelector('.comparison-table-container');
    
    if (comparisonToggle && comparisonTable) {
        comparisonToggle.addEventListener('click', function() {
            comparisonTable.classList.toggle('active');
            
            // Changer le texte du bouton
            if (comparisonTable.classList.contains('active')) {
                this.textContent = 'Masquer la comparaison';
            } else {
                this.textContent = 'Comparer les formations';
            }
        });
    }
}

/**
 * Initialisation des options de paiement
 */
function initPaymentOptions() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    const paymentDetails = document.querySelectorAll('.payment-details');
    
    if (paymentOptions.length > 0 && paymentDetails.length > 0) {
        paymentOptions.forEach(option => {
            option.addEventListener('click', function() {
                const paymentType = this.getAttribute('data-payment');
                
                // Mettre à jour les options actives
                paymentOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                
                // Afficher les détails correspondants
                paymentDetails.forEach(detail => {
                    if (detail.getAttribute('data-payment') === paymentType) {
                        detail.classList.add('active');
                    } else {
                        detail.classList.remove('active');
                    }
                });
            });
        });
    }
    
    // Calculateur de mensualités
    const loanCalculator = document.querySelector('.loan-calculator');
    if (loanCalculator) {
        const amountInput = loanCalculator.querySelector('#loan-amount');
        const durationInput = loanCalculator.querySelector('#loan-duration');
        const calculateButton = loanCalculator.querySelector('#calculate-loan');
        const resultElement = loanCalculator.querySelector('#loan-result');
        
        if (amountInput && durationInput && calculateButton && resultElement) {
            calculateButton.addEventListener('click', function() {
                const amount = parseFloat(amountInput.value);
                const duration = parseInt(durationInput.value);
                
                if (isNaN(amount) || isNaN(duration) || amount <= 0 || duration <= 0) {
                    resultElement.textContent = 'Veuillez entrer des valeurs valides.';
                    return;
                }
                
                // Taux d'intérêt annuel (exemple : 4.9%)
                const annualRate = 4.9;
                const monthlyRate = annualRate / 100 / 12;
                
                // Calcul de la mensualité (formule de crédit classique)
                const monthlyPayment = amount * monthlyRate * Math.pow(1 + monthlyRate, duration) / (Math.pow(1 + monthlyRate, duration) - 1);
                
                // Afficher le résultat
                resultElement.innerHTML = `
                    <p>Mensualité estimée : <strong>${monthlyPayment.toFixed(2)}€</strong> sur ${duration} mois</p>
                    <p>Montant total : <strong>${(monthlyPayment * duration).toFixed(2)}€</strong></p>
                    <p>Coût du crédit : <strong>${(monthlyPayment * duration - amount).toFixed(2)}€</strong></p>
                    <p><small>Taux d'intérêt annuel : ${annualRate}% (TAEG)</small></p>
                    <p><small>Simulation non contractuelle, sous réserve d'acceptation par notre organisme de crédit partenaire.</small></p>
                `;
            });
        }
    }
}
