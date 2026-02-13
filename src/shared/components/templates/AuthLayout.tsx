import Logo from '@/assets/images/login_logo.svg';
import LoginImage from '@/assets/images/login_image.png';
import LoginForm from '@/features/auth/components/login_form';

export const AuthTemplate = () => {
  return (
      <div className="flex min-h-screen flex-col lg:flex-row">
      

      {/* LEFT - Section Formulaire */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 sm:p-8 lg:p-12 ">
       
        <div className="w-full  flex flex-col items-center gap-24  lg:ml-[20vh]">
         
          {/* Logo */}
          <div>
          
            <img 
              src={Logo} 
              alt="Bewize logo" 
              className="h-8 2xl:h-10 2xl:mb-[8vh]  "
            />
           
          </div>

          {/* Login Card */}
          <div className="w-full xl:max-w-sm 2xl:mb-[18vh] mb-[4vh]">
            <LoginForm />
          </div>
        </div>
      </div>
      
      <div className="hidden lg:flex items-center justify-center ">
        
        <div className="flex-1 max-w-2xl 2xl:max-w-5xl">
        
          <img
            src={LoginImage}
            alt="Dashboard Illustration"
            className="object-contain "
          />
         
        </div>
      </div>
    </div>
  );};