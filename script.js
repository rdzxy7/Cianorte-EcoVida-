// Abrir e fechar modais
function abrirLogin() {
    document.getElementById("loginModal").style.display = "flex";
}
function fecharLogin() {
    document.getElementById("loginModal").style.display = "none";
}
function abrirCadastro() {
    fecharLogin();
    document.getElementById("cadastroModal").style.display = "flex";
}
function fecharCadastro() {
    document.getElementById("cadastroModal").style.display = "none";
}

// Fecha ao clicar fora
window.onclick = function(event) {
    let loginModal = document.getElementById("loginModal");
    let cadastroModal = document.getElementById("cadastroModal");
    if(event.target === loginModal) fecharLogin();
    if(event.target === cadastroModal) fecharCadastro();
}

// Toggle senha
function toggleSenha(inputId){
    let input = document.getElementById(inputId);
    input.type = input.type === "password" ? "text" : "password";
}

// Cadastro
document.getElementById("formCadastro").addEventListener("submit", function(e){
    e.preventDefault();
    let nome = document.getElementById("nome").value.trim();
    let email = document.getElementById("email").value.trim().toLowerCase();
    let senha = document.getElementById("senhaCadastro").value;

    if(!nome || !email || !senha){
        alert("Preencha todos os campos.");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    if(usuarios.find(u=>u.email===email)){
        alert("E-mail já cadastrado!");
        return;
    }

    usuarios.push({nome,email,senha});
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro concluído!");
    fecharCadastro();
    abrirLogin();
});

// Login
document.getElementById("formLogin").addEventListener("submit", function(e){
    e.preventDefault();
    let email = document.getElementById("usuario").value.trim().toLowerCase();
    let senha = document.getElementById("senha").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    let usuario = usuarios.find(u=>u.email===email && u.senha===senha);

    if(usuario){
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        atualizarLogin();
        fecharLogin();
    } else {
        alert("E-mail ou senha incorretos!");
    }
});

// Atualizar login
function atualizarLogin(){
    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if(usuarioLogado){
        document.getElementById("loginText").textContent = `Olá, ${usuarioLogado.nome}`;
        document.getElementById("btnLogin").disabled = true;
        document.getElementById("welcomeMessage").textContent = `Bem-vindo ao Cianorte EcoVida, ${usuarioLogado.nome}!`;
        document.getElementById("btnLogout").style.display = "inline-block";
    } else {
        document.getElementById("loginText").textContent = "Login";
        document.getElementById("btnLogin").disabled = false;
        document.getElementById("welcomeMessage").textContent = "";
        document.getElementById("btnLogout").style.display = "none";
    }
}

// Logout
function logout(){
    localStorage.removeItem("usuarioLogado");
    atualizarLogin();
}

// Inicializa
window.onload = function(){
    atualizarLogin();
}