let title = document.querySelector('#title')
let price = document.querySelector('#price')
let taxes = document.querySelector('#taxes')
let ads = document.querySelector('#ads')
let discount = document.querySelector('#discount')
let total = document.querySelector('.total span')
let count = document.querySelector('#count')
let catg = document.querySelector('#catg')
let create = document.querySelector('.create')
let table = document.querySelector('table');

let clickSearch = document.querySelector('.search-title');
let inputSearch = document.querySelector('#search');
let  deleteButton = document.querySelector('.delete');
let deleteSpan = document.querySelector('.delete span');


function totalPrice() {
    total.innerHTML = Number(price.value) + Number(taxes.value) + Number(ads.value) - Number(discount.value);
}

function submitData(e) {

    let allClassId = document.querySelectorAll('table .id');

    let numallClassId = allClassId.length;

    let numberOfCount = Number(count.value);

    currentElements +=numberOfCount;
    
    for (let index = 0; index < numberOfCount; index++) {
        
        let tr = document.createElement('tr');

        let td = document.createElement('td');
        td.className = 'id';
        td.innerHTML = ++numallClassId;
        tr.appendChild(td);

        let td1 = document.createElement('td');
        td1.innerHTML = title.value;
        tr.appendChild(td1);

        let td2 = document.createElement('td');
        td2.innerHTML = price.value;
        tr.appendChild(td2);

        let td3 = document.createElement('td');
        td3.innerHTML = taxes.value;
        tr.appendChild(td3);

        let td4 = document.createElement('td');
        td4.innerHTML = ads.value;
        tr.appendChild(td4);

        let td5 = document.createElement('td');
        td5.innerHTML = discount.value;
        tr.appendChild(td5);

        let td6 = document.createElement('td');
        td6.innerHTML = total.innerHTML;
        tr.appendChild(td6);

        let td7 = document.createElement('td');
        td7.innerHTML = catg.value;
        tr.appendChild(td7);

        let td8 = document.createElement('td');
        td8.innerHTML = 'Update';
        td8.className = 'update'
        td8.style.color = 'darkcyan';
        td8.style.cursor = 'pointer';
        tr.appendChild(td8);

        let td9 = document.createElement('td');
        td9.innerHTML = 'Delete';
        td9.className = 'delete'
        td9.style.color = 'fuchsia';
        td9.style.cursor = 'pointer';
        tr.appendChild(td9);

        table.appendChild(tr);
        localStorage.setItem('table',table.innerHTML);
    }
}

if (localStorage.getItem('table')) {
    table.innerHTML = localStorage.getItem('table');
}

let allTrEle = document.querySelectorAll('table tr');
let currentElements = allTrEle.length -1;
// localStorage.clear();

function deleteElement(params) {
    let deleteItem = document.querySelectorAll('table .delete');
    let allTr = document.querySelectorAll('table tr');

    deleteItem.forEach((element,index) => {
        element.onclick = (ele) => {
            allTr[index + 1].remove();
            currentElements--;
            deleteAll();
            updateId();

            for (let i = 1; i < allTr.length; i++) {
                allTr[i].style.display = '';
                
            }
            localStorage.setItem('table',table.innerHTML);
        }
    });
}
deleteElement();

function updateId( ) {
    let allClassId = document.querySelectorAll('table .id');
    let index = 1;
    allClassId.forEach(element => {
        element.innerHTML = index++;
    });
}

function updateValueForm(params) {
    let updateItem = document.querySelectorAll('table .update');
    let allTr = document.querySelectorAll('table tr');

    updateItem.forEach((element,index) => {
        element.onclick = (ele) => {
            title.value = allTr[index + 1].querySelectorAll('td')[1].innerHTML;
            price.value = allTr[index + 1].querySelectorAll('td')[2].innerHTML;
            taxes.value = allTr[index + 1].querySelectorAll('td')[3].innerHTML;
            ads.value = allTr[index + 1].querySelectorAll('td')[4].innerHTML;
            discount.value = allTr[index + 1].querySelectorAll('td')[5].innerHTML;
            total.innerHTML = allTr[index + 1].querySelectorAll('td')[6].innerHTML;
            catg.value = allTr[index + 1].querySelectorAll('td')[7].innerHTML;
            localStorage.setItem('update',index);

            updateForm();
            editForm();
        }
    });
}

