// Aqui eu coloquei em JS porque não sei qual linguagem vamos usar 
// Só uma demonstração de como ficaria o layout do menu
document.addEventListener('DOMContentLoaded', function () {
    const toggleMenu = document.getElementById('toggle-menu');
    const barraLateral = document.querySelector('aside');

    toggleMenu.addEventListener('click', function () {
        barraLateral.classList.toggle('expande');
    });
});

const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sCrm = document.querySelector('#m-crm')
const sEpecialidade = document.querySelector('#m-especialidade')
const btnAdicionar = document.querySelector('#btnAdicionar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sCrm.value = itens[index].crm
    sEpecialidade.value = itens[index].especialidade

    id = index
  } else {
    sNome.value =  ''
    sCrm.value = ''
    sEpecialidade.value =  ''
  }
  
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.id}</td>
    <td>${item.nome}</td>
    <td>${item.crm}</td>
    <td>${item.especialidade}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnAdicionar.onclick = e => {
  
  if (sNome.value == '' || sCrm.value == '' || sEpecialidade.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].crm = sCrm.value
    itens[id].especialidade = sEpecialidade.value
  } else {
    itens.push({'id': id, 'nome': sNome.value, 'crm':sCrm.value, 'especialidade': sEpecialidade.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()