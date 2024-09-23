import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart3,
  DollarSign,
  TrendingUp,
  Percent,
  TrendingDown,
  HandCoins,
  Coins,
  Calendar,
  GalleryVerticalEnd, ScrollText, Filter, AlertTriangle, Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Page() {
  // Mock data for stats
  const stats = [
    { title: "Total Disponible", value: "$45,231.89", icon: DollarSign, change: "+20.1% from last month" },
    { title: "Utilidad estimada", value: "2,350", icon: Percent, change: "+180.1% from last month" },
    { title: "Total de ingresos", value: "12,234", icon: TrendingUp, change: "+19% from last month" },
    { title: "Total de egresos", value: "573", icon: TrendingDown, change: "+201 since last hour" },
    { title: "Total por pagar", value: "573", icon: HandCoins, change: "+201 since last hour" },
    { title: "Total por cobrar", value: "573", icon: HandCoins, change: "+201 since last hour" },
    { title: "Total ingreso a cuenta de terceros", value: "573", icon: Coins, change: "+201 since last hour" },
  ]

  // Mock data for table
  const tableData = [
    { id: "INV001", customer: "John Doe", status: "Paid", amount: "$250.00" },
    { id: "INV002", customer: "Jane Smith", status: "Pending", amount: "$150.00" },
    { id: "INV003", customer: "Bob Johnson", status: "Unpaid", amount: "$350.00" },
    { id: "INV004", customer: "Alice Brown", status: "Paid", amount: "$200.00" },
    { id: "INV005", customer: "Charlie Davis", status: "Paid", amount: "$175.00" },
  ]

  return (
    <>
      <div className="bg-yellow-500 text-black p-2 text-center">
        <AlertTriangle className="inline-block mr-2" />
        Trabajo en progreso - Esta pagina se encuentra bajo desarrollo activo.
      </div>
      <div className="container mx-auto p-4 space-y-6">

        <h1 className="text-4xl mb-4">Flujo de caja</h1>

        <div className="flex gap-4 justify-end">
          <Button variant="outline">
            <Calendar size={16} className="mr-2" />
            Fecha
          </Button>
          <Button variant="outline">
            <Filter size={16} className="mr-2" />
            Ver mas filtros
          </Button>
          <Button variant="outline">
            <GalleryVerticalEnd size={16} className="mr-2" />
            Ver resumen de operaciones
          </Button>
          <Button variant="outline">
            <ScrollText size={16} className="mr-2" />
            ver cierre de caja
          </Button>
          <Button size="icon">
            <Settings size={20}/>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.id}</TableCell>
                    <TableCell>{row.customer}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell className="text-right">{row.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
