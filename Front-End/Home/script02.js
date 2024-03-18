document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('crud-form');
    const searchButton = document.getElementById('search');
    const showDataButton = document.getElementById('show-data');
    const dataContainer = document.getElementById('data-container');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      // Aqui você pode adicionar a lógica para lidar com o envio do formulário
      // por exemplo, enviar os dados para o servidor
      // e realizar a operação CRUD com base na ação selecionada
      console.log('Formulário enviado!');
    });
  
    searchButton.addEventListener('click', function () {
      // Aqui você pode adicionar a lógica para buscar dados com base nos critérios fornecidos
      console.log('Buscando dados...');
    });
  
    showDataButton.addEventListener('click', function () {
      // Aqui você pode adicionar a lógica para exibir os dados buscados
      // no contêiner de dados (dataContainer)
      dataContainer.innerHTML = '<p>Dados Exibidos Aqui</p>';
    });
  });