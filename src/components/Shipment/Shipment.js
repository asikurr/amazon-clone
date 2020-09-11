import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Col } from 'react-bootstrap';
import { userContext } from '../../App';

const Shipment = () => {

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    const [loggedInUser, setLoggedInUser] = useContext(userContext)

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <div className="container">
            <h2>Shipment Information</h2>
            <div className="row py-5 ">
                <Col md="6">
                        <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
                            <input defaultValue={loggedInUser.name} className="form-control" placeholder="Enter Name" name="name" ref={register({ required: true })} />
                            {errors.name && <small className="text-danger">Name is required</small>}<br/>
                            <input defaultValue={loggedInUser.email} className="form-control" placeholder="Enter Email" name="email" ref={register({ required: true })} />
                            {errors.email && <small className="text-danger">Email is required</small>}<br/>
                            <input className="form-control" placeholder="Enter Number" name="number" ref={register({ required: true })} />
                            {errors.number && <small className="text-danger">Phone number is required</small>}<br/>
                            <input className="form-control" placeholder="Enter Address" name="address" ref={register({ required: true })} />
                            {errors.address && <small className="text-danger">Addtess is required</small>}<br/>
                            <textarea className="form-control" placeholder="Enter your Message" name="message" ref={register({ required: true })} />
                            {errors.message && <small className="text-danger">Message is required</small>}<br/>
                         
                            <input type="submit" className="btn btn-primary d-block" />
                        </form>
                </Col>
            </div>
        </div>

    );
};

export default Shipment;