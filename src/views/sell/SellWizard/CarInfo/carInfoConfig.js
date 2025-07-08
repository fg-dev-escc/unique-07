export const carInfoConfig = {
  // data
  data: {
    title: "Detalles del Vehículo",
    fields: {
      marca: {
        label: "Marca",
        placeholder: "Seleccionar marca",
        options: ["Toyota", "Honda", "Ford", "BMW", "Mercedes", "Volkswagen"]
      },
      modelo: {
        label: "Modelo",
        placeholder: "Ej: Corolla, Civic, etc."
      },
      año: {
        label: "Año",
        placeholder: "Seleccionar año"
      },
      combustible: {
        label: "Combustible",
        placeholder: "Tipo de combustible",
        options: ["Gasolina", "Diesel", "Híbrido", "Eléctrico"]
      },
      transmision: {
        label: "Transmisión",
        placeholder: "Tipo de transmisión",
        options: ["Manual", "Automática"]
      },
      kilometraje: {
        label: "Kilometraje",
        placeholder: "Kilómetros recorridos"
      },
      color: {
        label: "Color",
        placeholder: "Color del vehículo"
      },
      precio: {
        label: "Precio",
        placeholder: "Precio de venta"
      },
      descripcion: {
        label: "Descripción",
        placeholder: "Describe tu vehículo, menciona características especiales, estado, etc."
      }
    }
  }
};