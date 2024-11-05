'use client';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import formatCurrency from '@/utils/format-currency';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ExternalAdviserForm from '@/components/externalAdvisers/ExternalAdviserForm';
import { getExternalAdvisers } from '@/actions/external-adviser';
import { Ally, ExternalAdviser } from '@prisma/client';
import AllyForm from '@/components/allies/AllyForm';
import { getAllies } from '@/actions/ally';
import { useUser } from '@clerk/nextjs';
import { getUsersFromClerk } from '@/actions/users';
import UserForm from '@/components/users/UserForm';

export function NegotiationInformation() {
  const { control, watch } = useFormContext();

  const { user } = useUser();
  const [externalAdvisersLoading, setExternalAdvisersLoading] = useState<boolean>(false);
  const [usersLoading, setUsersLoading] = useState<boolean>(false);
  const [alliesLoading, setAlliesLoading] = useState<boolean>(false);
  const [openExternalAdviser, setOpenExternalAdviser] = useState<boolean>(false);
  const [openAlly, setOpenAlly] = useState<boolean>(false);
  const [openUser, setOpenUser] = useState<boolean>(false);
  const [externalAdvisers, setExternalAdvisers] = useState<ExternalAdviser[]>([]);
  const [users, setUsers] = useState<{ id: string; fullName: string; email: string }[]>([]);
  const [allies, setAllies] = useState<Ally[]>([]);

  const watchedPrice = watch('negotiationInformation.price');
  const watchedMinimumNegotiation = watch('negotiationInformation.minimumNegotiation');

  async function callExternalAdvisers() {
    setExternalAdvisersLoading(true);
    const { data } = await getExternalAdvisers();
    setExternalAdvisersLoading(false);
    if (data && data?.length > 0) {
      setExternalAdvisers(data);
    }
  }

  async function callUsers() {
    setUsersLoading(true);
    const { data } = await getUsersFromClerk();
    setUsersLoading(false);
    console.log(data);
    if (data && data?.length > 0) {
      setUsers(data);
    }
  }

  async function callAllies() {
    setAlliesLoading(true);
    const { data } = await getAllies();
    setAlliesLoading(false);
    if (data && data?.length > 0) {
      setAllies(data);
    }
  }

  async function handleAfterCreateAdviser() {
    setOpenExternalAdviser(false);
    await callExternalAdvisers();
  }

  async function handleAfterCreateAlly() {
    setOpenAlly(false);
    await callAllies();
  }

  async function handleAfterCreateUser() {
    setOpenUser(false);
    await callUsers();
  }

  useEffect(() => {
    callExternalAdvisers();
    callAllies();
    if (user && user.publicMetadata?.role === 'Administrador') {
      callUsers();
    }
  }, []);

  return (
    <div>
      <h1 className="text-4xl mb-4">Informacion de negociacion</h1>

      <div className="grid grid-cols-12 gap-4">
        <FormField
          control={control}
          name="negotiationInformation.price"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>{formatCurrency(watchedPrice)}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.partOfPayment"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Recibe como parte de pago</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.minimumNegotiation"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Negociacion minima</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>{formatCurrency(watchedMinimumNegotiation)}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.reasonToSellOrRent"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Motivo de operacion</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {user && user.publicMetadata?.role === 'Administrador' && (
          <FormField
            control={control}
            name="negotiationInformation.realStateAdviser"
            render={({ field }) => (
              <>
                <FormItem className="col-span-9">
                  <FormLabel>Asesor Vision</FormLabel>
                  <FormControl>
                    <Select disabled={usersLoading} onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una opcion" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.fullName} ({user.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <div className="col-span-3 flex items-end">
                  <Dialog open={openUser} onOpenChange={setOpenUser}>
                    <DialogTrigger className="w-full">
                      <Button disabled={usersLoading} type="button" className="bg-red-900 w-full flex gap-2">
                        <PlusCircle width={20} height={20} className="min-w-[20px] min-h-[20px]" />
                        <p className="hidden lg:block">Nuevo asesor</p>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="overflow-y-auto max-h-screen">
                      <DialogHeader>
                        <DialogTitle className="text-center text-2xl">Nuevo usuario</DialogTitle>
                        <UserForm isForm={false} data={{} as any} onCloseModal={handleAfterCreateUser} />
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </>
            )}
          />
        )}

        <div className="col-span-12 grid grid-cols-12 gap-4">
          <FormField
            control={control}
            name="negotiationInformation.ally"
            render={({ field }) => (
              <>
                <FormItem className="col-span-9 ">
                  <FormLabel>Aliado</FormLabel>
                  <FormControl>
                    <Select disabled={alliesLoading} onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una opcion" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {allies.map((ally) => (
                          <SelectItem key={ally.id} value={ally.id.toString()}>
                            {ally.name} {ally.lastname}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <div className="col-span-3 flex items-end">
                  <Dialog open={openAlly} onOpenChange={setOpenAlly}>
                    <DialogTrigger className="w-full">
                      <Button disabled={alliesLoading} type="button" className="bg-red-900 w-full flex gap-2">
                        <PlusCircle width={20} height={20} className="min-w-[20px] min-h-[20px]" />
                        <p className="hidden lg:block">Nuevo aliado</p>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="overflow-y-auto max-h-screen">
                      <DialogHeader>
                        <DialogTitle className="text-center text-2xl">Nuevo aliado</DialogTitle>
                        <AllyForm isForm={false} data={{} as any} onCloseModal={handleAfterCreateAlly} />
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </>
            )}
          />
        </div>
        <FormField
          control={control}
          name="negotiationInformation.operationType"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Tipo de operacion</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una opcion" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Venta">Venta</SelectItem>
                    <SelectItem value="Alquiler">Alquiler</SelectItem>
                    <SelectItem value="Traspaso">Traspaso</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.propertyExclusivity"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Exclusividad</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una opcion" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="30 dias">30 dias</SelectItem>
                    <SelectItem value="45 dias">45 dias</SelectItem>
                    <SelectItem value="60 dias">60 dias</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.ownerPaysCommission"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>¿Propietario paga comision?</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una opcion" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Si">Si</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.sellCommission"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Comision de venta</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.rentCommission"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Comision de alquiler</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h2 className="text-2xl my-4 text-center col-span-12">Datos de captacion externa</h2>
        <FormField
          control={control}
          name="negotiationInformation.externalAdviser"
          render={({ field }) => (
            <>
              <FormItem className="col-span-9 ">
                <FormLabel>Captacion asesor externo</FormLabel>
                <FormControl>
                  <Select disabled={externalAdvisersLoading} onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una opcion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {externalAdvisers.map((adviser) => (
                        <SelectItem key={adviser.id} value={adviser.id.toString()}>
                          {adviser.name} {adviser.lastname} ({adviser.realStateCompanyName})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
              <div className="col-span-3 flex items-end">
                <Dialog open={openExternalAdviser} onOpenChange={setOpenExternalAdviser}>
                  <DialogTrigger className="w-full">
                    <Button disabled={externalAdvisersLoading} type="button" className="bg-red-900 w-full flex gap-2">
                      <PlusCircle width={20} height={20} className="min-w-[20px] min-h-[20px]" />
                      <p className="hidden lg:block">Nuevo Asesor externo</p>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="overflow-y-auto max-h-screen">
                    <DialogHeader>
                      <DialogTitle className="text-center text-2xl">Nuevo asesor externo</DialogTitle>
                      <ExternalAdviserForm isForm={false} data={{} as any} onCloseModal={handleAfterCreateAdviser} />
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </>
          )}
        />

        <h2 className="text-2xl my-4 text-center col-span-12">El propietario autoriza publicar en:</h2>

        <FormField
          control={control}
          name="negotiationInformation.socialMedia"
          render={({ field }) => (
            <FormItem className="col-span-12 flex gap-2 items-end">
              <FormControl>
                <Checkbox onCheckedChange={field.onChange} defaultChecked={field.value} {...field} />
              </FormControl>
              <FormLabel>Redes sociales</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.realStateWebPages"
          render={({ field }) => (
            <FormItem className="col-span-12 flex gap-2 items-end">
              <FormControl>
                <Checkbox onCheckedChange={field.onChange} defaultChecked={field.value} {...field} />
              </FormControl>
              <FormLabel>Paginas de inmuebles</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.realStateGroups"
          render={({ field }) => (
            <FormItem className="col-span-12 flex gap-2 items-end">
              <FormControl>
                <Checkbox onCheckedChange={field.onChange} defaultChecked={field.value} {...field} />
              </FormControl>
              <FormLabel>Grupos inmobiliarios</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.mouthToMouth"
          render={({ field }) => (
            <FormItem className="col-span-12 flex gap-2 items-end">
              <FormControl>
                <Checkbox onCheckedChange={field.onChange} defaultChecked={field.value} {...field} />
              </FormControl>
              <FormLabel>Boca a boca</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.publicationOnBuilding"
          render={({ field }) => (
            <FormItem className="col-span-12 flex gap-2 items-end">
              <FormControl>
                <Checkbox onCheckedChange={field.onChange} defaultChecked={field.value} {...field} />
              </FormControl>
              <FormLabel>Aviso en fachada</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
