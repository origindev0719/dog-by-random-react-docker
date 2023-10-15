import logo from "../../resources/logo.png"

export const HeaderComponent = () => {
  return (
    <div className=" col-span-12 py-3 px-5 bg-amber-600">
      <img src={logo} alt="logo" width={60} />
    </div>
  )
}
