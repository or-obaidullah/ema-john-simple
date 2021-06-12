import React, { useContext } from 'react';
import {useForm} from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
            <input placeholder='Enter Your Name' defaultValue={loggedInUser.name} {...register("name", { required: true })} />
            {errors.name && <span className='error'>This field is required</span>}

            <input placeholder='Enter Your Email' defaultValue={loggedInUser.email} {...register("email", { required: true })} />
            {errors.email && <span className='error'>This field is required</span>}

            <input placeholder="Enter Address"  {...register("phone", { required: true })} />
            {errors.phone && <span className='error'>This field is required</span>}

            <input placeholder="Enter Phone Number" {...register("address", { required: true })} />
            {errors.address && <span className='error'>This field is required</span>}

            <input type="submit" />
        </form>
    );
};

export default Shipment;