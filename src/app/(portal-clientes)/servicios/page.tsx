import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const SERVICES_DATA = [
  {
    title: 'Servicio inmobiliario',
    id: 'servicio-inmobiliario',
    image: '/services/images/servicio-inmobiliario.jpg',
    description: `Intermediacion y asesoría en la compra, venta y alquiler de propiedades, comerciales, residenciales e industriales. Te orientamos hacia el logro de tus objetivos exitosamente, cuidando tus intereses, necesidades y garantizando una operación segura y transparente.`,
    ctaText: 'Ponte en contacto con cualquiera de nuestros ASESORES',
    ctaButton: 'Ir',
  },
  {
    title: 'Administración de contratos de alquiler',
    id: 'admin-contratos-alquiler',
    image: '/services/images/administracion-de-inmuebles.jpg',
    description: `Para aquellos propietarios que no tienen el tiempo, la disposición o el conocimiento de cómo llevar a cabo un seguimiento adecuado de su alquiler, cumpliendo con la formalidad en términos legales.`,
    listTitle: 'Ofrecemos:',
    list: [
      'compañamiento de inicio a fin del contrato de arrendamiento donde el propietarios es permanentemente asesorado por profesionales a nivel legal, administrativo e inmobiliario, para tomar las mejores decisiones de acuerdo a cada situación',
      'Manteniendo un total contacto con el inquilino',
      'Gestionando la cobranza del alquiler en los términos acordados',
      'Haciendo seguimiento al inquilino ante el pago de servicios mensuales concernientes al inmueble',
      'Haciendo inspecciones a la propiedad antes de cada renovación de contrato para garantizar el cuidado y mantenimiento de la misma, y por lo tanto, su preservación en  el tiempo',
      'Verificando inventario de bienes muebles si es el caso para llevar seguimiento del estado de estos ',
      'Efectuando notificaciones y llamados de atención a los inquilinos según lo amerite',
      'Asegurando el mantenimiento de la formalidad legal, a través de los contratos de arrendamiento redactados por Abogados en la materia ',
      'Finalmente orientamos tanto a los propietarios como a sus inquilinos de las responsabilidades de cada quien ante cada situación existente.',
    ],
    ctaText: 'Contáctanos y pide una cita sin  ningún costo con  nuestra administradora y ella te guiara en lo que necesites',
    ctaButton: 'Ir',
  },
  {
    title: 'Trámites legales',
    id: 'tramites-legales',
    image: '/services/images/tramites-legales.jpg',
    description: `Asesoramos y gestionamos a través de Abogados en el área, los trámites legales que requieran y necesiten nuestros clientes`,
    listTitle: 'Ofrecemos:',
    list: [
      'Desde la redacción de contratos de arrendamiento, compraventa, poderes',
      'Así como la gestión de inscripción o actualización de cédulas catastrales, viviendas principales, formas 33, tramitación de liberación de hipoteca',
      'E incluso la permisología requerida para las empresas que alquilan propiedades comerciales, así como, permisos de bomberos, uso conforme, licencia de actividades económicas, permiso de publicidad, permisos sanitarios, inscripción en los entes parafiscales del estado, incluso la constitución de la empresa en sí y las actas de asamblea que requieran para la modificación y actualización de su compañía.',
    ],
    ctaText:
      'Contáctanos y pide una cita gratis con uno de nuestros abogados para asesorarte en lo que requieras, sin ningún tipo de compromiso',
    ctaButton: 'Ir',
  },
  {
    title: 'Gestión contable',
    id: 'gestion-contable',
    image: '/services/images/gestion-contable.jpg',
    description: `Enfocado principalmente para nuestros clientes comerciales, pequeñas y medianas empresas que requieran llevar su contabilidad al dia y evitar ser multados por no llevar una gestión contable oportuna.`,
    listTitle: 'Ofrecemos:',
    list: [
      'Declaraciones de impuestos al día tanto SENIAT como Alcaldía ',
      'Libros de compra y venta.',
      'Balances',
      'Estado de ganancias y pérdidas',
      'Estados financieros',
      'Asesoría ante cada fiscalización',
      'Respaldo físico y digital del trabajo efectuado.',
    ],
    ctaText: 'Contáctanos y pide una cita gratis con nuestro contador para aclarar tus inquietudes sin ningún tipo de compromiso',
    ctaButton: 'Ir',
  },
  {
    title: 'Servicio de limpieza - Ama de llaves',
    id: 'servicio-limpieza',
    image: '/services/images/ama-de-llaves.jpg',
    description: `Ofrecemos el servicio de mantenimiento enfocado para inmuebles residenciales y comerciales.`,
    listTitle: 'Te brindamos:',
    list: [
      'Tarifas diarias para exclusivamente nuestro servicio de limpieza',
      'Planes de mantenimiento mensual personalizado, ya que es creado y organizado por nuestros clientes según su necesidad y presupuesto, en el cual, garantizamos nuestro servicio de limpieza con servicios complementarios como lavado, planchado, organización de espacios, incluso jardinería.',
      'Llegamos hasta tu ubicación',
      'Personal identificado',
      'Encuesta de satisfacción ante cada servicio',
    ],
    ctaText: 'Contáctanos y preguntanos por nuestras tarifas y planes, conoce a detalle lo que tenemos para ofrecerte.',
    ctaButton: 'Ir',
  },
  {
    title: 'Remodelación de espacios',
    id: 'remodelacion',
    image: '/services/images/remodelacion.jpg',
    description: `A través de nosotros puedes llevar a cabo cualquier obra de remodelación de tu propiedad comercial, residencial e industrial. Te asesoramos en cuanto a diseño, materiales y costos. Adaptamos tu presupuesto a tu objetivo para que juntos materialicemos lo que andas buscando.`,
    ctaText: 'Ponte en contacto con cualquiera de nuestros ASESORES',
    ctaButton: 'Ir',
  },
  {
    title: 'Servicio Técnico de equipos',
    id: 'mantenimiento',
    image: '/services/images/mantenimiento.jpg',
    description: `Para tus electrodomésticos, aires acondicionados, lavadoras, artefactos de cocina y entretenimiento, estamos a tu orden para brindarte solución ante cualquier instalación o reparación de tus equipos.`,
    ctaText: 'Contacta a nuestro personal técnico y te haremos una evaluación gratis.',
    ctaButton: 'Ir',
  },
];

