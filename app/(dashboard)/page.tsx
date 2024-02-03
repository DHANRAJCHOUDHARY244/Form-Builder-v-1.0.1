import { GetFormStats, GetForms } from "@/actions/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ReactNode, Suspense } from "react"
import { LuView } from 'react-icons/lu'
import { FaWpforms } from 'react-icons/fa'
import { HiCursorClick } from 'react-icons/hi'
import { TbArrowBounce } from 'react-icons/tb'
import { Separator } from "@/components/ui/separator"
import CreateFormBtn from "@/components/CreateFormBtn"
import { Form } from "@prisma/client"
import { Badge } from "@/components/ui/badge"
import { formatDistance } from "date-fns"
const page = () => {
  return (
    <div className="container pt-4" >
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStartsWrapper />
        <Separator className="my-6" />
        <h2 className="text-4xl font-bold col-span-2">Your Forms</h2>
        <Separator className="my-6" />
        <div className='grid gric-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'><CreateFormBtn />
          <Suspense fallback={[1, 2, 3, 4].map((el) => (
          <FormCardSkeleton key={el} />
          ))}>
            <FormCards />
          </Suspense>
        </div>
      </Suspense>
    </div>
  )
}

export default page

async function CardStartsWrapper() {
  const stats = await GetFormStats();
  return <StatsCards loading={false} data={stats} />
}

interface StatsCardProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean
}

function StatsCards(props: StatsCardProps) {
  const { data, loading } = props;
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-col-4">
      <StatsCard
        title="Total visits"
        icon={<LuView className='text-blue-600' />}
        helperText={"All time form visit"}
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
      <StatsCard
        title="Total submission"
        icon={<FaWpforms className='text-yellow-600' />}
        helperText={"All time form submission"}
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />
      <StatsCard
        title="Submission rate"
        icon={<HiCursorClick className='text-green-600' />}
        helperText={"Visits that result in submission"}
        value={data?.submissionRate.toLocaleString() + '%' || ""}
        loading={loading}
        className="shadow-md shadow-green-600"
      />
      <StatsCard
        title="Bounce rate"
        icon={<TbArrowBounce className='text-red-600' />}
        helperText={"Visits that leaves without interacting"}
        value={data?.bouncerate.toLocaleString() + '%' || ""}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  )
}

function StatsCard({ title, icon, helperText, value, loading, className }: {
  title: string,
  icon: ReactNode,
  helperText: string,
  value: string,
  loading: boolean,
  className: string
}) {
  return <Card className={className}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground" >{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {
          loading && (
            <Skeleton>
              <span className={'opacity-0'}>0</span>
            </Skeleton>
          )
        }
        {!loading && value}
      </div>
      <p className="text-xs text-muted-foreground pt-1">
        {helperText}
      </p>
    </CardContent>
  </Card>
}

function FormCardSkeleton() {
  return <Skeleton className="border-2 border-primary/20 h-[190px] w-full" />
}

async function FormCards() {
  const form = await GetForms()
  return <>
    {
      form.map(form => (
        <FormCard key={form.id} form={form} />
      ))
    }
  </>
}

function FormCard({ form }: {
  form: Form
}) {
  return <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2 justify-between">
        <span className='truncate font-bold' >
          {form.name}
        </span>
        {form.published && <Badge>Published</Badge>}
        {!form.published && <Badge variant={'destructive'} >Draft</Badge>}
      </CardTitle>
      <CardDescription>
        {formatDistance(form.createdAt, new Date(), {addSuffix:true})}
        {form.published && <span className="flex flex-center gap-2">
          <LuView className="text-muted-foreground" />
          <span>{form.visits.toLocaleString()}</span>
        </span> }
      </CardDescription>
    </CardHeader>
  </Card>
}