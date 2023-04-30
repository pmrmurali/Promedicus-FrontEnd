import React, { useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import api from "../api/admission";
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import "../index.css";

const CreateAdmission = () => {
    const initialAdmission = { name : "",  birthDate : "", gender : "", category : "Normal"};
    const [formAdmissionDetails,setFormAdmissionDetails] = useState(initialAdmission);
    const [formErrors,setFormErrors] = useState({});
    const [IsSubmit,setIsSubmit] = useState(false);
    const navigate = useNavigate();
 

    const handleChange = (e) =>{ 
        const {name,value} = e.target;
       setFormAdmissionDetails({...formAdmissionDetails, [name]: value });
            
    };
    
   const handleSubmit = (e) =>{  

        e.preventDefault();
        setFormErrors(validate(formAdmissionDetails));
        setIsSubmit(true);

    };

    const validate = (values) => 
    {
      const errors = {};

      if(!values.name){
        errors.name = "Name is Required";
      }
      if(!values.birthDate){
        errors.birthDate = "BirthDate is Required";
      }
      if(!values.gender){
        errors.gender = "Sex is Required";
      }

      if(!values.category){
        errors.category = "Category is Required";
      }

      return errors;
    }

    const postFormData = () =>
    {
         api.post("/admissions",formAdmissionDetails).then(res=> {
            //console.log('Posting Data', res);
            navigate('/admissions');}).catch(err=> console.log(err));
    };

    useEffect(() => {

        if(Object.keys(formErrors).length === 0 && IsSubmit )
        {
             postFormData();
        }

    },[formErrors]);
    return (
        <div>
            <form className="validateForm" onSubmit={handleSubmit}>
                <div className="container">
                    <h3 className="d-flex justify-content-left">
                        Create Admission
                    </h3>
                    <div className="form-group col-md-6 create-form" >
                        <div className='mb-3'>
                            <p style={{color: "red"}}>{formErrors.name}</p>
                            <p style={{color: "red"}}>{formErrors.birthDate}</p>
                            <p style={{color: "red"}}>{formErrors.gender}</p>
                            <p style={{color: "red"}}>{formErrors.category}</p>
                        </div>                        
                        <div className='mb-3'>
                            <label className='form-label d-inline'>Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input type="text" name="name" value={formAdmissionDetails.name}  onChange={handleChange} className='form-control d-inline' style={{width : '55%'}}/>
                        </div>
                        <div className=''>
                            <label className='form-label'>BirthDate:&nbsp;&nbsp;&nbsp;</label>
                            <DatePicker dateFormat="yyyy-MM-dd"  selected={formAdmissionDetails.birthDate} maxDate={new Date()}  onChange={(date) => setFormAdmissionDetails({...formAdmissionDetails, birthDate: date })} style={{width : '60%'}}/>
                        </div>
                        <div className='mb-3 sex-margin'>
                            <label className='form-label'>Sex:&nbsp;&nbsp;&nbsp;</label>
                            <div className='form-check form-check-inline'>
                            <input type="radio" name="gender" value="Female"  onChange={handleChange} className='form-check-input'/>
                            <label className='form-check-label'>Feamle</label>
                            </div>
                            <div className='form-check form-check-inline'>
                            <input type="radio" name="gender" value="Male"  onChange={handleChange} className='form-check-input'/>
                            <label className='form-check-label'>Male</label>
                            </div>
                            <div className='form-check form-check-inline'>
                            <input type="radio" name="gender" value="Intersex"  onChange={handleChange} className='form-check-input'/>
                            <label className='form-check-label'>Intersex</label>
                            </div>
                            <div className='form-check form-check-inline'>
                            <input type="radio" name="gender" value="Unknown"  onChange={handleChange} className='form-check-input'/>
                            <label className='form-check-label'>Unknown</label>
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Category:&nbsp;&nbsp;&nbsp;</label>
                            <select name="category" value={formAdmissionDetails.category}  onChange={handleChange}  className='form-control category-inline'>
                                 <option key="Normal" value="Normal">Normal</option>
                                 <option key="Inpatient" value="Inpatient">Inpatient</option>
                                 <option key="Emergency" value="Emergency">Emergency</option>
                                 <option key="Outpatient" value="Outpatient">Outpatient</option>
                            </select>                           
                        </div> 
 
                        <div className='mb-3'>
                            <button type="submit" className="btn btn-primary">Create</button>
                        </div>                                                                     
                    </div>
                    
                </div>
            </form>
        </div>
    );
};

export default CreateAdmission;