const getProducts = "http://127.0.0.1:8000/api/product";
const baseUrl = "http://127.0.0.1:8000";

// setTimeout(() => {
//     const btnAc = document.querySelectorAll('.edit-product');
//     btnEdit = ''; 
//     let elementId = null;
//         btnAc.forEach(ac => {
//             ac.addEventListener('click', (event) => {
//                 elementId = event.currentTarget.dataset.id;
//                 console.log('EventListenerId', elementId);

//                 console.log('luar 1');
//                 async function showEdit() {
//                     try {
//                         console.log('masuk 1');
//                         const token = localStorage.getItem('jwt_token');
//                         console.log('masuk 2');
//                         console.log(token)
//                         console.log('masuk 4');
//                         const api = await fetch(`http://127.0.0.1:8000/api/product/${elementId.toString()}`, {
//                             method: 'GET',
//                             headers: {
//                                 'Content-Type': 'application/json',
//                                 'Authorization':  `Bearer ${token}`
//                             }
//                         })
//                         console.log('masuk 5');

//                         if(!api.ok) {
//                             throw new Error(`HTTP error! Status: ${api.status}`);            
//                         }
//                         console.log('masuk 6');

//                         const { data } = await api.json()                        
//                         console.log('Sebelum render: ', data)
//                         RenderEdit(data)
//                     } catch (error) {
//                         console.log('Fetch Failed', error.message);
//                     }
//                 }
                
//                 console.log('luar 2');                
                
//             })
//         })

//         const btnSubmit = document.get
//             async function Edit() {
//                     try {
//                         const token = localStorage.getItem('jwt_token');
//                         console.log(token)
                        
//                         const api = await fetch(`http://127.0.0.1:8000/api/product/${elementId}`, {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json',
//                                 'Authorization':  `Bearer ${token}`
//                             },
//                             body: JSON.stringify(elementId)                                                        
//                         })                        

//                         if(!api.ok) {
//                             throw new Error(`HTTP error! Status: ${api.status}`);            
//                         }

//                         const { data }  = await api.json();
//                     } catch (error) {
//                         console.log('Fetch Failed', error.message);
//                     }
//                 }
// }, 1500);

async function getData() {
    try {
        const api = await fetch(getProducts)
        if(!api.ok) {
            throw new Error(`HTTP error! Status: ${api.status}`);
        }

        const { data }= await api.json()        

        RenderMenu(data);
        RenderAdmin(data);
    } catch (error) {
        console.error('Fetch Failed:', error.message);
        document.getElementById('data-container').innerHTML = 'Failed to load data.';
    }    
}

function RenderMenu(products) {
    const container = document.getElementById('data-container');
    let htmlContent = '';

    products.forEach(product => {
        htmlContent += `
                <div class="col-sm-6 col-lg-4 mwrap" data-c="burgers" data-aos="fade-up">
                  <div class="mcard"
                     <div class="mimg">
                        <img src=${product.image_url || 'img/assets/null-img.png'} alt=${product.image_url}/>
                     </div>
                     <div class="mbody">
                        <div class="mtit">${product.name}</div>
                        <div class="mdesc">${product.description}</div>
                        <div class="mfoot">
                           <div>
                              <div class="mprice">${product.price_idr}</div>
                              <div class="mstars"><i> Stock </i> <span style="color:#bbb;font-size:.7rem;">${product.stock}</span></div>
                           </div>
                            <input type="text" class="inputId" name="id" id="id" value=${product.id} style="display: none;">         
                            <button class="madd addProduct" id="addProduct" data-id=${product.id} title="View Details"><i class="fas fa-plus"></i></button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
        `;
    });

    container.innerHTML = htmlContent;
}

function RenderAdmin(Products) {
    const container = document.getElementById('data-admin');
    let htmlContent = '';

    Products.forEach(product => {
        htmlContent += `
        <tr>
            <td>${product.name}</td>
            <td>${product.price_idr}</td>
            <td>${product.stock}</td>
            <td class="action">
                <button type="submit" data-id="${product.id}" id="updateModal" class="edit-product" onclick="updateModal()">Edit</button>
                <button type="submit" data-id="${product.id}" id="btnHapus" class="delete-product">Hapus</button>
                <button type="submit" data-id="${product.id}" id="productModal" class="show-product" onclick="productModal()">Lihat</button>
            </td>
        </tr>
        `;
    });   
    
    container.innerHTML = htmlContent;
}

getData();