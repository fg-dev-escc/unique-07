import img from '../../assets/Logo.jpg';

export const Logo = () => {
  return (
    <div className="contenedorLogo">
      <div style={{display:'flex', justifyContent:'flex-start'}}>
        <img src={img} alt="Logo" className='logo' />
      </div>
    </div>
  )
}
