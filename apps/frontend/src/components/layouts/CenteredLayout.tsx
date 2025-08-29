interface CenteredLayoutProps {
  children: React.ReactNode
}

export default function CenteredLayout({ children }: CenteredLayoutProps){
  return (
    <div className="h-screen flex justify-center items-center">
      { children }
    </div>
  )
}