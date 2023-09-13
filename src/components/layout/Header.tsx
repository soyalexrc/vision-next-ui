import {Activity, ChevronDown, Flash, Lock, Scale, Server, TagUser} from "@nextui-org/shared-icons";
import {
    Accordion, AccordionItem,
    Button,
    Dropdown, DropdownItem,
    DropdownMenu,
    DropdownTrigger, Link,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle
} from "@nextui-org/react";
import NextLink from 'next/link';
import {useRouter} from "next/router";
import Image from "next/image";

export default function Header() {
    const router = useRouter();
    const icons = {
        chevron: <ChevronDown fill="currentColor" size={16}/>,
        scale: <Scale className="text-warning" fill="currentColor" size={30}/>,
        lock: <Lock className="text-success" fill="currentColor" size={30}/>,
        activity: <Activity className="text-secondary" fill="currentColor" size={30}/>,
        flash: <Flash className="text-primary" fill="currentColor" size={30}/>,
        server: <Server className="text-success" fill="currentColor" size={30}/>,
        user: <TagUser className="text-danger" fill="currentColor" size={30}/>,
    };

    const itemsMenu = [
        {
            id: '1',
            title: 'En venta',
            children: [],
            path: '/inmuebles?operationType=venta&page=1&pageSize=10'
        },
        {
            id: '2',
            title: 'En alquiler',
            children: [
                {
                    title: 'Estadias vacacionales',
                    path: '/inmuebles?operationType=alquiler&subType=estadias vacacionales&page=1&pageSize=10'
                },
                {
                    title: 'Temporadas largas',
                    path: '/inmuebles?operationType=alquiler&subType=temporadas largas&page=1&pageSize=10'
                }
            ],
            path: ''
        },
        {
            id: '3',
            title: 'Servicios',
            children: [],
            path: '/servicios'
        },
        {
            id: '4',
            title: 'Acerca de',
            children: [
                {
                    title: 'Acerca de nosotros',
                    path: '/acerca-de-nosotros'
                },
                {
                    title: 'Nuestro equipo de trabajo',
                    path: '/equipo-de-trabajo'
                },
                {
                    title: 'Comentarios',
                    path: '/comentarios'
                }
            ],
            path: ''
        },
        {
            id: '5',
            title: 'Contacto',
            children: [
                {
                    title: 'Contactanos',
                    path: '/contacto'
                },
                {
                    title: 'Trabaja con nosotros',
                    path: '/trabaja-con-nosotros'
                }
            ],
            path: ''
        }
    ]
    return (
        <Navbar maxWidth="full" isBlurred={true} classNames={{
            item: [
                "flex",
                "relative",
                "h-full",
                "items-center",
                "data-[active=true]:after:content-['']",
                "data-[active=true]:after:absolute",
                "data-[active=true]:after:bottom-0",
                "data-[active=true]:after:left-0",
                "data-[active=true]:after:right-0",
                "data-[active=true]:after:h-[2px]",
                "data-[active=true]:after:rounded-[2px]",
                "data-[active=true]:after:bg-primary",
            ],
        }}>
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle/>
                <NavbarBrand className='justify-end'>
                    <Image
                        title='Vision inmobiliaria logo'
                        alt='Vision inmobiliaria logo'
                        src='/vision-icon.png'
                        width={50}
                        height={50}
                    />
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="end">
                <NavbarBrand>
                    {/*<AcmeLogo*/}
                        <Image
                            title='Vision inmobiliaria logo'
                            alt='Vision inmobiliaria logo'
                            src='/vision-icon.png'
                            width={50}
                            height={50}
                            />
                    <p className="font-bold text-inherit">Vision Inmobiliaria</p>
                </NavbarBrand>
                {
                    itemsMenu.map((item: any) => {
                        if (item.children.length > 0) {
                            return (
                                <Dropdown key={item.id}>
                                    <NavbarItem>
                                        <DropdownTrigger>
                                            <Button
                                                disableRipple
                                                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                                                endContent={icons.chevron}
                                                radius="sm"
                                                variant="light"
                                            >
                                                {item.title}
                                            </Button>
                                        </DropdownTrigger>
                                    </NavbarItem>
                                    <DropdownMenu
                                        aria-label="ACME features"
                                        className="w-[340px]"
                                        itemClasses={{
                                            base: "gap-4",
                                        }}
                                    >
                                        {
                                            item.children.map((child: any) => (
                                                <DropdownItem
                                                    key={child.title}
                                                    description="ACME scales apps to meet user demand, automagically, based on load."
                                                    startContent={icons.scale}
                                                    onClick={() => router.push(child.path)}
                                                >
                                                    {child.title}
                                                </DropdownItem>
                                            ))
                                        }
                                    </DropdownMenu>
                                </Dropdown>
                            )
                        } else {
                            return (
                                <NavbarItem key={item.id}>
                                    <Link href={item.path} as={NextLink} color="foreground" className='text-[14px]'>
                                        {item.title}
                                    </Link>

                                </NavbarItem>
                            )
                        }
                    })
                }
            </NavbarContent>

            <NavbarMenu>
                {itemsMenu.map((item, index) => (
                    <NavbarMenuItem key={`${item.id}-${index}`}>
                        {
                            item.children.length > 0 &&
                            <Accordion isCompact>
                                <AccordionItem  aria-label={item.title} title={item.title}>
                                {
                                    item.children.map((child: any) => (
                                        <Link
                                            key={child.title}
                                            className="w-full mb-4"
                                            href={child.path}
                                            as={NextLink}
                                            size="lg"
                                        >
                                            {child.title}
                                        </Link>
                                    ))
                                }
                                </AccordionItem>

                            </Accordion>
                        }
                        {
                            item.children.length < 1 &&
                            <Link
                                className="w-full px-2 mb-2"
                                href={item.path}
                                as={NextLink}
                                size="lg"
                            >
                                {item.title}
                            </Link>
                        }
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}

const AcmeLogo = () => (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
        <path
            clipRule="evenodd"
            d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
            fill="currentColor"
            fillRule="evenodd"
        />
    </svg>
);
