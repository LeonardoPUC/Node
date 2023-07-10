window.onload = function () {
    CarregarDadosTabela()
}

function CarregarToken() {
    var token = localStorage.getItem('token');
    if (token) {
        return token;
    }
    else {
        window.location.href = "index.html";
    }
}

function CarregarDadosTabela(productId) {
    var token = CarregarToken();
    var request = new XMLHttpRequest();

    if (productId) {
        request.open("GET", `/api/v2/produtos/${productId}`, true);
        console.log(productId);
    }else{
        request.open("GET", "/api/v2/produtos", true);
    }
    
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader('Authorization', 'Bearer ' + token);
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var bodytable = document.getElementById("bodytable");
            var produtos = JSON.parse(request.responseText);
            bodytable.innerHTML = "";
            produtos.forEach(element => {
                var linha = `<tr><td>${element.id}</td><td>${element.descricao}</td><td>${element.valor}</td><td>${element.marca}</td><td><a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                    <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete" onclick="SalvarId(this)">&#xE872;</i></a></td></tr>`;
                bodytable.innerHTML += linha;
            });
        }
    }
    request.send();
}

function SalvarId(element) {
    var id = element.parentNode.previousElementSibling.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
    document.getElementById("idacao").innerHtml = id;
}

function Filtrar() {
    var productId = document.querySelector("#product-id").value;
        CarregarDadosTabela()
    }
}


function Desfiltrar() {
    CarregarDadosTabela();
}


function Excluir() {
    var id = document.getElementById("idacao").innerHtml;
    if (id){
        var token = CarregarToken();

        var request = new XMLHttpRequest();   // new HttpRequest instance 
        request.open("DELETE", `/api/v2/produtos/${id}`, true);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.setRequestHeader('Authorization', 'Bearer ' + token);
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                var response = JSON.parse(request.responseText);
                CarregarDadosTabela();
                alert(response.message);
            }
        }
        request.send();
    }
}