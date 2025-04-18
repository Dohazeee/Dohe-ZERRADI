/**
 * Script pour la page de prise de rendez-vous
 * Développé par Doha ZERRADI
 * Version 1.0 - Avril 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    initAppointmentType();
    initCalendar();
    initTimeSlots();
    initAppointmentForms();
});

/**
 * Initialisation du choix du type de rendez-vous (visio ou agence)
 */
function initAppointmentType() {
    const appointmentOptions = document.querySelectorAll('.appointment-option');
    const formContainers = document.querySelectorAll('.form-container');
    
    if (appointmentOptions.length > 0 && formContainers.length > 0) {
        appointmentOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Retirer la classe active de toutes les options
                appointmentOptions.forEach(opt => opt.classList.remove('active'));
                
                // Ajouter la classe active à l'option cliquée
                this.classList.add('active');
                
                // Afficher le formulaire correspondant
                const type = this.getAttribute('data-type');
                formContainers.forEach(container => {
                    container.classList.remove('active');
                    if (container.classList.contains(type + '-form')) {
                        container.classList.add('active');
                    }
                });
            });
        });
    }
}

/**
 * Initialisation du calendrier
 */
function initCalendar() {
    const calendarContainers = document.querySelectorAll('.calendar-container');
    
    if (calendarContainers.length > 0) {
        calendarContainers.forEach(container => {
            const calendar = container.querySelector('.calendar');
            const currentMonthElement = container.querySelector('.current-month');
            const prevMonthButton = container.querySelector('.prev-month');
            const nextMonthButton = container.querySelector('.next-month');
            
            // Date actuelle
            let currentDate = new Date();
            let currentMonth = currentDate.getMonth();
            let currentYear = currentDate.getFullYear();
            
            // Générer le calendrier initial
            generateCalendar(calendar, currentMonth, currentYear, currentMonthElement);
            
            // Bouton mois précédent
            if (prevMonthButton) {
                prevMonthButton.addEventListener('click', function() {
                    currentMonth--;
                    if (currentMonth < 0) {
                        currentMonth = 11;
                        currentYear--;
                    }
                    generateCalendar(calendar, currentMonth, currentYear, currentMonthElement);
                });
            }
            
            // Bouton mois suivant
            if (nextMonthButton) {
                nextMonthButton.addEventListener('click', function() {
                    currentMonth++;
                    if (currentMonth > 11) {
                        currentMonth = 0;
                        currentYear++;
                    }
                    generateCalendar(calendar, currentMonth, currentYear, currentMonthElement);
                });
            }
        });
    }
}

/**
 * Génère le calendrier pour un mois donné
 */
function generateCalendar(calendarElement, month, year, monthElement) {
    if (!calendarElement) return;
    
    // Vider le calendrier
    calendarElement.innerHTML = '';
    
    // Mettre à jour le titre du mois
    if (monthElement) {
        const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        monthElement.textContent = `${monthNames[month]} ${year}`;
    }
    
    // Créer les en-têtes des jours de la semaine
    const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day-header';
        dayElement.textContent = day;
        calendarElement.appendChild(dayElement);
    });
    
    // Obtenir le premier jour du mois
    const firstDay = new Date(year, month, 1);
    let startingDay = firstDay.getDay(); // 0 = Dimanche, 1 = Lundi, etc.
    
    // Ajuster pour commencer par Lundi (0 = Lundi, 6 = Dimanche)
    startingDay = startingDay === 0 ? 6 : startingDay - 1;
    
    // Nombre de jours dans le mois
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Date actuelle pour désactiver les jours passés
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Ajouter des espaces vides pour les jours avant le premier jour du mois
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarElement.appendChild(emptyDay);
    }
    
    // Ajouter les jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // Vérifier si le jour est dans le passé
        const currentDay = new Date(year, month, day);
        if (currentDay < today) {
            dayElement.classList.add('disabled');
        } else {
            // Ajouter un événement de clic pour les jours disponibles
            dayElement.addEventListener('click', function() {
                // Retirer la classe active de tous les jours
                document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('active'));
                
                // Ajouter la classe active au jour cliqué
                this.classList.add('active');
                
                // Générer les créneaux horaires pour ce jour
                generateTimeSlots(currentDay);
            });
        }
        
        calendarElement.appendChild(dayElement);
    }
}

/**
 * Initialisation des créneaux horaires
 */
function initTimeSlots() {
    // Les créneaux horaires seront générés dynamiquement lorsqu'un jour est sélectionné
}

/**
 * Génère les créneaux horaires pour un jour donné
 */
