import { GetFormStats } from "@/actions/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ReactNode, Suspense } from "react"
import { LuView } from 'react-icons/lu'
import { FaWpforms } from 'react-icons/fa'
import { HiCursorClick } from 'react-icons/hi'
import { TbArrowBounce } from 'react-icons/tb'
import { Separator } from "@/components/ui/separator"
const page = () => {
  return (
    <div className="container pt-4" >
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStartsWrapper />
        <Separator className="my-6" />
        <h2 className="text-4xl font-bold col-span-2">Your Forms</h2>
        <Separator className="my-6" />
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
        value={data?.submissionRate.toLocaleString()+'%' || ""}
        loading={loading}
        className="shadow-md shadow-green-600"
      />
      <StatsCard
        title="Bounce rate"
        icon={<TbArrowBounce className='text-red-600' />}
        helperText={"Visits that leaves without interacting"}
        value={data?.bouncerate.toLocaleString()+'%' || ""}
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