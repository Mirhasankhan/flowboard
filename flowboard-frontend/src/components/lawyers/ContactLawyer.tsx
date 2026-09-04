import { JWTDecode } from "@/utils/jwt";
import { GraduationCap, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNextPlayer } from "reactnextplayer";

const ContactLawyer = ({ lawyer }: { lawyer: any }) => {
  const { decoded } = JWTDecode();
  const router = useRouter();
  const handleMessage = () => {
    if (!decoded?.email) return router.push(`/auth/login`);
    router.push(`/messages?receiverId=${lawyer._id}`);
  };
  const handleBook = () => {
    if (!decoded?.email) return router.push(`/auth/login`);
    router.push(`/book?lawyerId=${lawyer._id}`);
  };

  return (
    <div>
      <div className="w-full mx-auto pb-12">
        <h1 className="text-xl font-medium pb-4">Introduction Video </h1>
        <ReactNextPlayer
          src={
            lawyer?.introVideo ||
            "https://fixzone-app-storage.s3.us-east-2.amazonaws.com/record/aTaxTcdmzGSBM1dX_8fDj5DN%m3a4Pikd_68f9b3371b4343a65d9ab107_8fDj5DN%m3a4Pikd_68f9b3371b4343a65d9ab107_main_VA_20251208110653595.mp4"
          }
          controls
          autoplay={true}
          muted={false}
          loop={false}
          height={300}
          contextMenu={false}
          className="w-full rounded-2xl"
          color="#ff0000"
          ambientGlow
        />
      </div>
      <div className="border rounded-[6px] ">
        <div className="bg-primary rounded-t-[5px] text-white py-8 text-center">
          <h1 className="text-5xl font-semibold">${lawyer?.fee}</h1>
          <h1 className="text-2xl font-semibold py-1">Book Consultation</h1>
          <p>Get personalized guidance from our expert</p>
        </div>
        <div className="p-5">
          <button
            onClick={() => handleMessage()}
            className="text-white mt-3 bg-primary border  w-full py-2 rounded-[8px]  font-medium"
          >
            Send Message
          </button>

          <div className="flex items-center gap-2 pt-6">
            <div className="p-2 bg-blue-100 rounded-full">
              <Mail size={25} className="text-blue-800"></Mail>
            </div>
            <div>
              <small>Email</small>
              <p className="font-medium">{lawyer?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <div className="p-2 bg-blue-100 rounded-full">
              <Phone size={25} className="text-blue-800"></Phone>
            </div>
            <div>
              <small>Phone</small>
              <p className="font-medium">01781654814</p>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-6">
            <div className="p-2 bg-blue-100 rounded-full">
              <GraduationCap
                size={25}
                className="text-blue-800"
              ></GraduationCap>
            </div>
            <div>
              <small>Institution</small>
              <p className="font-medium">{lawyer?.institute}</p>
            </div>
          </div>

          <button
            onClick={() => handleBook()}
            className="text-secondary mt-3 bg-white border-secondary border  w-full py-2 rounded-[8px]  font-medium"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactLawyer;
