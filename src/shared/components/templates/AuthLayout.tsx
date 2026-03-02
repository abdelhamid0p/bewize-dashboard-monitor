import Logo from '@/assets/images/login_logo.svg';
import LoginImage from '@/assets/images/login_image.png';
import LoginForm from '@/features/auth/components/login_form';

export const AuthTemplate = () => {
  return (
    <div className="flex flex-col lg:flex-row max-h-screen overflow-hidden">
      

      {/* LEFT - Section Formulaire */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 sm:p-8 lg:p-12 ">
       
        <div className="w-full  flex flex-col items-center gap-8 sm:gap-10 lg:gap-12 ">
         
          {/* Logo */}
          <div>
          
            <img 
              src={Logo} 
              alt="Bewize logo" 
              className="h-6 sm:h-7 lg:h-8"
            />
           
          </div>

          {/* Login Card */}
          <div className=" w-full max-w-90.5">
            <LoginForm />
          </div>
        </div>
      </div>
      
      <div className="hidden lg:flex items-center justify-center ">
        
        <div className="bg-black flex-1 max-w-2xl">
        
          <img
            src={LoginImage}
            alt="Dashboard Illustration"
            className="object-contain bg-amber-950"
          />
         
        </div>
      </div>
    </div>
  );};