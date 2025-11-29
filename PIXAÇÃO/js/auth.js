// Sistema de Cadastro
document.addEventListener('DOMContentLoaded', function() {
    const registerBtn = document.getElementById('register-btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            
            if (email && password) {
                // Verificar se o usuário já existe
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const userExists = users.some(user => user.email === email);
                
                if (userExists) {
                    document.getElementById('register-message').textContent = 'Este email já está cadastrado!';
                    document.getElementById('register-message').style.color = 'red';
                } else {
                    // Adicionar novo usuário
                    users.push({ email, password });
                    localStorage.setItem('users', JSON.stringify(users));
                    
                    document.getElementById('register-message').textContent = 'Cadastro realizado com sucesso!';
                    document.getElementById('register-message').style.color = 'green';
                    
                    // Limpar campos
                    document.getElementById('register-email').value = '';
                    document.getElementById('register-password').value = '';
                    
                    // Redirecionar para login após 2 segundos
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                }
            } else {
                document.getElementById('register-message').textContent = 'Por favor, preencha todos os campos!';
                document.getElementById('register-message').style.color = 'red';
            }
        });
    }

    // Sistema de Login
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (email && password) {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const validUser = users.find(user => user.email === email && user.password === password);
                
                if (validUser) {
                    document.getElementById('login-message').textContent = 'Login realizado com sucesso!';
                    document.getElementById('login-message').style.color = 'green';
                    
                    // Salvar sessão do usuário
                    localStorage.setItem('currentUser', JSON.stringify(validUser));
                    
                    // Limpar campos
                    document.getElementById('login-email').value = '';
                    document.getElementById('login-password').value = '';
                    
                    // Redirecionar para página inicial após 2 segundos
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 2000);
                } else {
                    document.getElementById('login-message').textContent = 'Email ou senha incorretos!';
                    document.getElementById('login-message').style.color = 'red';
                }
            } else {
                document.getElementById('login-message').textContent = 'Por favor, preencha todos os campos!';
                document.getElementById('login-message').style.color = 'red';
            }
        });
    }
});