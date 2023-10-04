import React, { Fragment,useContext,useState } from 'react';
import './Create.css';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Header from '../Header/Header';
import {storage,firestore} from '../../firebase/config'
import {AuthContext} from '../../store/Context'
import { addDoc, collection } from 'firebase/firestore';
import Swal from 'sweetalert2';
const Create = () => {
  const navigate = useNavigate()
  const {user} = useContext(AuthContext)
  const [name,setName]=useState()
  const [category,setCategory] = useState()
  const [price,setPrice] = useState()
  const [image,setImage] = useState()
  const handleSubmit = ()=>{    
        const storageRef = ref(storage,`/images/${image.name}`)
        uploadBytes(storageRef,image)
        .then((snip)=>{
            getDownloadURL(snip.ref)
        .then((url)=>{
            console.log(url)
            try {
              const docRef = addDoc(collection(firestore, 'products'), {
                name,
                category,
                price,
                userId: user.uid,
                createdAt: new Date().toISOString(),
                imageUrl: url, // Include the download URL of the image
              });
              navigate('/')
            } catch (error) {
              Swal.fire('Sorry!Please login to add products..')
            }

            
          })
          .catch((error)=>{
            Swal.fire(error.message)
          })
        })
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              onChange={e=>setName(e.target.value)}
              name="Name"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={e=>setCategory(e.target.value)}
              name="category"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" value={price} onChange={e=>setPrice(e.target.value)} type="number" id="fname" name="Price" />
            <br />
       
          <br />
          <img src={image?URL.createObjectURL(image):null} alt="image" width="200px" height="200px" ></img>
            <br />
            <input onChange={e=>setImage(e.target.files[0])} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
