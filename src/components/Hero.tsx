import { ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function Hero() {
  return (
    <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Bienvenido a Nuestro
            <span className="text-blue-600"> Proyecto Web</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Una experiencia digital moderna y funcional diseñada con las mejores prácticas del desarrollo web.
            Construido con React, Next.js y TailwindCSS.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg">
              Comenzar Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button variant="outline" size="lg" className="text-lg">
              <Play className="mr-2 h-5 w-5" />
              Ver Demo
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-blue-600 text-3xl font-bold mb-2">100%</div>
              <div className="text-gray-600">Responsive Design</div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-green-600 text-3xl font-bold mb-2">A+</div>
              <div className="text-gray-600">Performance Score</div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-purple-600 text-3xl font-bold mb-2">WCAG</div>
              <div className="text-gray-600">Accessibility Compliant</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
