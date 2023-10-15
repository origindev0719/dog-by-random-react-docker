import { LeftSideComponent } from "../LeftSide"
import { RightSideComponent } from "../RightSide"

export const MainComponent = () => {
  return (
    <div className="grid grid-cols-12 gap-4 p-8">
      <LeftSideComponent />
      <RightSideComponent />
    </div>
  )
}
