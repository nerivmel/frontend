import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import './Inicio.css';
import { fetchFacilityImage } from '../../api/api';

const Inicio = () => {
    const location = useLocation(); 
    const navigate = useNavigate(); 
    const [imageUrl, setImageUrl] = useState('');
    const [facility, setFacility] = useState('');
  
    useEffect(() => {
      async function fetchData() {
        try {
          const { imageUrl, facility } = await fetchFacilityImage(location);
          setImageUrl(imageUrl);
          setFacility(facility);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }, [location]);

    const navigateToDynamicRoute = () => {
        const componentName = location.pathname.split('/')[1].substring('inicio'.length);
        const route = `/${componentName}`;
        navigate(route); 
    };

    return (
        <div className='full-screen' onClick={navigateToDynamicRoute}>
            <div className='wrapper0'>
                <div className='img-container'>
                    {imageUrl && <img src={imageUrl} alt="" className="inicioImg"/>}
                </div>
            </div>
        </div>
    );
}

export default Inicio;
