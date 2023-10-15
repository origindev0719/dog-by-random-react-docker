import { HeaderComponent } from "../components/Header"
import { MainComponent } from "../components/Main"

export const HomePage = () => {
  return (
    <div className="w-full flex flex-col max-h-screen">
      <HeaderComponent />
      <MainComponent />
    </div>
  )
}
