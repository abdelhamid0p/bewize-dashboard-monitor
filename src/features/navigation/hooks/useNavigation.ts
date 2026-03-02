import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export const useNavigation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeItem, setActiveItem] = useState(location.pathname)

  const handleNavigate = (path: string) => {
    setActiveItem(path)
    navigate(path)
  }

  const isActive = (path: string) => {
    return activeItem === path || location.pathname === path
  }

  return {
    activeItem,
    handleNavigate,
    isActive,
  }
}

export default useNavigation; 