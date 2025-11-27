import { format } from 'date-fns';
import Image from 'next/image';

export function Header() {
  const currentDate = new Date();

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b-2 border-gray-200">
      <div className="flex items-center gap-2">
        {/* Logo Placeholder */}
        <Image src="/images/ph-logo.svg" alt="Plural Health Logo" width={80} height={24} />
      </div>

      <div className="flex items-center gap-4 text-gray-600 font-medium">
        <span className="custom-text-400 txt-primary">{format(currentDate, 'd MMMM')}</span>
        <span className='font-semibold text-lg leading-5 tracking-normal' >{format(currentDate, 'hh:mm a')}</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="custom-text-400 txt-primary">Hi Mr Daniel</span>
        </div>

        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full" aria-label="Notifications">
          <Image src="/images/bell.svg" alt="Notifications" width={20} height={20} />
        </button>

        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
          {/* User Avatar Placeholder */}
          <Image src="/images/user.svg" alt="User" width={20} height={20} />
        </div>
      </div>
    </header>
  );
}



