import React from 'react';
import { useForm } from "react-hook-form";

const AddService = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        fetch("http://localhost:5000/service", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => console.log(result));
    }

    return (
        <div className='w-50 mx-auto'>
            <h2>Please Add A Service</h2>
            <form className='d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                <input className='mb-2' placeholder='Name' {...register("name", { required: true, maxLength: 20 })} />
                <textarea className='mb-2' placeholder='Descripton' {...register("descripton", { required: true })}></textarea>
                <input className='mb-2' placeholder='Price' type="number" {...register("price", { required: true })} />
                <input className='mb-2' placeholder='Photo URL' {...register("img")} />
                <input type="submit" value={"Add Service"} />
            </form>

        </div>
    );
};

export default AddService;