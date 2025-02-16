import { redirect } from 'next/navigation'

interface Props {
  params: { id: string }
}

const Redirect: React.FC<Props> = async ({ params }) => {
  const { id } = await params

  redirect(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/redirect/${id}`)
}

export default Redirect
