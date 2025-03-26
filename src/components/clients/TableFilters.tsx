'use client';
import { useCategories } from '@/lib/api/categories';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useEffect, useState } from 'react';
import { getUsersFromClerk } from '@/actions/user';

export function TableFilters({
  query,
  setQuery,
  contactFrom,
  setContactFrom,
  propertyType,
  setPropertyType,
  adviser,
  setAdviser,
  status,
  setStatus,
}: {
  contactFrom: string;
  setContactFrom: (value: string) => void;
  query: string;
  setQuery: (value: string) => void;
  propertyType: string;
  setPropertyType: (value: string) => void;
  adviser: string;
  setAdviser: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
}) {
  const { data } = useCategories();
  const [users, setUsers] = useState<any[]>([]);

  async function fetchUsers() {
    const response = await getUsersFromClerk(false);
    setUsers(response.data as any);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row mb-4 md:items-end gap-4">
        {/* Search Input */}
        <Input
          placeholder="Buscar por nombre, numero de telefono, servicio, inmueble, solicitud"
          className="w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div>
          <p className="text-xs font-bold mb-1">Asesor</p>
          <Select value={adviser} onValueChange={setAdviser}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {users?.map((user) => (
                <SelectItem value={user.id} key={user.id}>
                  {user.fullName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Select for Property Type */}
        <div>
          <p className="text-xs font-bold mb-1">Tipo de propiedad</p>

          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {data?.map((property) => (
                <SelectItem key={property.id} value={property.title}>
                  {property.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* input for price range */}
      </div>
      <div className="flex flex-col md:flex-row mb-4 md:items-end gap-4">
        <div>
          <p className="text-xs font-bold mb-1">De donde nos contacta</p>
          <Select value={contactFrom} onValueChange={setContactFrom}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem key="Mercado libre" value="Mercado libre">
                Mercado libre
              </SelectItem>
              <SelectItem key="Instagram" value="Instagram">
                Instagram
              </SelectItem>
              <SelectItem key="Tiktok" value="Tiktok">
                Tiktok
              </SelectItem>
              <SelectItem key="Facebook" value="Facebook">
                Facebook
              </SelectItem>
              <SelectItem key="Airbnb" value="Airbnb">
                Airbnb
              </SelectItem>
              <SelectItem key="Whatsapp" value="Whatsapp">
                Whatsapp
              </SelectItem>
              <SelectItem key="Llamada" value="Llamada">
                Llamada
              </SelectItem>
              <SelectItem key="Oficina" value="Oficina">
                Oficina
              </SelectItem>
              <SelectItem key="Mensajeria de texto" value="Mensajeria de texto">
                Mensajeria de texto
              </SelectItem>
              <SelectItem key="Pagina web" value="Pagina web">
                Pagina web
              </SelectItem>
              <SelectItem key="Etiqueta fisica" value="Etiqueta fisica">
                Etiqueta fisica
              </SelectItem>
              <SelectItem key="Cliente recurrente" value="Cliente recurrente">
                Cliente recurrente
              </SelectItem>
              <SelectItem key="Referido" value="Referido">
                Referido
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-xs font-bold mb-1">Estatus</p>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem key="Activo" value="Activo">
                Activo
              </SelectItem>
              <SelectItem key="Inactivo" value="Inactivo">
                Inactivo
              </SelectItem>
              <SelectItem key="Concretado" value="Concretado">
                Concretado
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