export default function Services() {
  return (
    <>
      <section className="relative w-full h-[300px] md:h-[550px]">
        <Image src="/banners/servicios.png" className="object-center" objectFit="cover" fill alt="Banner publicitario de inmuebles" />
        {/*<img src="/about/aboutBanner.jpg" className="h-[200px] object-cover lg:h-full" alt="" />*/}
        {/*<div className="absolute top-0 left-0 w-full h-full bg-black-opacity flex justify-center items-center flex-col">*/}
        {/*  <h2 className="text-white text-xl lg:text-4xl tracking-widest mb-2">Conoce nuestro servicios</h2>*/}
        {/*  <p className="text-white text-sm lg:text-xl text-center">*/}
        {/*    Es nuestro trabajo el proporcionarte el tipo de inmueble que más se ajuste a sus intereses*/}
        {/*  </p>*/}
        {/*</div>*/}
      </section>
      <section className=" my-5 px-4 lg:px-24 grid gap-4 grid-cols-1 lg:grid-cols-12">
        <div className="order-2 lg:order-1 lg:col-span-3">
          <h3 className="text-3xl text-center mb-2 lg:mb-4">Mas informacion</h3>
          <p className="text-sm text-center">Si deseas más información sobre esta propiedad, por favor, rellena el formulario.</p>

          <div className="my-5">
            <Input className="mb-4" type="text" placeholder="Nombres y apellidos" />
            <Input className="mb-4" type="email" placeholder="Email" />
            <Input className="mb-4" type="tel" placeholder="Telefono" />
            <Textarea className="w-full" />
            <div className="my-5 gap-2 flex items-center">
              <Checkbox defaultChecked />
              <span className="text-xs">
                He leido y acepto los{' '}
                <Link className="text-xs" href="/">
                  terminos y condiciones
                </Link>
              </span>
            </div>

            <div className="flex justify-center">
              <Button className="bg-red-900 text-white">Enviar informacion</Button>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-9">
          <h3 className="text-4xl text-center lg:text-left mb-2 lg:mb-4">Nuestros servicios</h3>

          {SERVICES_DATA.map((service) => (
            <div id={service.id} key={service.title} className="flex flex-wrap items-start gap-4 mb-8  lg:flex-nowrap lg:=]mb-4 ">
              <Image
                src={service.image}
                width={350}
                height={350}
                className="rounded w-full min-w-[350px] lg:w-[350px]"
                alt={service.title}
              />
              <div>
                <h4 className="text-2xl mb-2">{service.title}</h4>
                <p className="text-sm">{service.description}</p>
                <div>
                  {service.list && (
                    <div className="my-4">
                      <h5 className="text-lg mb-2 font-bold">{service.listTitle}</h5>
                      <ul>
                        {service.list.map((item) => (
                          <li className="text-sm mb-3" key={item}>
                            - {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {service.ctaText && (
                  <div className="flex flex-col gap-5">
                    <p className="mt-5 font-bold text-red-900">{service.ctaText}</p>
                    <Link href="/contacto">
                      <Button size="sm" className="bg-red-900 text-white">
                        Haz Click Aqui
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