function generateTimeSlots(date) {
    const timeSlotsContainers = document.querySelectorAll('.time-slots-container');
    
    if (timeSlotsContainers.length > 0) {
        timeSlotsContainers.forEach(container => {
            // Vider le conteneur
            container.innerHTML = '';
            
            // Déterminer les créneaux disponibles en fonction du jour de la semaine
            const dayOfWeek = date.getDay(); // 0 = Dimanche, 1 = Lundi, etc.
            let startHour, endHour;
            
            if (dayOfWeek === 0) {
                // Dimanche - Fermé
                const message = document.createElement('p');
                message.className = 'no-slots-message';
                message.textContent = 'Aucun créneau disponible le dimanche. Veuillez sélectionner un autre jour.';
                container.appendChild(message);
                return;
            } else if (dayOfWeek === 6) {
                // Samedi - 9h à 12h
                startHour = 9;
                endHour = 12;
            } else {
                // Lundi au vendredi - 9h à 19h
                startHour = 9;
                endHour = 19;
            }
            
            // Générer les créneaux horaires
            for (let hour = startHour; hour < endHour; hour++) {
                // Créneaux de 30 minutes
                for (let minute = 0; minute < 60; minute += 30) {
                    if (hour === endHour - 1 && minute === 30) continue; // Éviter le dernier créneau à l'heure de fermeture
                    
                    const timeSlot = document.createElement('div');
                    timeSlot.className = 'time-slot';
                    
                    // Formater l'heure (ex: 9:00, 9:30, 10:00, etc.)
                    const formattedHour = hour.toString().padStart(2, '0');
                    const formattedMinute = minute.toString().padStart(2, '0');
                    timeSlot.textContent = `${formattedHour}:${formattedMinute}`;
                    
                    // Simuler des créneaux déjà réservés de manière aléatoire
                    if (Math.random() < 0.3) {
                        timeSlot.classList.add('disabled');
                    } else {
                        timeSlot.addEventListener('click', function() {
                            // Retirer la classe active de tous les créneaux
                            container.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('active'));
                            
                            // Ajouter la classe active au créneau cliqué
                            this.classList.add('active');
                        });
                    }
                    
                    container.appendChild(timeSlot);
                }
            }
        });
    }
}

/**
 * Initialisation des formulaires de rendez-vous
 */
function initAppointmentForms() {
    const appointmentForms = document.querySelectorAll('.appointment-form');
    
    if (appointmentForms.length > 0) {
        appointmentForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Vérifier si un jour et un créneau horaire ont été sélectionnés
                const formContainer = this.closest('.form-container');
                const selectedDay = formContainer.querySelector('.calendar-day.active');
                const selectedTimeSlot = formContainer.querySelector('.time-slot.active');
                
                if (!selectedDay) {
                    alert('Veuillez sélectionner un jour pour votre rendez-vous.');
                    return;
                }
                
                if (!selectedTimeSlot) {
                    alert('Veuillez sélectionner un créneau horaire pour votre rendez-vous.');
                    return;
                }
                
                // Récupérer les données du formulaire
                const formData = new FormData(this);
                const formDataObj = {};
                formData.forEach((value, key) => {
                    formDataObj[key] = value;
                });
                
                // Ajouter la date et l'heure sélectionnées
                const selectedMonth = formContainer.querySelector('.current-month').textContent;
                formDataObj.date = `${selectedDay.textContent} ${selectedMonth}`;
                formDataObj.time = selectedTimeSlot.textContent;
                
                // Simuler l'envoi des données (dans un environnement réel, cela serait envoyé à un serveur)
                console.log('Données du rendez-vous :', formDataObj);
                
                // Afficher un message de confirmation
                alert(`Votre rendez-vous a été confirmé pour le ${formDataObj.date} à ${formDataObj.time}. Vous recevrez un email de confirmation dans quelques instants.`);
                
                // Réinitialiser le formulaire
                this.reset();
                
                // Réinitialiser les sélections
                if (selectedDay) selectedDay.classList.remove('active');
                if (selectedTimeSlot) selectedTimeSlot.classList.remove('active');
            });
        });
    }
}

function showAppointmentConfirmation(date, time) {
    const confirmation = document.createElement('div');
    confirmation.className = 'appointment-confirmation';
    confirmation.innerHTML = `
        <div class="confirmation-content">
            <h3>✅ Rendez-vous confirmé</h3>
            <p>Nous avons bien enregistré votre rendez-vous pour le <strong>${date}</strong> à <strong>${time}</strong>.</p>
            <p>Un SMS de confirmation vous sera envoyé sous peu 📩</p>
            <button class="cta-button close-confirmation">OK</button>
        </div>
    `;

    document.body.appendChild(confirmation);

    // Fermer le message
    confirmation.querySelector('.close-confirmation').addEventListener('click', () => {
        confirmation.remove();
    });
}

