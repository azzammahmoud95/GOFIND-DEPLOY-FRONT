import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NotAuthImage from '../../assests/Illustration/401 Error Unauthorized-amico.svg';
import styles from './Unauthorized.module.css';

export default function Unauthorized() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <section className={styles.ErrorPage}>
      <div className={styles.AllElements}>
        <img src={NotAuthImage} alt="Error Page" width={'100%'} />
        <h1 style={{ color: '#455A64', fontFamily: 'Roboto', fontWeight: '700', letterSpacing: '0.1rem' }}>
          Back again to <Link to="/" onClick={goBack} style={{ color: '#28A745', fontWeight: '700', textDecoration: 'underline' }}>gofind</Link>
        </h1>
      </div>
    </section>
  );
}