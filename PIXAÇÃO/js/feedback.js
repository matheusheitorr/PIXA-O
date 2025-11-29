// js/feedback.js
document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submit-feedback');
    const feedbackList = document.getElementById('feedback-list');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const feedbackText = document.getElementById('feedback-text').value;
            
            if (feedbackText.trim()) {
                // Salvar feedback no localStorage
                const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
                feedbacks.push({
                    text: feedbackText,
                    date: new Date().toLocaleDateString('pt-BR')
                });
                localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
                
                // Limpar campo
                document.getElementById('feedback-text').value = '';
                
                // Atualizar lista
                displayFeedbacks();
                
                alert('FEEDBACK ENVIADO COM SUCESSO!');
            } else {
                alert('POR FAVOR, DIGITE SEU FEEDBACK!');
            }
        });
    }
    
    function displayFeedbacks() {
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
        feedbackList.innerHTML = '';
        
        if (feedbacks.length === 0) {
            feedbackList.innerHTML = '<p style="text-align: center; text-transform: uppercase;">NENHUM FEEDBACK AINDA</p>';
            return;
        }
        
        feedbacks.forEach((feedback, index) => {
            const feedbackElement = document.createElement('div');
            feedbackElement.className = 'card';
            feedbackElement.innerHTML = `
                <div class="card-content">
                    <h3>FEEDBACK #${index + 1}</h3>
                    <p>${feedback.text}</p>
                    <p><strong>DATA:</strong> ${feedback.date}</p>
                </div>
            `;
            feedbackList.appendChild(feedbackElement);
        });
    }
    
    // Carregar feedbacks ao iniciar
    displayFeedbacks();
});