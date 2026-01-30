export default function PromoBanner() {
  // ====================================
  // 🖼️ CAMBIAR IMAGEN DEL BANNER PROMOCIONAL
  // ====================================
  // Reemplaza la URL a continuación con la ruta de tu imagen de banner promocional
  // Recomendación: Usar una imagen de 1920x400px o similar (formato panorámico)
  // Ejemplo: "/images/banner-promocion.jpg" o la URL de tu imagen
  const bannerImage = "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=1920&h=400&fit=crop"

  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-primary">
      {/* Imagen del banner */}
      <img
        src={bannerImage}
        alt="Banner Promocional"
        className="w-full h-full object-cover"
      />

      {/* Overlay oscuro opcional para mejorar legibilidad del texto */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Contenido sobre la imagen (opcional - puedes eliminarlo si solo quieres la imagen) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          {/* <h2 className="text-4xl md:text-5xl font-bold mb-4">Promoción Especial</h2>
          <p className="text-xl md:text-2xl">Arrienda desde $99.990/mes</p> */}
        </div>
      </div>
    </div>
  )
}
