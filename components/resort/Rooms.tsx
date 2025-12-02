import Room  from './Room';

import { useRoomContext, RoomContextType } from '@/context/RoomContext';
// Assuming you have installed the 'spinners-react' package
import Loading from '@/components/controls/Loading';

const Rooms: React.FC = () => {

  // Explicitly typing the context consumption
  const { rooms, loading } = useRoomContext() as RoomContextType;

  return (
    <section className='py-24'>

      {
        // overlay & spinner effect 
        loading &&
        <div className='h-screen w-full fixed bottom-0 top-0 bg-black/80 z-50 grid place-items-center'>         
          <Loading />
        </div>
      }


      <div className='container mx-auto lg:px-0'>

        <div className='text-center'>
          {/* Using font-mono for tertiary style based on your previous global.css */}
          <p className='font-mono uppercase text-[15px] tracking-[6px]'>Hotel & Spa Adina</p>
          <h2 className='font-sentient text-[45px] mb-6'>Room & Suites</h2>
        </div>

        {/* Room Grid */}
        <div className='grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0'>
          {
            rooms.map((room) =>
              <Room key={room.id} room={room} />
            )
          }
        </div>
        
        {/* Show a message if no rooms are found after filtering */}
        {rooms.length < 1 && !loading && (
          <div className='text-center py-10 font-mono text-xl text-primary'>
            Sorry, no rooms matched your search criteria.
          </div>
        )}

      </div>

    </section>
  );
};

export default Rooms;