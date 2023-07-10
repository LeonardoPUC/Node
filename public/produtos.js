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

function editarProduto(id, nome, valor, marca, token) {
    document.getElementById('descricao').value = nome;
    document.getElementById('valor').value = valor;
    document.getElementById('marca').value = marca;
    
    var token = CarregarToken();

    // Exibe o modal
    $('#editEmployeeModal').modal('show');
  
    // Manipula o evento de envio do formulário
    document.querySelector('form').addEventListener('submit', function(event) {
      event.preventDefault(); // Impede o envio padrão do formulário
  
      // Obtém os valores atualizados dos campos do modal
      var novaDescricao = document.getElementById('descricao').value;
      var novoValor = document.getElementById('valor').value;
      var novaMarca = document.getElementById('marca').value;
  
      // Cria um objeto com os valores atualizados
      var dadosAtualizados = {
        descricao: novaDescricao,
        valor: novoValor,
        marca: novaMarca
      };
  
      // Converte o objeto para JSON
      var json = JSON.stringify(dadosAtualizados);
  
      // Cria uma nova requisição XMLHttpRequest
      var xhr = new XMLHttpRequest();
      
      // Configura a requisição
      xhr.open('PUT', '/caminho-do-seu-endpoint/' + id, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', 'Bearer ' + token); // Inclui o token no cabeçalho
  
      // Manipula a resposta da requisição
      xhr.onload = function() {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          // Manipule a resposta do servidor como desejar
          console.log(data);
        } else {
          // Manipule erros de requisição aqui
          console.error('Erro na requisição. Código de status:', xhr.status);
        }
      };
  
      // Envia a requisição com o JSON como corpo
      xhr.send(json);
  
      // Fecha o modal após a requisição
      $('#editEmployeeModal').modal('hide');
    });
  }
  
  
  









// function atualizarDados() {
//     var id = document.getElementById("edit").innerHtml;
//     if (id){
//         var token = CarregarToken();

//         var request = new XMLHttpRequest();   // new HttpRequest instance 
//         request.open("PUT", `/api/v2/produtos/${id}`, true);
//         request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//         request.setRequestHeader('Authorization', 'Bearer ' + token);
//         request.onreadystatechange = function () {
//             if (request.readyState == 4 && request.status == 200) {
//                 var response = JSON.parse(request.responseText);
//                 CarregarDadosTabela();
//                 alert(response.message);
//             }
//         };

//         var requestBody = JSON.stringify({
//             descricao: descricao,
//             valor: valor,
//             marca: marca
//         });
//         request.send(requestBody);
//     }
// }

// function AtualizarDados() {
//     var id = document.getElementById("id").value;
//     var descricao = document.getElementById("descricao").value;
//     var valor = document.getElementById("valor").value;
//     var marca = document.getElementById("marca").value;
    
//     var token = CarregarToken();

//     var request = new XMLHttpRequest();
//     request.open("PUT", `/api/v2/produtos/${id}`, true);  // /api/v2/produtos/${id}
//     request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//     request.setRequestHeader('Authorization', 'Bearer' + token);
//     request.onreadystatechange = function () {
//         if (request.readyState == 4 && request.status == 200) {
//             var response = JSON.parse(request.responseText);
//             alert(response.message);
//             CarregarDadosTabela();
//         }
//     };

//     var requestBody = JSON.stringify({
//         descricao: descricao,
//         valor: valor,
//         marca: marca
//     });
//     request.send(requestBody);
// }
  


  