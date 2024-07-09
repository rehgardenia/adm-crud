document.addEventListener('DOMContentLoaded', function () {
  const toggleMenu = document.getElementById('toggle-menu');
  const barraLateral = document.querySelector('aside');

  toggleMenu.addEventListener('click', function () {
      barraLateral.classList.toggle('expande');
  });

  loadItens();
});

const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sCrm = document.querySelector('#m-crm');
const sEpecialidade = document.querySelector('#m-especialidade');
const btnAdicionar = document.querySelector('#btnAdicionar');

let id;

function openModal(edit = false, index = 0) {
  modal.classList.add('active');

  modal.onclick = e => {
      if (e.target.className.indexOf('modal-container') !== -1) {
          modal.classList.remove('active');
      }
  };

  if (edit) {
      const item = itens[index];
      sNome.value = item.nome;
      sCrm.value = item.crm;
      sEpecialidade.value = item.especialidade;
      id = item.id;
  } else {
      sNome.value = '';
      sCrm.value = '';
      sEpecialidade.value = '';
      id = undefined;
  }
}

function editItem(index) {
  openModal(true, index);
}

function deleteItem(index) {
  const item = itens[index];
  fetch(`http://localhost:3000/medicos/${item.id}`, {
      method: 'DELETE'
  }).then(response => response.json())
    .then(() => {
        loadItens();
    });
    console.log("deletado")
}

function insertItem(item, index) {
  let tr = document.createElement('tr');
  tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.nome}</td>
      <td>${item.crm}</td>
      <td>${item.especialidade}</td>
      <td class="acao">
          <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
      </td>
      <td class="acao">
          <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
      </td>
  `;
  tbody.appendChild(tr);

}

btnAdicionar.onclick = e => {
  e.preventDefault();

  const medico = {
      nome: sNome.value,
      crm: sCrm.value,
      especialidade: sEpecialidade.value,
  };

  if (id !== undefined) {
      fetch(`http://localhost:3000/medicos/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(medico)
      }).then(response => response.json())
        .then(() => {
            loadItens();
            modal.classList.remove('active');
        });
  } else {
      fetch('http://localhost:3000/medicos', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(medico)
      }).then(response => response.json())
        .then(() => {
            loadItens();
            modal.classList.remove('active');
        });
        console.log("POST")
  }
};

function loadItens() {
  fetch('http://localhost:3000/medicos')
      .then(response => response.json())
      .then(data => {
          itens = data;
          tbody.innerHTML = '';
          itens.forEach((item, index) => {
              insertItem(item, index);
          });
      });
}

let itens = [];
