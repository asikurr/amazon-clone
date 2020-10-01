import React from 'react';
// import fakeData from '../../fakeData';

const ManageInventory = () => {

    const product = {}
    const handleAddProduct = () => {
        fetch('https://infinite-crag-48388.herokuapp.com/addProducts',{
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify(product)
        })
    }
    return (
        <div className="container">
            <h1 className="text-center">Add Products</h1> 
            <div className="row ">
                <div className="col-md-6 mx-auto">
                    <form action="" className="form-group">
                        <label htmlFor="">Product Name</label>
                        <input type="text" placeholder="Product Name" className="form-control" />
                        <label htmlFor="">Product Price</label>
                        <input type="text" placeholder="Product Price" className="form-control" />
                        <label htmlFor="">Product Quantity</label>
                        <input type="text" placeholder="Product Quantity" className="form-control" />
                        <label htmlFor="">Product Image</label>
                        <input type="file" placeholder="Product Image" className="form-control" />
                        <button className="btn btn-primary my-2" onClick={handleAddProduct}>Add Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ManageInventory;