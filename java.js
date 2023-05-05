// functions needed 
// function total
//create function
// save in local storage
//clear inputs
//read
//creat
//delete
//update
//search
//clean data

let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('disc')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('cat')
let submit = document.getElementById('submit')
let state = 'create'
let global_index;

console.log(title, price, taxes, ads, discount, total, count, category, submit)

// function total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value)
            - +discount.value;
        total.innerHTML = result;
        total.style.background = 'blue'
    } else {
        total.innerHTML = 0
        total.style.background = 'red'
    }
}

//create function
let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product)
} else {
    datapro = []
}


submit.onclick = function () {
    let nwproduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }
    if (state === 'create') {
        if (nwproduct.count > 1) {
            for (let i = 0; i < nwproduct.count; i++) {
                datapro.push(nwproduct)
            }
        } else {
            datapro.push(nwproduct)
        }
    } else {
        datapro[global_index] = nwproduct
        state = 'crete'
        submit.innerHTML = 'Create'
        count.style.display = 'block'
    }





    // save local storage
    localStorage.setItem('product', JSON.stringify(datapro))
    clearData()
    showData()

}

function clearData() {
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.value = ''
    total.innerHTML = ''
    count.value = ''
    category.value = ''
}

// //read
function showData() {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `
        <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick='update(${i})' id="update">update</button></td>
            <td><button onclick='deleteRow(${i})' id="delete">delete</button></td>
            
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table
    let btndelete = document.getElementById('deleteAll')
    if (datapro.length > 0) {
        btndelete.innerHTML = `
        <button onclick='deleteAll ()'>Delete All (${datapro.length})</button>
        `
    } else {
        btndelete.innerHTML = '';
    }
    getTotal()
}
showData()



// //delete
function deleteRow(i) {
    datapro.splice(i, 1)
    localStorage.product = JSON.stringify(datapro)
    showData()
}

//delete all
function deleteAll() {
    localStorage.clear()
    datapro.splice(0)
    showData()
}

//update

function update(i) {
    console.log(i)
    title.value = datapro[i].title
    price.value = datapro[i].price
    taxes.value = datapro[i].taxes
    ads.value = datapro[i].ads
    discount.value = datapro[i].discount
    category.value = datapro[i].category
    getTotal()
    count.style.display = 'none'
    submit.innerHTML = 'update'
    state = 'update'
    global_index = i
    scroll({
        top: 0,
        behavior: "smooth"
    })
}



// search

let search = 'title'
let searchactive = document.getElementById('search')

function searchmood(id) {
    if (id == 'searchtitle') {
        search = 'title'
        // searchactive.placeholder = 'search By Title'
    } else {
        search = 'category'
        // searchactive.placeholder = 'search By category'
    }
    search.placeholder = 'search by' + search
    searchactive.focus
    search.value = ''
    showData()
}

function searchdata(value) {
    let table = ''
    if (search == 'title') {
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].title.includes(value.toLoewrCase())) {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].dscount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick='update(${i})' id="update">update</button></td>
                    <td><button onclick='deleteRow(${i})' id="delete">delete</button></td>
                </tr>
                `
            }
        }



    } else {
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].category.includes(value.toLoewrCase())) {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].dscount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick='update(${i})' id="update">update</button></td>
                    <td><button onclick='deleteRow(${i})' id="delete">delete</button></td>
                </tr>
                `

            }
        }


    }
    document.getElementById('tbody').innerHTML = table
}








// ----------------------------------------------------------------





// --------------------------------------------------------------------------
// scroll button

const scrollButton = document.getElementById('scrollBtn');

window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollButton.style.display = "block";
    } else {
        scrollButton.style.display = "none";
    }
};

scrollButton.onclick = function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

};










