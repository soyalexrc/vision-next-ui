'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone } from 'lucide-react';

// Datos de ejemplo - reemplaza con tus datos reales
const teamMembers = [
  {
    id: 1,
    name: 'María González',
    role: 'Asesora',
    location: 'Edo. Carabobo',
    image: '/team/maria.jpeg', // Reemplaza con la ruta real
    phone: '+584265103950',
    email: 'maria@inmobiliaria.com',
  },
  {
    id: 6,
    name: 'Zoraida Herrera',
    role: 'Asesora',
    location: 'Edo. Cojedes',
    image: '/team/zoraida.jpeg',
    phone: '+58 414-0460421',
    email: 'diego@inmobiliaria.com',
  },
  {
    id: 2,
    name: 'Kinsinger Rodríguez',
    role: 'Asesor',
    location: 'Edo. Carabobo',
    image: '/team/kinsinger.jpeg',
    phone: '+58 412-1970313',
    email: 'carlos@inmobiliaria.com',
  },
  {
    id: 6,
    name: 'Yanet López',
    role: 'Asesora',
    location: 'Edo. Carabobo',
    image: '/team/yanet.jpeg',
    phone: '+58 412-4867424',
    email: 'diego@inmobiliaria.com',
  },
  {
    id: 3,
    name: 'Johana Ostos',
    role: 'Asesora',
    location: 'Edo. Carabobo',
    image: '/team/johana.jpeg',
    phone: '+58 412-4867585',
    email: 'ana@inmobiliaria.com',
  },
  {
    id: 4,
    name: 'Miguel López',
    role: 'Asesor',
    location: 'Edo. Carabobo',
    image: '/team/miguel.jpeg',
    phone: '+58 412-7607501',
    email: 'roberto@inmobiliaria.com',
  },
  {
    id: 5,
    name: 'Maria Arrieta',
    role: 'Asesora',
    location: 'Edo. Carabobo',
    image: '/team/marrieta-2.jpeg',
    phone: '+58 426-5446644',
    email: 'patricia@inmobiliaria.com',
  },
];

export default function TeamSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        {/* <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestro Equipo
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conoce a los profesionales que te acompañarán en la búsqueda de tu propiedad ideal
          </p>
        </div> */}

        {/* Grid de miembros del equipo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id} className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                {/* Imagen */}
                <div className="flex justify-center mb-4">
                  <div className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-red-900">
                    <Image src={member.image} alt={member.name} fill className="object-cover" sizes="128px" />
                  </div>
                </div>

                {/* Información */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <div className="flex items-center justify-center text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {member.location}
                  </div>
                </div>

                {/* CTAs de contacto */}
                <div className="flex flex-col gap-2">
                  <Button variant="vision" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Solicitar contacto
                  </Button>
                  {/* <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.location.href = `mailto:${member.email}`}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar Email
                  </Button> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA general */}
        {/* <div className="text-center mt-12">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
            Contactar Equipo Completo
          </Button>
        </div> */}
      </div>
    </section>
  );
}
