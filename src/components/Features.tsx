import { Zap, Shield, Smartphone, Globe, Code, Users } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Rendimiento Rápido',
      description: 'Optimizado para velocidad máxima con tiempos de carga mínimos y experiencia fluida.'
    },
    {
      icon: Shield,
      title: 'Seguridad Garantizada',
      description: 'Implementación de las mejores prácticas de seguridad para proteger tus datos.'
    },
    {
      icon: Smartphone,
      title: 'Diseño Responsive',
      description: 'Perfecta visualización en todos los dispositivos, desde móviles hasta desktops.'
    },
    {
      icon: Globe,
      title: 'SEO Optimizado',
      description: 'Estructura semántica y optimización para motores de búsqueda para mejor visibilidad.'
    },
    {
      icon: Code,
      title: 'Código Limpio',
      description: 'Código mantenible y escalable siguiendo las mejores prácticas de desarrollo.'
    },
    {
      icon: Users,
      title: 'UX Centrada',
      description: 'Diseño intuitivo enfocado en la experiencia del usuario y accesibilidad.'
    }
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Características Principales
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre las funcionalidades que hacen de este proyecto una solución web completa y moderna.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-6">
                <feature.icon className="h-8 w-8 text-blue-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para empezar?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Únete a nosotros y descubre el potencial de una solución web moderna.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contactar Ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
