setTimeout(() => {
    // Delete Action
    const btnDl = document.querySelectorAll('.delete-product');
    console.log(btnDl);
    let deleteId = null;
    btnDl.forEach(dl => {
        dl.addEventListener('click', (Event) => {
            // get id
            deleteId = event.currentTarget.dataset.id;
            console.log('EventListenerId', deleteId);

            // fetch delete
            async function deleteAction() {
                try {
                    //get token
                    const token = localStorage.getItem('jwt_token');
                    console.log(token)

                    // fetch api
                    const api = await fetch(`http://127.0.0.1:8000/api/product/${deleteId.toString()}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization':  `Bearer ${token}`
                        }
                    })

                    // check response
                    if(!api.ok) {
                        throw new Error(`HTTP error! Status: ${api.status}`);
                    }

                    // get response
                    const { data } = await api.json();
                } catch (error) {
                    // show error
                    console.log('Fetch Failed', error.message);
                }
            }

            deleteAction();
        });
    });




    // Show Action
    const btnSh = document.querySelectorAll('.show-product');
    console.log(btnSh);
    let showId = null;
    btnSh.forEach(sh => {
        sh.addEventListener('click', (event) => {
            // get id
            showId = event.currentTarget.dataset.id;
            console.log('EventListenerId', showId);

            // fetch show
            async function getProduct() {
                try {
                    // get token
                    const token = localStorage.getItem('jwt_token');

                    // fetch api
                    const api = await fetch(`http://127.0.0.1:8000/api/product/${showId.toString()}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    const { data } = await api.json();

                    RenderProduct(data);
                } catch (error) {
                    console.error('Fetch Failed:', error.message);
                    document.getElementById('data-form').innerHTML = 'Failed to load data.';
                }
            }

            getProduct();
        });

        // render product data
        function RenderProduct(product) {
            console.log('render product ');
            const container = document.getElementById('data-form');
            console.log(container)
            console.log('after container');
            let htmlContent = `
                <div class="form-group">
                    <label for="inputNama">Name:</label>
                    <input type="text" placeholder="${product.name}" readonly id="inputNama">
                </div>
                <div class="form-group">
                    <label for="inputDesc">Description:</label>
                    <textarea type="text" class="text-area" height="100px" placeholder="${product.description}" readonly id="inputDesc"></textarea>
                </div>
                <div class="form-group">
                    <label for="inputPrice">Price:</label>
                    <input type="text" placeholder="${product.price}" readonly id="inputPrice">
                </div>
                <div class="form-group">
                    <label for="Stock">Stock:</label>
                    <input type="text" placeholder="${product.stock}" readonly id="Stock">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-closed" onclick="closeModalShow()">Close</button>
                </div>                
            `;        
            console.log('content');
            console.log(htmlContent)

            container.innerHTML = htmlContent;
        }
    });




    // edit Action
    const btnEd = document.querySelectorAll('.edit-product');
    console.log(btnEd);
    let editId = null;
    btnEd.forEach(sh => {
        sh.addEventListener('click', (event) => {
            // get id
            editId = event.currentTarget.dataset.id;
            console.log('EventListenerId', editId);

            // fetch edit
            async function getProduct() {
                try {
                    // get token
                    const token = localStorage.getItem('jwt_token');

                    // fetch api
                    const api = await fetch(`http://127.0.0.1:8000/api/product/${editId.toString()}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    const { data } = await api.json();

                    RenderUpdate(data);
                } catch (error) {
                    console.error('Fetch Failed:', error.message);
                    document.getElementById('data-update').innerHTML = 'Failed to load data.';
                }
            }

            getProduct();
        });

        // render update product data
        function RenderUpdate(product) {
            console.log('masuk 1');
            const container = document.getElementById('data-update');
            console.log(container)
            console.log('masuk 2');

            let ie1 = document.getElementById('name');
            let ie2 = document.getElementById('description');
            let ie3 = document.getElementById('price');
            let ie4 = document.getElementById('Stock');

            let htmlContent = `
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" value="${product.name}"  id="name">
                </div>
                <div class="form-group">
                    <label for="description">Description:</label>
                    <textarea type="text" class="text-area" height="100px" id="description">${product.description}</textarea>
                </div>
                <div class="form-group">
                    <label for="price">Price:</label>
                    <input type="text" value="${product.price}"  id="price">
                </div>
                <div class="form-group">
                    <label for="stock">Stock:</label>
                    <input type="text" value="${product.stock}" id="stock">
                </div>
                <div class="form-group">
                    <label for="image"><b>Image</b></label>
                    <input type="file" name="image" id="image"></input>
                </div>
                <div class="modal-footer">
                    <button type="button" onclick="closeModalEdit()" class="btn-closed">Close</button>
                    <button type="submit" data-id=${product.id} class="edit-data btn-save">Save</button>
                </div>                
            `;        
            console.log('masuk 3');

            container.innerHTML = htmlContent;

            const btnSave = document.querySelector('.edit-data');
            btnSave.addEventListener('click', (event) => {
                event.preventDefault();

                async function editProduct() {        
                try {
                    editId = event.currentTarget.dataset.id;
                    console.log('EventListenerId', editId);
                    const name = document.getElementById('name').value;
                    const description = document.getElementById('description').value;
                    const price = document.getElementById('price').value;
                    const stock = document.getElementById('stock').value;
                    const file = document.getElementById('image').files[0];

                    const formData = new FormData();
                    formData.append('name', name);                         
                    formData.append('description', description);                         
                    formData.append('price', price);                         
                    formData.append('stock', stock);                         
                    formData.append('image_url', file);

                    console.log(formData);

                    const token = localStorage.getItem('jwt_token');
                    console.log('masuk 2')
                    const api = await fetch(`http://127.0.0.1:8000/api/product/${editId.toString()}`, {
                        method: 'PUT',
                        headers: {               
                            'Authorization': `Bearer ${token}`               
                        },
                        body: formData
                    })
                    console.log('masuk 3')

                    if(!api.ok) {
                        throw new Error(`HTTP error! Status: ${api.status}`);
                    }            
                    console.log('masuk 4')

                    const { data } = await api.json()            
                    console.log('masuk 5')
                } catch (error) {
                    console.error('Fetch Failed:', error.message);            
                }    
            }

            editProduct();
            })
        }

        
    });

}, 200);


// create action
const btnEl = document.querySelector('.create');

const clickHandler = () => {
    async function createProduct() {
        try {
            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            const price = document.getElementById('price').value;
            const stock = document.getElementById('stock').value;
            const file = document.getElementById('image').files[0];

            const formData = new FormData();
            formData.append('name', name);                         
            formData.append('description', description);                         
            formData.append('price', price);                         
            formData.append('stock', stock);                         
            formData.append('image_url', file);

            console.log(formData);

            const token = localStorage.getItem('jwt_token');
            console.log('masuk 2')
            const api = await fetch('http://127.0.0.1:8000/api/product', {
                method: 'POST',
                headers: {           
                    'Authorization': `Bearer ${token}`               
                },
                body: formData 
            })
            console.log('masuk 3')

            if(!api.ok) {
                throw new Error(`HTTP error! Status: ${api.status}`);
            }            
            console.log('masuk 4')

            const { data } = await api.json()            
            console.log('masuk 5')
        } catch (error) {
            console.error('Fetch Failed:', error.message);            
        }    
    }

    createProduct();
}

btnEl.addEventListener('click', clickHandler);