updateValueForm();

function updateForm() {
    count.style.display = 'none';
    create.innerHTML = 'Update';
}

function editForm(params) {
    let allTr = document.querySelectorAll('table tr');

    // Click On Update
    create.onclick = () => {
        let getIndexToUpdate = Number(localStorage.getItem('update'));
        allTr[getIndexToUpdate + 1].querySelectorAll('td')[1].innerHTML = title.value;
        allTr[getIndexToUpdate + 1].querySelectorAll('td')[2].innerHTML = price.value;
        allTr[getIndexToUpdate + 1].querySelectorAll('td')[3].innerHTML = taxes.value;
        allTr[getIndexToUpdate + 1].querySelectorAll('td')[4].innerHTML = ads.value;
        allTr[getIndexToUpdate + 1].querySelectorAll('td')[5].innerHTML = discount.value;
        allTr[getIndexToUpdate + 1].querySelectorAll('td')[6].innerHTML = total.innerHTML;
        allTr[getIndexToUpdate + 1].querySelectorAll('td')[7].innerHTML = catg.value;

        for (let i = 1; i < allTr.length; i++) {
            allTr[i].style.display = '';
            
        }
        localStorage.setItem('table',table.innerHTML);

        count.style.display = 'block';
        create.innerHTML = 'Create';
    }
}

function searchByTitle(event) {
    event.preventDefault();

    inputSearch.value = '';
    if (localStorage.getItem('table')) {
        table.innerHTML = localStorage.getItem('table')
    }

    inputSearch.setAttribute('placeholder','Search by title');
    let allTr = document.querySelectorAll('table tr');

    inputSearch.onkeyup = () => {
        for (let index = 1; index < allTr.length; index++) {
            let findTitle =allTr[index].querySelectorAll('td')[1].innerHTML;
            
            if (findTitle.toLowerCase().indexOf(inputSearch.value.toLowerCase()) > -1) {
                allTr[index].style.display = '';
            }else {
                allTr[index].style.display = 'none';
            }
            
        }
    }
    inputSearch.onkeyup = () => {
        for (let index = 1; index < allTr.length; index++) {
            let findTitle =allTr[index].querySelectorAll('td')[1].innerHTML;
            
            if (findTitle.toLowerCase().indexOf(inputSearch.value.toLowerCase()) > -1) {
                allTr[index].style.display = '';
            }else {
                allTr[index].style.display = 'none';
            }
            
        }
    }
    updateValueForm();
    deleteElement();
}

function searchByCategory(event) {
    event.preventDefault();

    
    inputSearch.value = '';
    if (localStorage.getItem('table')) {
        table.innerHTML = localStorage.getItem('table')
    }

    inputSearch.setAttribute('placeholder','Search by category');
    let allTr = document.querySelectorAll('table tr');

    inputSearch.onkeyup = () => {
        for (let index = 1; index < allTr.length; index++) {
            let findId =allTr[index].querySelectorAll('td')[7].innerHTML;
            
            if (findId.toLowerCase().indexOf(inputSearch.value.toLowerCase()) > -1) {
                allTr[index].style.display = '';
            }else {
                allTr[index].style.display = 'none';
            }
        }
    }
    updateValueForm();
    deleteElement();
}

function deleteAll() {
    if (currentElements > 1) {
        deleteButton.style.display = 'block';
        deleteSpan.innerHTML = currentElements;
    }else {
        deleteButton.style.display = 'none';
    }
    deleteButton.onclick = () => {
        allTrEle.forEach((element ,index)=> {
            if(index) {
                element.remove();
            }
        });
        localStorage.setItem('table',table.innerHTML);
    }
}
deleteAll();
