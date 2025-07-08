import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCarDetail } from '../../../api/api';

export const useCarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getCarDetail(id)
      .then(data => {
        setCar(data);
        setLoading(false);
      })
      .catch(() => {
        setError('No se pudo cargar el auto');
        setLoading(false);
      });
  }, [id]);

  return { car, loading, error, id };
};