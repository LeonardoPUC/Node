function Logar() {
    var login = $("#login").val();
    var senha = $("#senha").val();

    var request = new XMLHttpRequest();   // new HttpRequest instance 
    request.open("POST", "/api/seg/login", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var response = JSON.parse(request.responseText)
            localStorage.setItem("token", response.token);
            window.location.href = "produtos.html";
        }
    }
    request.send(JSON.stringify({"login": login, "senha": senha}));
}

function Cadastrar() {
    var login = $("#nome").val();
    var email = $("#email").val();
    var senha = $("#senha").val();

    var request = new XMLHttpRequest();   // new HttpRequest instance 
    request.open("POST", "/api/seg/register", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var response = JSON.parse(request.responseText)
            // localStorage.setItem("token", response.token);
            window.location.href = "produtos.html";
        }
    }
    request.send(JSON.stringify({"login": login, "email": email, "senha": senha}));
}
