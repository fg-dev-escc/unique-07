import { doc, onSnapshot, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { db } from '../db/firebase';

// Real-time auction listener - siguiendo el patrón del template único
export const subscribeToAuction = (torreId, callback) => {
  const torreRef = doc(db, 'torres', torreId);
  
  return onSnapshot(torreRef, (documento) => {
    if (documento.exists()) {
      const data = documento.data();
      const fechaFin = data.fechaFin;
      const comentarios = data.comentarios?.sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha)) || [];
      const pujas = data.pujas?.sort((a, b) => b.Monto - a.Monto) || [];
      
      callback({
        id: documento.id,
        fechaFin,
        comentarios,
        pujas: pujas.slice(0, 5), // Solo las top 5 pujas
        pujaMayor: pujas.length > 0 ? {
          monto: pujas[0].Monto,
          usuario: pujas[0].UsuarioPujaID
        } : null,
        ...data
      });
    }
  });
};

// Add bid to auction - patrón del template único
export const addBidToAuction = async (torreId, bidData) => {
  const torreRef = doc(db, 'torres', torreId);
  
  const puja = {
    Monto: bidData.monto,
    UsuarioPujaID: bidData.usuarioID,
    Nickname: bidData.nickname,
    Fecha: new Date().toISOString(),
    Comentario: bidData.comentario || ""
  };
  
  await updateDoc(torreRef, {
    pujas: arrayUnion(puja)
  });
};

// Add comment to auction - patrón del template único  
export const addCommentToAuction = async (torreId, commentData) => {
  const torreRef = doc(db, 'torres', torreId);
  
  const comentario = {
    Comentario: commentData.comentario,
    UsuarioID: commentData.usuarioID,
    Nickname: commentData.nickname,
    Fecha: new Date().toISOString()
  };
  
  await updateDoc(torreRef, {
    comentarios: arrayUnion(comentario)
  });
};

// Real-time car listings listener
export const subscribeToCarListings = (callback) => {
  const carsRef = doc(db, 'listings', 'active');
  
  return onSnapshot(carsRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data().cars || []);
    }
  });
};

// User session management
export const updateUserSession = async (userId, sessionData) => {
  const userRef = doc(db, 'users', userId);
  
  await updateDoc(userRef, {
    lastActivity: serverTimestamp(),
    ...sessionData
  });
};