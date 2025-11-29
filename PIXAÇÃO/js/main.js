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
                    date: new Date().toLocaleDateString('pt-BR'),
                    time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                });
                localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
                
                // Limpar campo
                document.getElementById('feedback-text').value = '';
                
                // Atualizar lista
                displayFeedbacks();
                
                // Mensagem de sucesso estilizada
                showMessage('Feedback enviado com sucesso!', 'success');
            } else {
                showMessage('Por favor, digite seu feedback!', 'error');
            }
        });
    }
    
    function displayFeedbacks() {
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
        feedbackList.innerHTML = '';
        
        if (feedbacks.length === 0) {
            feedbackList.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    <h3 style="color: #6a0dad;">Nenhum feedback ainda</h3>
                    <p>Seja o primeiro a compartilhar sua opinião!</p>
                </div>
            `;
            return;
        }
        
        feedbacks.forEach((feedback, index) => {
            const feedbackElement = document.createElement('div');
            feedbackElement.className = 'card';
            feedbackElement.innerHTML = `
                <div class="card-content">
                    <h3>📝 FEEDBACK #${index + 1}</h3>
                    <p style="font-size: 1.1rem; line-height: 1.6;">${feedback.text}</p>
                    <div style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #e6e6fa;">
                        <small style="color: #6a0dad; font-weight: bold;">
                            📅 ${feedback.date} 🕒 ${feedback.time}
                        </small>
                    </div>
                </div>
            `;
            feedbackList.appendChild(feedbackElement);
        });
    }
    
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            background: ${type === 'success' ? 'linear-gradient(135deg, #6a0dad, #8a2be2)' : '#ff4444'};
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
    
    // Carregar feedbacks ao iniciar
    displayFeedbacks();
});