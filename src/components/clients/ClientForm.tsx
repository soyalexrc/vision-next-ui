'use client';
import { z } from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Client, Service, SubService } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { ClientFormSchema } from '@/lib/interfaces/Client';
import { createClient, updateClient } from '@/actions/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarIcon, PlusIcon, Settings, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ServicesForm from '@/components/services/admin/ServicesForm';
import { getServices, getSubServices } from '@/actions/service';
import SubServicesForm from '@/components/services/admin/SubServicesForm';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { es } from 'date-fns/locale/es';

type Props = {
  data: Client;
  onCloseModal?: () => void;
};

export default function ClientForm({ data }: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof ClientFormSchema | any>>({
    resolver: zodResolver(ClientFormSchema),
    defaultValues: data.id ? { ...data } : {},
  });

  const {
    fields: zones,
    append: appendZone,
    remove: removeZone,
  } = useFieldArray({
    control: form.control,
    name: 'zonesOfInterest',
  });

  const {
    fields: features,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control: form.control,
    name: 'essentialFeatures',
  });

  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [subServiceList, setSubServiceList] = useState<SubService[]>([]);

  const watchedContactFrom = form.watch('contactFrom');
  const watchedServiceName = form.watch('serviceName');
  const watchedSubServiceName = form.watch('subServiceName');
  const watchedTypeOfPerson = form.watch('typeOfPerson');
  const watchedPersonHeadquarters = form.watch('personHeadquarters');

  async function onSubmit(values: z.infer<typeof ClientFormSchema>) {
    if (values.id !== 0) {
      const { success, error } = await updateClient(values);
      if (success) {
        toast.success('Se actualizo el cliente con exito!');
        router.back();
      } else {
        toast.error(`Ocurrio un error al intentar actualizar el cliente: ${error}`);
        console.log(error);
      }
    } else {
      const { success, error } = await createClient(values);
      if (success) {
        toast.success('Se registro el cliente con exito!');
        router.back();
      } else {
        toast.error(`Ocurrio un error al intentar registrar el cliente: ${error}`);
        console.log(error);
      }
    }
  }

  function formatErrorSection(key: string) {
    switch (key) {
      case 'name':
        return 'Nombre';
      case 'lastname':
        return 'Apellido';
      case 'email':
        return 'Correo electronico';
      case 'phoneNumber':
        return 'Numero de telefono';
      default:
        return key;
    }
  }

  useEffect(() => {
    callServices();
  }, []);

  async function callServices() {
    if (!data.id) {
      form.setValue('subServiceName', '');
    }
    const { data: services, error, success } = await getServices();
    if (success) {
      setServiceList(services);
      callSubServices(watchedServiceName!, services);
    } else {
      toast.error(error);
    }
  }

  async function callSubServices(parentName: string, list?: Service[]) {
    const service = list ? list.find((s) => s.title === parentName) : serviceList.find((s) => s.title === parentName);
    if (service) {
      const { data: services, error, success } = await getSubServices(service.id);
      if (success) {
        setSubServiceList(services);
      } else {
        toast.error(error);
      }
    } else {
      return;
    }
  }

  function handleDeleteAction(id: number) {
    const updatedList = serviceList.filter((item) => item.id !== id);
    setServiceList(updatedList);
  }

  function handleDeleteSubServiceAction(id: number) {
    const updatedList = subServiceList.filter((item) => item.id !== id);
    setSubServiceList(updatedList);
  }

  useEffect(() => {
    if (watchedServiceName) {
      callSubServices(watchedServiceName);
    }
  }, [watchedServiceName]);

  function getServiceByName(name: string | undefined) {
    if (!name) return undefined;
    return serviceList.find((s) => s.title === name)!;
  }

  return (
    <div className="p-4">
      <h1 className="text-4xl mb-4">{data.id ? 'Edicion de cliente' : 'Registro de cliente'}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="py-4">
          <div className="grid grid-cols-12 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-3">
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-3">
                  <FormLabel>Telefono</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactFrom"
              render={({ field }) => (
                <FormItem className={watchedContactFrom === 'Referido' ? 'col-span-12 lg:col-span-3' : 'col-span-12 lg:col-span-6'}>
                  <FormLabel>De donde nos contacta?</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value ? field.value.toString() : ''}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una opcion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key="Mercado libre" value="Mercado libre">
                        Mercado libre
                      </SelectItem>
                      <SelectItem key="Instagram" value="Instagram">
                        Instagram
                      </SelectItem>
                      <SelectItem key="Facebook" value="Facebook">
                        Facebook
                      </SelectItem>
                      <SelectItem key="Whatsapp" value="Whatsapp">
                        Whatsapp
                      </SelectItem>
                      <SelectItem key="Llamada" value="Llamada">
                        Llamada
                      </SelectItem>
                      <SelectItem key="Mensajeria de texto" value="Mensajeria de texto">
                        Mensajeria de texto
                      </SelectItem>
                      <SelectItem key="Pagina web" value="Pagina web">
                        Pagina web
                      </SelectItem>
                      <SelectItem key="Cliente recurrente" value="Cliente recurrente">
                        Cliente recurrente
                      </SelectItem>
                      <SelectItem key="Referido" value="Referido">
                        Referido
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {watchedContactFrom === 'Referido' && (
              <FormField
                control={form.control}
                name="referrer"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-3">
                    <FormLabel>Alaido (referido)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="col-span-12 lg:col-span-6  flex items-end gap-2">
              <FormField
                control={form.control}
                name="serviceName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Tipo de servicio</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value ? field.value.toString() : ''} disabled={!serviceList}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una opcion" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {serviceList.map((service) => (
                          <SelectItem key={service.id} value={service.title}>
                            {service.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Dialog>
                <DialogTrigger>
                  <Button type="button" size="icon" className="w-[40px]" disabled={!serviceList}>
                    <Settings size={18} />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confguracion de servicios</DialogTitle>
                    <DialogDescription>Aqui podras agregar, editar y eliminar servicios de manera rapida.</DialogDescription>
                  </DialogHeader>
                  <ServicesForm data={serviceList} onDelete={handleDeleteAction} onRefresh={callServices} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="col-span-12 lg:col-span-6  flex items-end gap-2">
              <FormField
                control={form.control}
                name="subServiceName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Tipo de operacion</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value ? field.value.toString() : ''}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una opcion" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subServiceList.map((subService) => (
                          <SelectItem key={subService.id} value={subService.service}>
                            {subService.service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Dialog>
                <DialogTrigger>
                  <Button type="button" size="icon" className="w-[40px]" disabled={!serviceList}>
                    <Settings size={18} />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confguracion de operaciones</DialogTitle>
                    <DialogDescription>
                      Aqui podras agregar, editar y eliminar operaciones asociadas a servicios de manera rapida.
                    </DialogDescription>
                  </DialogHeader>
                  <SubServicesForm
                    data={subServiceList}
                    services={serviceList}
                    defaultService={getServiceByName(watchedServiceName)}
                    onDelete={handleDeleteSubServiceAction}
                    onRefresh={() => callSubServices(watchedServiceName!)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <FormField
              control={form.control}
              name="isPotentialInvestor"
              render={({ field }) => (
                <FormItem className="col-span-12 flex items-end gap-2">
                  <FormControl>
                    <Checkbox onCheckedChange={field.onChange} defaultChecked={field.value} />
                  </FormControl>
                  <FormLabel>Es potencial inversionista</FormLabel>
                </FormItem>
              )}
            />

            <Separator className="my-4 col-span-12" />

            {watchedServiceName && watchedSubServiceName && (
              <>
                <h2 className="text-2xl col-span-12 text-center mb-4">
                  {watchedServiceName.includes('Servicio') || watchedServiceName.includes('servicio')
                    ? watchedServiceName
                    : `Servicio ${watchedServiceName}`}{' '}
                  - {watchedSubServiceName}
                </h2>

                <FormField
                  control={form.control}
                  name="propertyOfInterest"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                      <FormLabel>Inmueble</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value ? field.value.toString() : ''}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una opcion" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem key="Apartamento" value="Apartamento">
                            Apartamento
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                      <FormLabel>Ubicacion</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                      <FormLabel>Empresa</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specificRequirement"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Solicitud especifica</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Solicitud especifica..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="my-6 col-span-12" />

                {/*TODO DATE FIELD*/}
                <FormField
                  control={form.control}
                  name="appointmentDate"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                      <FormLabel>Fecha de cita</FormLabel>
                      <br />
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                type="button"
                                variant={'outline'}
                                className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                              >
                                {field.value ? format(field.value, 'PPP', { locale: es }) : <span>Seleccionar fecha</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" locale={es} selected={field.value} onSelect={field.onChange} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/*TODO DATE FIELD*/}
                <FormField
                  control={form.control}
                  name="interestDate"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                      <FormLabel>Fecha de interes</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                type="button"
                                variant={'outline'}
                                className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                              >
                                {field.value ? format(field.value, 'PPP', { locale: es }) : <span>Seleccionar fecha</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" locale={es} selected={field.value} onSelect={field.onChange} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="usageProperty"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                      <FormLabel>Actividad económica a desarrollar</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="aspiredPrice"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                      <FormLabel>Precio aspirado</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="propertyLocation"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                      <FormLabel>Zona</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="my-6 col-span-12" />

                {/*TODO DATE FIELD*/}
                <FormField
                  control={form.control}
                  name="arrivingDate"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                      <FormLabel>Fecha de llegada</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                type="button"
                                variant={'outline'}
                                className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                              >
                                {field.value ? format(field.value, 'PPP', { locale: es }) : <span>Seleccionar fecha</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" locale={es} selected={field.value} onSelect={field.onChange} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/*TODO DATE FIELD*/}
                <FormField
                  control={form.control}
                  name="checkoutDate"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                      <FormLabel>Fecha de salida</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                type="button"
                                variant={'outline'}
                                className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                              >
                                {field.value ? format(field.value, 'PPP', { locale: es }) : <span>Seleccionar fecha</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" locale={es} selected={field.value} onSelect={field.onChange} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amountOfPeople"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                      <FormLabel>Cantidad de personas</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amountOfNights"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                      <FormLabel>Cantidad de noches</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amountOfYounger"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                      <FormLabel>Cantidad de menores de edad</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amountOfPets"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                      <FormLabel>Cantidad de mascotas</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reasonOfStay"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Motivo de hospedaje</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Motivo de hospedaje..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="my-6 col-span-12" />

                <FormField
                  control={form.control}
                  name="typeOfPerson"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                      <FormLabel>Tipo de persona</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value ? field.value.toString() : ''}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una opcion" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem key="Natural" value="Natural">
                            Natural
                          </SelectItem>
                          <SelectItem key="Juridica" value="Juridica">
                            Juridica
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {/*  Si es natural*/}
                {watchedTypeOfPerson === 'Natural' && (
                  <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                      <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                        <FormLabel>Ocupacion</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/*  Si es juridica*/}
                {watchedTypeOfPerson === 'Juridica' && (
                  <>
                    <FormField
                      control={form.control}
                      name="personEntry"
                      render={({ field }) => (
                        <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                          <FormLabel>Rubro</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/*  Si es juridica*/}
                    <FormField
                      control={form.control}
                      name="personHeadquarters"
                      render={({ field }) => (
                        <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                          <FormLabel>Sede</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value ? field.value.toString() : ''}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona una opcion" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem key="Fisica" value="Fisica">
                                Fisica
                              </SelectItem>
                              <SelectItem key="Virtual" value="Virtual">
                                Virtual
                              </SelectItem>
                              <SelectItem key="Ninguna" value="Ninguna">
                                Ninguna
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    {/*  Si es juridica y headquarters es distinto de ninguna*/}
                    {watchedPersonHeadquarters && watchedPersonHeadquarters !== 'Ninguna' && (
                      <FormField
                        control={form.control}
                        name="personLocation"
                        render={({ field }) => (
                          <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                            <FormLabel>Ubicacion</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </>
                )}

                <Separator className="my-6 col-span-12" />

                <FormField
                  control={form.control}
                  name="typeOfCapture"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                      <FormLabel>Tipo de captacion</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value ? field.value.toString() : ''}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una opcion" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem key="Venta" value="Venta">
                            Venta
                          </SelectItem>
                          <SelectItem key="Alquiler" value="Alquiler">
                            Alquiler
                          </SelectItem>
                          <SelectItem key="Traspaso" value="Traspaso">
                            Traspaso
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {/*  Si typeofcaptrure es traspaso*/}
                <FormField
                  control={form.control}
                  name="typeOfBusiness"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                      <FormLabel>Tipo de negocio</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="propertyDistribution"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                      <FormLabel>Distribucion de propiedad</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="remodeledAreas"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                      <FormLabel>Areas remodeladas</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="m2"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                      <FormLabel>Metros cuadrados (m2)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem className="col-span-12 ">
                      <FormLabel>Nota</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <div className="col-span-12 md:col-span-6">
              <p className="text-xl mb-5">Posibles zonas de interes</p>
              {zones.length < 1 && (
                <div className="my-5">
                  <div className="p-12 bg-muted rounded-xl">
                    <p className="text-gray-400 text-center">No has agregado podibles zonas de interes.</p>
                  </div>
                </div>
              )}
              <ul>
                {zones.map((item, index) => (
                  <div key={item.id} className="flex items-end gap-2 mb-4">
                    <FormField
                      control={form.control}
                      name={`zonesOfInterest.${index}`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button size="icon" variant="ghost" type="button" onClick={() => removeZone(index)}>
                      <Trash2 size={18} className="text-destructive" />
                    </Button>
                  </div>
                ))}
                <div className="w-full flex justify-center mt-5">
                  <Button type="button" className="flex gap-2 items-center" variant="outline" onClick={() => appendZone('')}>
                    <PlusIcon size={18} />
                    agregar nueva zona
                  </Button>
                </div>
              </ul>
            </div>

            <div className="col-span-12 md:col-span-6">
              <p className="text-xl mb-5">Caracteristicas esenciales</p>
              {features.length < 1 && (
                <div className="my-5">
                  <div className="p-12 bg-muted rounded-xl">
                    <p className="text-gray-400 text-center">No has agregado caracteristicas.</p>
                  </div>
                </div>
              )}
              <ul>
                {features.map((item, index) => (
                  <div key={item.id} className="flex items-end gap-2 mb-4">
                    <FormField
                      control={form.control}
                      name={`essentialFeatures.${index}`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button size="icon" variant="ghost" type="button" onClick={() => removeFeature(index)}>
                      <Trash2 size={18} className="text-destructive" />
                    </Button>
                  </div>
                ))}
                <div className="w-full flex justify-center mt-5">
                  <Button type="button" className="flex gap-2 items-center" variant="outline" onClick={() => appendFeature('')}>
                    <PlusIcon size={18} />
                    agregar nueva caracteristica
                  </Button>
                </div>
              </ul>
            </div>
          </div>

          {Object.keys(form.formState.errors).length > 0 && (
            <Alert variant="destructive" className="mt-5">
              <AlertTitle>Existen errores en las siguientes secciones del formulario</AlertTitle>
              <AlertDescription>
                <ul>
                  {Object.keys(form.formState.errors).map((key) => (
                    <li key={key}>
                      <span className="mr-2">*</span>
                      <span>{formatErrorSection(key)}</span>
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-center gap-3 mt-10">
            <Button disabled={form.formState.isSubmitting} type="submit" className="w-full lg:w-auto bg-red-900">
              {form.formState.isSubmitting && (
                <div className="w-4 h-4 border-4 mr-2 border-solid border-t-transparent rounded-full animate-spin"></div>
              )}
              {form.formState.isSubmitting ? 'Guardando cambios...' : 'Guardar cambios'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
